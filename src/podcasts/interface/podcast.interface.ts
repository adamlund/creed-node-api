export interface PodcastInterface {
  id: string;
  title: string;
  publisher: string;
  image: string;
  thumbnail: string;
  listennotes_url: string;
  total_episodes: number;
  explicit_content: boolean;
  description: string;
  itunes_id: number;
  rss: string;
  latest_pub_date_ms: number;
  earliest_pub_date_ms: number;
  language: string;
  country: string;
  website: string;
  extra: {
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
  is_claimed: boolean;
  email: string;
  type: string;
  looking_for: {
    sponsors: boolean;
    guests: boolean;
    cohosts: boolean;
    cross_promotion: boolean;
  };
  genre_ids: number[];
}
