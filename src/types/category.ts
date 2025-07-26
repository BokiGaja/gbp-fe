export interface Category {
  id: number;
  name: string;
  slug: string;
  coverImage?: {
    url: string;
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  children?: Category[];
  items?: { name: string; slug?: string }[];
  parents?: Category[];
}
