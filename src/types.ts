export type Currency = 'USD' | 'EUR';

export interface BookSpec {
  isbn: string;
  pagination: string;
  dimensions: string;
  binding: string;
  paperStock: string;
  language: string;
}

export interface BookEditionFormat {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  foreword?: string;
  publisher: string;
  year?: string;
  price: number;
  rating: number;
  reviewsCount: number;
  format: string;
  formatDetails?: string;
  badge?: 'Staff Pick' | '1st Edition' | 'Limited Run' | 'Archival Clothbound' | 'Rare Edition' | 'Ex Libris';
  stockStatus: 'In Print' | '3 Copies Left' | 'Only 2 Left' | 'Limited Stock';
  discipline: 'Architecture & Design' | 'Essays & Criticism' | 'Contemporary Fiction' | 'Poetics & Verse' | 'Rare & Antiquarian';
  era: '2020s' | '2010s' | 'Classics';
  formatCategory: 'Hardcover' | 'Linen Clothbound' | 'Softcover / Paperback' | 'Signed Limited Pressing';
  inStockAtStudio: boolean;
  isNumbered: boolean;
  coverImage: string;
  galleryImages?: string[];
  description: string;
  excerpt?: {
    quote: string;
    source: string;
  };
  specs?: BookSpec;
  editionFormats?: BookEditionFormat[];
  customGeometricCover?: {
    pressName: string;
    pressNumber?: string;
    bgColor: string;
    accentColor: string;
    quote?: string;
  };
}

export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  price: number;
  format: string;
  formatTag?: string;
  subCategory?: string;
  coverImage: string;
  quantity: number;
}

export type PageView = 'home' | 'catalog' | 'pdp' | 'cart' | 'journal';
