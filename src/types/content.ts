export interface SiteContent {
  site: {
    title: string;
    subtitle: string;
    description: string;
    logo?: string;
    favicon?: string;
  };
  contact: {
    email: string;
    phones: string[];
    address?: string;
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  // Add more content types as needed
}

// Base field type without specific value type
type BaseField = {
  id: string;
  label: string;
  group?: string;
  description?: string;
};

// Field types with their specific value types
type TextField = BaseField & {
  type: 'text' | 'textarea' | 'richText';
  value: string;
};

type NumberField = BaseField & {
  type: 'number';
  value: number;
};

type ImageField = BaseField & {
  type: 'image';
  value: string; // URL to the image
};

type SelectField = BaseField & {
  type: 'select';
  value: string;
  options: { label: string; value: string }[];
};

type BooleanField = BaseField & {
  type: 'boolean';
  value: boolean;
};

// Union of all possible field types
export type ContentField = TextField | NumberField | ImageField | SelectField | BooleanField;

// Article type for scientific articles
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  video?: string;
  author: string;
  publishDate: string;
  category: string;
  featured: boolean;
}

// Media type for Dr. Zeineb's media appearances
export interface MediaItem {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'interview' | 'conference' | 'workshop' | 'campaign' | 'course' | 'seminar';
  date: string;
  location?: string;
  media: string; // YouTube URL or uploaded video/image
  mediaType: 'youtube' | 'video' | 'image';
  images?: string[]; // Additional images
  featured: boolean;
  order: number;
}

// Extended SiteContent interface to include articles and media
export interface SiteContentExtended extends SiteContent {
  articles?: Article[];
  media?: MediaItem[];
}
