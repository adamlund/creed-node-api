const mysql = require('mysql2');

/**
 * Ensure the db is up and running before operations begin.
 * @returns Promise<resolve, reject>
 */
function checkConnection() {
  console.log(`Connection to DB: ${process.env.MYSQL_HOST}:${process.env.MYSQL_NAME} with ${process.env.MYSQL_USER}`);

  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_NAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      connectTimeout: 3000,
    });
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

let i = 0;

const testConnection = async () => {
  try {
    await checkConnection();
    console.log('MySQL Connection established.');
    process.exit(0);
  } catch (e) {
    console.log(`Connection not available. Attempted ${++i} time${i !== 1 ? 's' : ''}.`);
    console.log(JSON.stringify(e));
  }
};

(async () => {
  await testConnection();
  setInterval(testConnection, 3000);
  setTimeout(() => process.exit(1), 120000);
})();

module.exports = testConnection;
