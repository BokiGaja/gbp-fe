export interface CategoryItem {
  id?: string | number;
  slug: string;
  name: string;
  type?: 'service' | 'item';
  coverImage?: { url: string };
  image?: { url: string };
  children?: CategoryItem[];
}
