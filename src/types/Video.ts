export interface Creator {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  uploadedAt: string;
  creator: Creator;
  category: string;
  tags: string[];
}