import { Model, JSONSchema } from 'objection';

export class PodcastModel extends Model {
  static tableName = 'podcasts';

  id!: string;
  title!: string;
  publisher!: string;
  image!: string;
  thumbnail!: string;
  listennotes_url!: string;
  total_episodes!: number;
  explicit_content!: boolean;
  description!: string;
  itunes_id!: number;
  rss!: string;
  latest_pub_date_ms!: number;
  earliest_pub_date_ms!: number;
  language!: string;
  country!: string;
  website!: string;
  extra!: {
    twitter_handle: string;
    facebook_handle: string;
    instagram_handle: string;
    wechat_handle: string;
    patreon_handle: string;
    youtube_url: string;
    linkedin_url: string;
    spotify_url: string;
    google_url: string;
    url1: string;
    url2: string;
    url3: string;
  };
  is_claimed!: boolean;
  email!: string;
  type!: string;
  looking_for!: {
    sponsors: boolean;
    guests: boolean;
    cohosts: boolean;
    cross_promotion: boolean;
  };
  genre_ids!: number[];

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: [
        'id',
        'title',
        'publisher',
        'total_episodes',
        'explicit_content',
        'description',
        'language',
        'country',
        'type',
        'is_claimed',
      ],
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        publisher: { type: 'string' },
        image: { type: 'string', format: 'uri' },
        thumbnail: { type: 'string', format: 'uri' },
        listennotes_url: { type: 'string', format: 'uri' },
        total_episodes: { type: 'integer' },
        explicit_content: { type: 'boolean' },
        description: { type: 'string' },
        itunes_id: { type: 'integer' },
        rss: { type: 'string' },
        latest_pub_date_ms: { type: 'integer' },
        earliest_pub_date_ms: { type: 'integer' },
        language: { type: 'string' },
        country: { type: 'string' },
        website: { type: 'string', format: 'uri' },
        extra: {
          type: 'object',
          properties: {
            twitter_handle: { type: 'string' },
            facebook_handle: { type: 'string' },
            instagram_handle: { type: 'string' },
            wechat_handle: { type: 'string' },
            patreon_handle: { type: 'string' },
            youtube_url: { type: 'string', format: 'uri' },
            linkedin_url: { type: 'string', format: 'uri' },
            spotify_url: { type: 'string', format: 'uri' },
            google_url: { type: 'string', format: 'uri' },
            url1: { type: 'string' },
            url2: { type: 'string' },
            url3: { type: 'string' },
          },
        },
        is_claimed: { type: 'boolean' },
        email: { type: 'string' },
        type: { type: 'string' },
        looking_for: {
          type: 'object',
          properties: {
            sponsors: { type: 'boolean' },
            guests: { type: 'boolean' },
            cohosts: { type: 'boolean' },
            cross_promotion: { type: 'boolean' },
          },
        },
        genre_ids: { type: 'array', items: { type: 'integer' }, default: [] },
      },
    };
  }
}
