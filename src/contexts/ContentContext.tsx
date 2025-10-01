import React, { createContext, useContext, ReactNode, useState } from 'react';
import contentData from '../data/content.json';
import { Article, MediaItem } from '../types/content';

// Define the content type based on your content.json structure
interface ContentType {
  site: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: {
    email: string;
    phones: string[];
  };
  navigation: {
    logo: string;
    menuItems: Array<{ label: string; href: string }>;
    ctaButton: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaButtons: {
      primary: string;
      secondary: string;
    };
  };
  whyChoose: {
    title: string;
    description: string;
    image: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  services: {
    title: string;
    subtitle?: string;
    items: Array<{
      title: string;
      description: string;
      icon?: string;
      image?: string;
    }>;
  };
  doctors: {
    title: string;
    subtitle: string;
    members: Array<{
      name: string;
      specialty: string;
      description: string;
      image: string;
    }>;
  };
  gallery: {
    title: string;
    subtitle: string;
    images: string[];
  };
  contactInfo: {
    title?: string;
    subtitle?: string;
    address: {
      title?: string;
      line1: string;
      line2: string;
      line3: string;
    };
    email: {
      title?: string;
      value: string;
    };
    phone: {
      title?: string;
      value: string;
    };
    form?: {
      fields: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
    };
  };
  appointment: {
    title: string;
    subtitle: string;
    form: {
      submitText: string;
      fields: {
        name: string;
        email: string;
        phone: string;
        date: string;
        time: string;
        department: string;
        doctor: string;
        message: string;
      };
    };
  };
  businessHours: {
    weekdays: {
      days: string;
      hours: string;
    };
    saturday: {
      days: string;
      hours: string;
    };
  };
  departments?: {
    title: string;
    subtitle?: string;
    featured?: {
      title: string;
      description: string;
      image: string;
    };
    items?: Array<{
      title: string;
      icon?: string;
      description?: string;
      image?: string;
    }>;
  };
  faq?: {
    title: string;
    subtitle?: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  team?: {
    title: string;
    subtitle?: string;
    video?: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  footer?: {
    companyInfo: {
      name: string;
      fullName: string;
      address: {
        line1: string;
        line2: string;
        line3: string;
      };
      phone: string;
      email: string;
    };
    blog: {
      title: string;
      description: string;
      placeholder: string;
    };
    socialLinks: {
      facebook: string;
      linkedin: string;
      instagram: string;
      twitter: string;
    };
    copyright: string;
    credits: string;
  };
  articles?: Article[];
  media?: MediaItem[];
}

interface ContentContextType {
  content: ContentType;
  updateContent: (updates: Partial<ContentType>) => void;
}

// Type assertion with default values
const defaultContent: ContentType = {
  site: { title: '', subtitle: '', description: '' },
  contact: { email: '', phones: [] },
  navigation: { logo: '', menuItems: [], ctaButton: '' },
  hero: { title: '', subtitle: '', backgroundImage: '', ctaButtons: { primary: '', secondary: '' } },
  whyChoose: { title: '', description: '', image: '', features: [] },
  services: { title: '', subtitle: '', items: [] },
  doctors: { title: '', subtitle: '', members: [] },
  gallery: { title: '', subtitle: '', images: [] },
  contactInfo: { 
    title: '',
    subtitle: '',
    address: { title: '', line1: '', line2: '', line3: '' },
    email: { title: '', value: '' },
    phone: { title: '', value: '' },
    form: { fields: { name: '', email: '', subject: '', message: '' } }
  },
  appointment: {
    title: '',
    subtitle: '',
    form: {
      submitText: '',
      fields: {
        name: '', email: '', phone: '', date: '', time: '',
        department: '', doctor: '', message: ''
      }
    }
  },
  businessHours: {
    weekdays: { days: '', hours: '' },
    saturday: { days: '', hours: '' }
  },
  departments: { title: '', subtitle: '', featured: { title: '', description: '', image: '' }, items: [] },
  faq: { title: '', subtitle: '', questions: [] },
  team: { title: '', subtitle: '', video: '', features: [] },
  footer: {
    companyInfo: {
      name: '', fullName: '', address: { line1: '', line2: '', line3: '' }, phone: '', email: ''
    },
    blog: { title: '', description: '', placeholder: '' },
    socialLinks: { facebook: '', linkedin: '', instagram: '', twitter: '' },
    copyright: '',
    credits: ''
  },
  articles: [],
  media: []
};

// Merge with actual content data
const initialContent = { ...defaultContent, ...contentData } as ContentType;

// Ensure media array is properly loaded
if (contentData.media && Array.isArray(contentData.media)) {
  initialContent.media = contentData.media;
}

// Create context with merged values
const ContentContext = createContext<ContentContextType>({
  content: initialContent,
  updateContent: () => {},
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(initialContent);

  const updateContent = (updates: Partial<ContentType>) => {
    setContent(prev => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};
