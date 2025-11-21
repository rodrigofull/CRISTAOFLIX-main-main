export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  cover_url: string;
  youtube_id: string;
  price: number;
  preview_url?: string;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  video_id: string;
  status: 'paid' | 'pending';
  payment_id?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
