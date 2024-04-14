const Knex = require('knex');
const fs = require('fs');

// Path to JSON data file with podcasts array
const dataPath = process.argv[2];

// Setup db conn
const knex = Knex({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST || '',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_NAME || '',
  },
});

/** Needed for schema changes from source API data */
async function fetchColumnNames(knex, tableName) {
  const columns = await knex('information_schema.columns')
    .select('COLUMN_NAME')
    .where('TABLE_SCHEMA', '=', process.env.MYSQL_NAME || '')
    .andWhere('TABLE_NAME', '=', tableName);

  return columns.map(column => column.COLUMN_NAME); 
}

function filterColumns(podcast, columnNames) {
  const reduced = {};
  columnNames.forEach(column => {
    if (podcast.hasOwnProperty(column)) {
      reduced[column] = podcast[column];
    }
  });
  return reduced;
}

async function loadDataFromFile(filePath) {

  try {
    console.log('Reading data from', filePath);
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);
    const podcastColumns = await fetchColumnNames(knex, 'podcasts');
    const genreColumns = await fetchColumnNames(knex, 'genres');

    const podcastResults = [];
    const genreResults = [];

    // podcasts
    if (Array.isArray(data.podcasts) && data.podcasts.length) {
      for (const [idx, podcast_data] of data.podcasts.entries()) {
        let podcast = filterColumns({...podcast_data}, podcastColumns);

        // Using JSON data type in MySQL rather than splitting tables
        podcast.genre_ids = JSON.stringify(podcast.genre_ids);
        podcast.extra = JSON.stringify(podcast.extra);
        podcast.looking_for = JSON.stringify(podcast.looking_for);

        // Insert podcast into the 'podcasts' table ensure unique ids
        const res = await knex('podcasts').insert(podcast).onConflict('id').merge();
        podcastResults.push(res);
      }
      console.log(`${podcastResults.length} podcasts added/updated`);
    } else {
      console.log('No podcasts to insert.');
    }

    // genres
    if (Array.isArray(data.genres) && data.genres.length) {
      for (const [idx, genre_data] of data.genres.entries()) {
        let genre = filterColumns({...genre_data}, genreColumns);

        // Insert genre into table, update if changed
        const res = await knex('genres').insert(genre).onConflict('id').merge();
        genreResults.push(res);
      }
      console.log(`${genreResults.length} genres added/updated`);
    } else {
      console.log('No genre data to insert.');
    }

  } catch (error) {
    console.error('Failed to insert data:', error);
  } finally {
    knex.destroy();
  }
}

if (dataPath) {
  loadDataFromFile(dataPath);
} else {
  console.error('Provide a file path as second argument');
}
