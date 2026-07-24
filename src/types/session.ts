export type Session = {
  id?: string;
  _id?: string;
  expert_id?: string;
  category_id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  video_url?: string;
  meeting_link?: string;
  start_time?: string;
  end_time?: string;
  duration_minutes?: number | string;
  price?: number | string;
  language?: string;
  max_participants?: number | string;
  slug?: string;
  [key: string]: unknown;
};

export type CreateSessionPayload = {
  expert_id: string;
  category_id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  meeting_link: string;
  start_time: string;
  end_time: string;
  duration_minutes: number | string;
  price: number | string;
  language: string;
  max_participants: number | string;
};
