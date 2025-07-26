export interface Item {
  id: number;
  name: string;
  slug: string;
  description?: string;
  video_url?: string;
  coverImage?: {
    url: string;
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  image?: {
    url: string;
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  parents?: {
    id: number;
    name: string;
    slug: string;
    parents?: {
      id: number;
      name: string;
      slug: string;
    }[];
  }[];
}
