import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { ArrowDownTrayIcon, PlusIcon, TrashIcon, ExclamationCircleIcon, PhotoIcon, PlayIcon } from '@heroicons/react/24/outline';
import { trackNewArticle, trackMediaUpload } from '../../services/analytics';

// Define the form data structure based on your content.json
type FormData = {
  site: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: {
    email: string;
    phones: string[];
    address?: {
      line1: string;
      line2: string;
      line3: string;
    };
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
  };
  team: {
    title: string;
    subtitle?: string;
    video?: string;
    features: Array<{
      title: string;
      description: string;
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
  contactInfo: {
    address: {
      line1: string;
      line2: string;
      line3: string;
    };
    email: {
      value: string;
    };
    phone: {
      value: string;
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
  gallery: {
    title: string;
    subtitle: string;
    images: string[];
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
  departments: {
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
    }>;
  };
  faq: {
    title: string;
    subtitle?: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  articles?: Array<{
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
  }>;
  media?: Array<{
    id: string;
    title: string;
    description: string;
    content: string;
    type: 'interview' | 'conference' | 'workshop' | 'campaign' | 'course' | 'seminar';
    date: string;
    location?: string;
    media: string;
    mediaType: 'youtube' | 'video' | 'image';
    images?: string[];
    featured: boolean;
    order: number;
  }>;
  footer: {
    companyInfo: {
      name: string;
      fullName: string;
      address: { line1: string; line2: string; line3: string };
      phone: string;
      email: string;
    };
    blog: { title: string; description: string; placeholder: string };
    socialLinks: { facebook: string; linkedin: string; instagram: string; twitter: string };
    copyright: string;
    credits: string;
  };
};

const ContentEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('site');
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize tab from URL and keep it in sync
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    // Check if we're on the articles route
    if (location.pathname.includes('/articles')) {
      setActiveTab('articles');
    } else if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.pathname]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(location.search);
    params.set('tab', tabId);
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: false });
  };
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    control,
    watch,
    setValue,
    formState: { errors } 
  } = useForm<FormData>();
  
  // Initialize field arrays for dynamic fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { fields: phoneFields, append: appendPhone, remove: removePhone } = (useFieldArray as any)({
    control,
    name: 'contact.phones' as const,
  });

  const { fields: doctorFields, append: appendDoctor, remove: removeDoctor } = useFieldArray({
    control,
    name: 'doctors.members' as const,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { fields: galleryFields, append: appendImage, remove: removeImage } = (useFieldArray as any)({
    control,
    name: 'gallery.images' as const,
  });

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control,
    name: 'services.items' as const,
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control,
    name: 'faq.questions' as const,
  });

  const { fields: departmentFields, append: appendDepartment, remove: removeDepartment } = useFieldArray({
    control,
    name: 'departments.items' as const,
  });

  const { fields: teamFeatureFields, append: appendTeamFeature, remove: removeTeamFeature } = useFieldArray({
    control,
    name: 'team.features' as const,
  });

  const { fields: articleFields, append: appendArticle, remove: removeArticle } = useFieldArray({
    control,
    name: 'articles' as const,
  });

  const { fields: mediaFields, append: appendMedia, remove: removeMedia } = useFieldArray({
    control,
    name: 'media' as const,
  });

  // Watch for image uploads
  const heroImage = watch('hero.backgroundImage');
  const whyChooseImage = watch('whyChoose.image');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to fetch from your API server first
        try {
          const response = await fetch('/api/content');
          if (response.ok) {
            const data = await response.json();
            
            // Transform the data to match our form structure
            const formData: FormData = {
              site: {
                title: data.site?.title || '',
                subtitle: data.site?.subtitle || '',
                description: data.site?.description || '',
              },
              contact: {
                email: data.contact?.email || '',
                phones: data.contact?.phones || [''],
                address: {
                  line1: data.contactInfo?.address?.line1 || '',
                  line2: data.contactInfo?.address?.line2 || '',
                  line3: data.contactInfo?.address?.line3 || '',
                },
              },
              hero: {
                title: data.hero?.title || '',
                subtitle: data.hero?.subtitle || '',
                backgroundImage: data.hero?.backgroundImage || '',
                ctaButtons: {
                  primary: data.hero?.ctaButtons?.primary || '',
                  secondary: data.hero?.ctaButtons?.secondary || '',
                },
              },
              whyChoose: {
                title: data.whyChoose?.title || '',
                description: data.whyChoose?.description || '',
                image: data.whyChoose?.image || '',
              },
              team: {
                title: (data.team?.title || data.doctors?.title || ''),
                subtitle: (data.team?.subtitle || data.doctors?.subtitle || ''),
                video: data.team?.video || '',
                features: data.team?.features || [],
              },
              doctors: {
                title: data.doctors?.title || '',
                subtitle: data.doctors?.subtitle || '',
                members: data.doctors?.members || [],
              },
              contactInfo: {
                address: {
                  line1: data.contactInfo?.address?.line1 || '',
                  line2: data.contactInfo?.address?.line2 || '',
                  line3: data.contactInfo?.address?.line3 || '',
                },
                email: {
                  value: data.contactInfo?.email?.value || data.contact?.email || '',
                },
                phone: {
                  value: data.contactInfo?.phone?.value || data.contact?.phones?.[0] || '',
                },
              },
              businessHours: {
                weekdays: {
                  days: data.businessHours?.weekdays?.days || '',
                  hours: data.businessHours?.weekdays?.hours || '',
                },
                saturday: {
                  days: data.businessHours?.saturday?.days || '',
                  hours: data.businessHours?.saturday?.hours || '',
                },
              },
              gallery: {
                title: data.gallery?.title || '',
                subtitle: data.gallery?.subtitle || '',
                images: data.gallery?.images || [],
              },
              services: {
                title: data.services?.title || '',
                subtitle: data.services?.subtitle || '',
                items: data.services?.items || [],
              },
              departments: {
                title: data.departments?.title || '',
                subtitle: data.departments?.subtitle || '',
                featured: data.departments?.featured || { title: '', description: '', image: '' },
                items: data.departments?.items || [],
              },
              faq: {
                title: data.faq?.title || '',
                subtitle: data.faq?.subtitle || '',
                questions: data.faq?.questions || [],
              },
              articles: data.articles || [],
              media: data.media || [],
              footer: {
                companyInfo: {
                  name: data.footer?.companyInfo?.name || '',
                  fullName: data.footer?.companyInfo?.fullName || '',
                  address: {
                    line1: data.footer?.companyInfo?.address?.line1 || '',
                    line2: data.footer?.companyInfo?.address?.line2 || '',
                    line3: data.footer?.companyInfo?.address?.line3 || '',
                  },
                  phone: data.footer?.companyInfo?.phone || '',
                  email: data.footer?.companyInfo?.email || '',
                },
                blog: {
                  title: data.footer?.blog?.title || '',
                  description: data.footer?.blog?.description || '',
                  placeholder: data.footer?.blog?.placeholder || '',
                },
                socialLinks: {
                  facebook: data.footer?.socialLinks?.facebook || '',
                  linkedin: data.footer?.socialLinks?.linkedin || '',
                  instagram: data.footer?.socialLinks?.instagram || '',
                  twitter: data.footer?.socialLinks?.twitter || '',
                },
                copyright: data.footer?.copyright || '',
                credits: data.footer?.credits || '',
              },
            };
            
            reset(formData);
            setIsLoading(false);
            return;
          }
        } catch (apiError) {
          console.warn('API server not available, trying static file...');
        }
        
        // Fallback to static file if API server is not available
        const response = await fetch('/api/content');
                if (!response.ok) throw new Error('Failed to load content from both API and static file');
        
        const data = await response.json();
        const formData: FormData = {
          site: {
            title: data.site?.title || '',
            subtitle: data.site?.subtitle || '',
            description: data.site?.description || '',
          },
          contact: {
            email: data.contact?.email || '',
            phones: data.contact?.phones || [''],
            address: {
              line1: data.contactInfo?.address?.line1 || '',
              line2: data.contactInfo?.address?.line2 || '',
              line3: data.contactInfo?.address?.line3 || '',
            },
          },
          hero: {
            title: data.hero?.title || '',
            subtitle: data.hero?.subtitle || '',
            backgroundImage: data.hero?.backgroundImage || '',
            ctaButtons: {
              primary: data.hero?.ctaButtons?.primary || '',
              secondary: data.hero?.ctaButtons?.secondary || '',
            },
          },
          whyChoose: {
            title: data.whyChoose?.title || '',
            description: data.whyChoose?.description || '',
            image: data.whyChoose?.image || '',
          },
          team: {
            title: (data.team?.title || data.doctors?.title || ''),
            subtitle: (data.team?.subtitle || data.doctors?.subtitle || ''),
            video: data.team?.video || '',
            features: data.team?.features || [],
          },
          doctors: {
            title: data.doctors?.title || '',
            subtitle: data.doctors?.subtitle || '',
            members: data.doctors?.members || [],
          },
          contactInfo: {
            address: {
              line1: data.contactInfo?.address?.line1 || '',
              line2: data.contactInfo?.address?.line2 || '',
              line3: data.contactInfo?.address?.line3 || '',
            },
            email: { value: data.contactInfo?.email?.value || data.contact?.email || '' },
            phone: { value: data.contactInfo?.phone?.value || data.contact?.phones?.[0] || '' },
          },
          businessHours: {
            weekdays: { days: data.businessHours?.weekdays?.days || '', hours: data.businessHours?.weekdays?.hours || '' },
            saturday: { days: data.businessHours?.saturday?.days || '', hours: data.businessHours?.saturday?.hours || '' },
          },
          gallery: {
            title: data.gallery?.title || '',
            subtitle: data.gallery?.subtitle || '',
            images: data.gallery?.images || [],
          },
          services: {
            title: data.services?.title || '',
            subtitle: data.services?.subtitle || '',
            items: data.services?.items || [],
          },
          departments: {
            title: data.departments?.title || '',
            subtitle: data.departments?.subtitle || '',
            featured: data.departments?.featured || { title: '', description: '', image: '' },
            items: data.departments?.items || [],
          },
          faq: {
            title: data.faq?.title || '',
            subtitle: data.faq?.subtitle || '',
            questions: data.faq?.questions || [],
          },
          articles: data.articles || [],
          media: data.media || [],
          footer: {
            companyInfo: {
              name: data.footer?.companyInfo?.name || '',
              fullName: data.footer?.companyInfo?.fullName || '',
              address: {
                line1: data.footer?.companyInfo?.address?.line1 || '',
                line2: data.footer?.companyInfo?.address?.line2 || '',
                line3: data.footer?.companyInfo?.address?.line3 || '',
              },
              phone: data.footer?.companyInfo?.phone || '',
              email: data.footer?.companyInfo?.email || '',
            },
            blog: {
              title: data.footer?.blog?.title || '',
              description: data.footer?.blog?.description || '',
              placeholder: data.footer?.blog?.placeholder || '',
            },
            socialLinks: {
              facebook: data.footer?.socialLinks?.facebook || '',
              linkedin: data.footer?.socialLinks?.linkedin || '',
              instagram: data.footer?.socialLinks?.instagram || '',
              twitter: data.footer?.socialLinks?.twitter || '',
            },
            copyright: data.footer?.copyright || '',
            credits: data.footer?.credits || '',
          },
        };
        reset(formData);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(`Failed to load content: ${errorMessage}`);
        console.error('Error loading content:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchContent();
  }, [reset]);

  // Handle file uploads
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Try real upload to the API server
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const result = await res.json();
      if (!result?.url) {
        throw new Error('Upload did not return a URL');
      }

      // Track media upload
      const filename = result.url.split('/').pop() || 'unknown';
      trackMediaUpload(filename);

      // Set the persistent URL returned by the server
      setValue(fieldName as any, result.url);
      showMessage('Image uploaded successfully!', 'success');
    } catch (error) {
      // Fallback to local preview URL if API upload fails
      const previewUrl = URL.createObjectURL(file);
      setValue(fieldName as any, previewUrl);
      showMessage('Upload server not available. Using temporary preview. Please save a permanent URL later.', 'warning');
    }
  };

  // Show notification messages
  const showMessage = (message: string, type: 'success' | 'error' | 'warning') => {
    const msg = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';
    msg.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50`;
    msg.textContent = message;
    document.body.appendChild(msg);
    
    setTimeout(() => {
      msg.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => msg.remove(), 300);
    }, 3000);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSaving(true);
      setError(null);

      // Build the complete JSON structure
      const updatedContent = {
        site: data.site,
        contact: {
          email: data.contact.email,
          phones: data.contact.phones.filter(phone => phone.trim() !== '')
        },
        navigation: {
          logo: "/your-logo.webp",
          menuItems: [
            { label: "Accueil", href: "#accueil" },
            { label: "Infos", href: "#infos" },
            { label: "Services", href: "#services" },
            { label: "Départements", href: "#departements" },
            { label: "Médecins", href: "#medecins" },
            { label: "Médias", href: "#medias" },
            { label: "Contact", href: "#contact" }
          ],
          ctaButton: "Rendez-Vous"
        },
        hero: data.hero,
        whyChoose: {
          ...data.whyChoose,
          features: [
            {
              title: "Une approche centrée sur le patient",
              description: "Une optimisation des examens, une communication claire et un suivi personnalisé.",
              icon: "Heart"
            },
            {
              title: "Un diagnostic synthétique",
              description: "Des services d'expertise et de relecture, en coordination avec les médecins soignants.",
              icon: "Target"
            },
            {
              title: "Un engagement sociale et scientifique",
              description: "Des participations bénévoles avec des partenaires reconnus.",
              icon: "Award"
            }
          ]
        },
        team: {
          title: data.team.title,
          subtitle: data.team.subtitle || '',
          video: data.team.video || '',
          features: (data.team.features || []).filter(f => (f.title?.trim() || f.description?.trim())),
        },
        services: data.services,
        departments: data.departments,
        faq: data.faq,
        articles: data.articles,
        media: data.media,
        footer: data.footer,
        doctors: {
          title: data.doctors.title,
          subtitle: data.doctors.subtitle,
          members: data.doctors.members.filter(member => member.name.trim() !== '')
        },
        gallery: {
          title: data.gallery.title,
          subtitle: data.gallery.subtitle,
          images: data.gallery.images.filter(image => image.trim() !== '')
        },
        contactInfo: data.contactInfo,
        businessHours: data.businessHours,
      };
      
      // Try to save via API first
      try {
        const response = await fetch('/api/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedContent),
        });
        
        if (response.ok) {
          // Track new articles if any were added
          const newArticles = data.articles?.filter((article: any) => 
            article.title && !article.title.includes('article-') && article.featured
          ) || [];
          
          if (newArticles.length > 0) {
            newArticles.forEach((article: any) => {
              trackNewArticle(article.title);
            });
          }
          
          showMessage('Content saved successfully! Changes are live immediately.', 'success');
          console.log('✅ Content saved to server successfully!');
          return;
        } else {
          throw new Error('Server responded with error');
        }
      } catch (apiError) {
        console.warn('Failed to save to API server, falling back to download...', apiError);
        
        // Fallback to download if API is not available
        downloadUpdatedContent(updatedContent);
        showMessage('API server not available. File downloaded - replace content.json manually.', 'warning');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to save content: ${errorMessage}`);
      showMessage(`Error: ${errorMessage}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Download updated content as JSON file
  const downloadContent = () => {
    const formData = watch();
    const content = JSON.stringify(formData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'site', name: 'Site Info', icon: '🏥' },
    { id: 'hero', name: 'Hero Section', icon: '🎯' },
    { id: 'about', name: 'About/Why Choose', icon: '💡' },
    { id: 'team', name: 'Team', icon: '👥' },
    { id: 'doctors', name: 'Doctors', icon: '👨‍⚕️' },
    { id: 'contact', name: 'Contact', icon: '📞' },
    { id: 'hours', name: 'Business Hours', icon: '🕒' },
    { id: 'gallery', name: 'Gallery', icon: '📸' },
    { id: 'services', name: 'Services', icon: '🩺' },
    { id: 'departments', name: 'Departments', icon: '🏷️' },
    { id: 'media', name: 'Médias', icon: '📺' },
    { id: 'faq', name: 'FAQ', icon: '❓' },
    { id: 'articles', name: 'Articles', icon: '📰' },
    { id: 'footer', name: 'Footer', icon: '🦶' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Editor</h1>
            <p className="text-sm text-gray-600">Update your website content directly</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={downloadContent}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Download JSON
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Team (About Us)</h3>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" {...register('team.title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input type="text" {...register('team.subtitle')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Video URL</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <input type="url" placeholder="https://... or /uploads/..." {...register('team.video')} className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <div className="relative">
                        <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e as unknown as React.ChangeEvent<HTMLInputElement>, 'team.video')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <PhotoIcon className="h-4 w-4 mr-2" /> Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Features</h4>
                    <button type="button" onClick={() => appendTeamFeature({ title: '', description: '' })} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      <PlusIcon className="h-4 w-4 mr-1" /> Add Feature
                    </button>
                  </div>

                  {teamFeatureFields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-gray-900">Feature {index + 1}</h5>
                        <button type="button" onClick={() => removeTeamFeature(index)} className="text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input type="text" {...register(`team.features.${index}.title` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea rows={3} {...register(`team.features.${index}.description` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

      <div className="bg-white shadow-sm rounded-lg">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
          {/* Site Info Tab */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Site Title</label>
                    <input
                      type="text"
                      {...register('site.title', { required: 'Site title is required' })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.site?.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.site.title.message}</p>
                    )}

          
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input
                      type="text"
                      {...register('site.subtitle')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={4}
                      {...register('site.description')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
                <div className="grid grid-cols-1 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" {...register('services.title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input type="text" {...register('services.subtitle')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Service Items</h4>
                    <button type="button" onClick={() => appendService({ title: '', description: '', icon: '', image: '' })} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      <PlusIcon className="h-4 w-4 mr-1" /> Add Service
                    </button>
                  </div>

                  {serviceFields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-gray-900">Service {index + 1}</h5>
                        {index > 0 && (
                          <button type="button" onClick={() => removeService(index)} className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input type="text" {...register(`services.items.${index}.title` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Icon</label>
                          <input type="text" {...register(`services.items.${index}.icon` as const)} placeholder="e.g., Camera" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea rows={3} {...register(`services.items.${index}.description` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Image URL</label>
                          <div className="mt-1 flex items-center space-x-4">
                            <input type="url" placeholder="Enter image URL" {...register(`services.items.${index}.image` as const)} className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            <div className="relative">
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, `services.items.${index}.image`)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                              <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                <PhotoIcon className="h-4 w-4 mr-2" /> Upload
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Departments</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" {...register('departments.title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input type="text" {...register('departments.subtitle')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>

                  {/* Departments list */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-900">Department Items</h4>
                      <button type="button" onClick={() => appendDepartment({ title: '', icon: '' })} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        <PlusIcon className="h-4 w-4 mr-1" /> Add Department
                      </button>
                    </div>

                    {departmentFields.map((field, index) => (
                      <div key={field.id} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="font-medium text-gray-900">Department {index + 1}</h5>
                          {index > 0 && (
                            <button type="button" onClick={() => removeDepartment(index)} className="text-red-600 hover:text-red-800">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" {...register(`departments.items.${index}.title` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Icon</label>
                            <input type="text" placeholder="e.g., Camera, Monitor, Target, Scan, Search, UserCheck" {...register(`departments.items.${index}.icon` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea rows={3} {...register(`departments.items.${index}.description` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <div className="mt-1 flex items-center space-x-4">
                              <input type="url" placeholder="Enter image URL" {...register(`departments.items.${index}.image` as const)} className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                              <div className="relative">
                                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, `departments.items.${index}.image`)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                  <PhotoIcon className="h-4 w-4 mr-2" /> Upload
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <h4 className="text-md font-medium text-gray-900">Featured</h4>
                    <input type="text" placeholder="Featured Title" {...register('departments.featured.title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <textarea rows={3} placeholder="Featured Description" {...register('departments.featured.description')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <div className="mt-1 flex items-center space-x-4">
                      <input type="url" placeholder="Featured Image URL" {...register('departments.featured.image')} className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <div className="relative">
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'departments.featured.image')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <PhotoIcon className="h-4 w-4 mr-2" /> Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">FAQ</h3>
                <div className="grid grid-cols-1 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" {...register('faq.title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input type="text" {...register('faq.subtitle')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Questions</h4>
                    <button type="button" onClick={() => appendFaq({ question: '', answer: '' })} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      <PlusIcon className="h-4 w-4 mr-1" /> Add Question
                    </button>
                  </div>

                  {faqFields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-gray-900">Question {index + 1}</h5>
                        {index > 0 && (
                          <button type="button" onClick={() => removeFaq(index)} className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Question</label>
                          <input type="text" {...register(`faq.questions.${index}.question` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Answer</label>
                          <textarea rows={3} {...register(`faq.questions.${index}.answer` as const)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Médias & Interventions</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Éléments Médias</h4>
                    <button
                      type="button"
                      onClick={() => appendMedia({
                        id: `media-${Date.now()}`,
                        title: '',
                        description: '',
                        content: '',
                        type: 'interview',
                        date: new Date().toISOString().split('T')[0],
                        location: '',
                        media: '',
                        mediaType: 'image',
                        images: [],
                        featured: false,
                        order: mediaFields.length + 1
                      })}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Media
                    </button>
                  </div>

                  {mediaFields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-gray-900">Média {index + 1}</h5>
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Titre</label>
                            <input
                              type="text"
                              {...register(`media.${index}.title` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                              {...register(`media.${index}.type` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="interview">Interview</option>
                              <option value="conference">Conférence</option>
                              <option value="workshop">Workshop</option>
                              <option value="campaign">Campagne</option>
                              <option value="course">Cours</option>
                              <option value="seminar">Séminaire</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            {...register(`media.${index}.description` as const)}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                              type="date"
                              {...register(`media.${index}.date` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Lieu (optionnel)</label>
                            <input
                              type="text"
                              {...register(`media.${index}.location` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Type de Média</label>
                            <select
                              {...register(`media.${index}.mediaType` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="image">Image</option>
                              <option value="video">Vidéo</option>
                              <option value="youtube">YouTube</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Ordre d'affichage</label>
                            <input
                              type="number"
                              {...register(`media.${index}.order` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            {watch(`media.${index}.mediaType`) === 'youtube' ? 'URL YouTube' : 
                             watch(`media.${index}.mediaType`) === 'video' ? 'Fichier Vidéo' : 'Image Principale'}
                          </label>
                          {watch(`media.${index}.mediaType`) === 'youtube' ? (
                            <input
                              type="url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              {...register(`media.${index}.media` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          ) : (
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload file</span>
                                    <input
                                      type="file"
                                      className="sr-only"
                                      accept={watch(`media.${index}.mediaType`) === 'video' ? 'video/*' : 'image/*'}
                                      onChange={(e) => handleFileUpload(e, `media.${index}.media`)}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {watch(`media.${index}.mediaType`) === 'video' ? 'MP4, WebM up to 10MB' : 'PNG, JPG, WebP up to 10MB'}
                                </p>
                              </div>
                            </div>
                          )}
                          {watch(`media.${index}.media`) && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">URL: {watch(`media.${index}.media`)}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Contenu détaillé</label>
                          <textarea
                            {...register(`media.${index}.content` as const)}
                            rows={6}
                            placeholder="Description complète de l'intervention, interview, conférence..."
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            {...register(`media.${index}.featured` as const)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Média en vedette
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Articles Scientifiques</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Articles</h4>
                    <button
                      type="button"
                      onClick={() => appendArticle({
                        id: `article-${Date.now()}`,
                        title: '',
                        excerpt: '',
                        content: '',
                        image: '',
                        video: '',
                        author: 'Dr Zeineb Belkhiria',
                        publishDate: new Date().toISOString().split('T')[0],
                        category: 'Technologie',
                        featured: true
                      })}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Article
                    </button>
                  </div>

                  {articleFields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-gray-900">Article {index + 1}</h5>
                        <button
                          type="button"
                          onClick={() => removeArticle(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            {...register(`articles.${index}.title` as const)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                          <textarea
                            rows={2}
                            {...register(`articles.${index}.excerpt` as const)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Content</label>
                          <textarea
                            rows={6}
                            {...register(`articles.${index}.content` as const)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Author</label>
                            <input
                              type="text"
                              {...register(`articles.${index}.author` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                            <input
                              type="date"
                              {...register(`articles.${index}.publishDate` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                              {...register(`articles.${index}.category` as const)}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="Technologie">Technologie</option>
                              <option value="Innovation">Innovation</option>
                              <option value="Technique">Technique</option>
                              <option value="Organisation">Organisation</option>
                              <option value="Qualité">Qualité</option>
                              <option value="Recherche">Recherche</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              {...register(`articles.${index}.featured` as const)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">Featured Article</label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Image URL</label>
                          <div className="mt-1 flex items-center space-x-4">
                            <input
                              type="url"
                              {...register(`articles.${index}.image` as const)}
                              placeholder="Enter image URL"
                              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, `articles.${index}.image`)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <PhotoIcon className="h-4 w-4 mr-2" />
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Video URL (Optional)</label>
                          <div className="mt-1 flex items-center space-x-4">
                            <input
                              type="url"
                              {...register(`articles.${index}.video` as const)}
                              placeholder="Enter video URL"
                              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileUpload(e, `articles.${index}.video`)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <PhotoIcon className="h-4 w-4 mr-2" />
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Tab */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Footer</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">Company Info</h4>
                    <input type="text" placeholder="Name" {...register('footer.companyInfo.name')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" placeholder="Full Name" {...register('footer.companyInfo.fullName')} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <input type="text" placeholder="Address line 1" {...register('footer.companyInfo.address.line1')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <input type="text" placeholder="Address line 2" {...register('footer.companyInfo.address.line2')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <input type="text" placeholder="Address line 3" {...register('footer.companyInfo.address.line3')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <input type="text" placeholder="Phone" {...register('footer.companyInfo.phone')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <input type="email" placeholder="Email" {...register('footer.companyInfo.email')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">Blog/Newsletter</h4>
                    <input type="text" placeholder="Title" {...register('footer.blog.title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <textarea rows={3} placeholder="Description" {...register('footer.blog.description')} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" placeholder="Placeholder" {...register('footer.blog.placeholder')} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">Social Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input type="url" placeholder="Facebook" {...register('footer.socialLinks.facebook')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <input type="url" placeholder="LinkedIn" {...register('footer.socialLinks.linkedin')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <input type="url" placeholder="Instagram" {...register('footer.socialLinks.instagram')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                      <input type="url" placeholder="Twitter" {...register('footer.socialLinks.twitter')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input type="text" placeholder="Copyright" {...register('footer.copyright')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" placeholder="Credits" {...register('footer.credits')} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                    <input
                      type="text"
                      {...register('hero.title')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                    <textarea
                      rows={3}
                      {...register('hero.subtitle')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Background Image</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <input
                        type="url"
                        {...register('hero.backgroundImage')}
                        placeholder="Enter image URL"
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'hero.backgroundImage')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <PhotoIcon className="h-4 w-4 mr-2" />
                          Upload
                        </button>
                      </div>
                    </div>
                    {heroImage && (
                      <img src={heroImage} alt="Hero preview" className="mt-2 h-32 w-full object-cover rounded-md" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Primary Button Text</label>
                      <input
                        type="text"
                        {...register('hero.ctaButtons.primary')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Secondary Button Text</label>
                      <input
                        type="text"
                        {...register('hero.ctaButtons.secondary')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* About/Why Choose Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Why Choose Us Section</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Section Title</label>
                    <input
                      type="text"
                      {...register('whyChoose.title')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={6}
                      {...register('whyChoose.description')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Section Image</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <input
                        type="url"
                        {...register('whyChoose.image')}
                        placeholder="Enter image URL"
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'whyChoose.image')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <PhotoIcon className="h-4 w-4 mr-2" />
                          Upload
                        </button>
                      </div>
                    </div>
                    {whyChooseImage && (
                      <img src={whyChooseImage} alt="Section preview" className="mt-2 h-32 w-full object-cover rounded-md" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Doctors Section</h3>
                
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Section Title</label>
                    <input
                      type="text"
                      {...register('doctors.title')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Section Subtitle</label>
                    <textarea
                      rows={3}
                      {...register('doctors.subtitle')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Doctors List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Team Members</h4>
                    <button
                      type="button"
                      onClick={() => appendDoctor({ name: '', specialty: '', description: '', image: '' })}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Doctor
                    </button>
                  </div>

                  {doctorFields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-gray-900">Doctor {index + 1}</h5>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeDoctor(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            {...register(`doctors.members.${index}.name` as const)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Specialty</label>
                          <input
                            type="text"
                            {...register(`doctors.members.${index}.specialty` as const)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            rows={3}
                            {...register(`doctors.members.${index}.description` as const)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                          <div className="mt-1 flex items-center space-x-4">
                            <input
                              type="url"
                              {...register(`doctors.members.${index}.image` as const)}
                              placeholder="Enter image URL"
                              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, `doctors.members.${index}.image`)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <PhotoIcon className="h-4 w-4 mr-2" />
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      {...register('contactInfo.email.value')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
                    <input
                      type="tel"
                      {...register('contactInfo.phone.value')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Additional Phone Numbers</label>
                      <button
                        type="button"
                        onClick={() => appendPhone('')}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-600 hover:text-indigo-500"
                      >
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Phone
                      </button>
                    </div>
                    
                    {phoneFields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-2 mt-2">
                        <input
                          type="tel"
                          {...register(`contact.phones.${index}` as const)}
                          className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Phone number"
                        />
                        <button
                          type="button"
                          onClick={() => removePhone(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        {...register('contactInfo.address.line1')}
                        placeholder="Address Line 1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        {...register('contactInfo.address.line2')}
                        placeholder="Address Line 2"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        {...register('contactInfo.address.line3')}
                        placeholder="Address Line 3"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Hours Tab */}
          {activeTab === 'hours' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weekdays</label>
                    <div className="mt-1 space-y-2">
                      <input
                        type="text"
                        {...register('businessHours.weekdays.days')}
                        placeholder="e.g., Lundi au Vendredi"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        {...register('businessHours.weekdays.hours')}
                        placeholder="e.g., 8h à 19h"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Saturday</label>
                    <div className="mt-1 space-y-2">
                      <input
                        type="text"
                        {...register('businessHours.saturday.days')}
                        placeholder="e.g., 2 samedis par mois"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        {...register('businessHours.saturday.hours')}
                        placeholder="e.g., 9h à 13h"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery Section</h3>
                
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Title</label>
                    <input
                      type="text"
                      {...register('gallery.title')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Subtitle</label>
                    <textarea
                      rows={3}
                      {...register('gallery.subtitle')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">Gallery Images</h4>
                    <button
                      type="button"
                      onClick={() => appendImage('')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Image
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryFields.map((field, index) => (
                      <div key={field.id} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-medium text-gray-900 text-sm">Image {index + 1}</h5>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center space-x-3">
                              <input
                                type="url"
                                {...register(`gallery.images.${index}` as const)}
                                placeholder="Enter image URL"
                                className="flex-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                              />
                              <div className="relative">
                                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, `gallery.images.${index}`)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <button type="button" className="inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                  <PhotoIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {watch(`gallery.images.${index}`) && (
                            <div className="mt-2">
                              <img 
                                src={watch(`gallery.images.${index}`)} 
                                alt={`Gallery preview ${index + 1}`} 
                                className="w-full h-24 object-cover rounded-md"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {galleryFields.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by adding a new image.</p>
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => appendImage('')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add First Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={downloadContent}
              className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download JSON
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5 animate-pulse" />
                  Saving...
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Instructions Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">How to use the Content Editor:</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Start your server:</strong> Run <code className="bg-blue-100 px-1 rounded">node server/server.js</code> in your terminal</li>
                <li>Edit your content using the tabs above</li>
                <li>Click "Save Changes" - if the server is running, changes save automatically!</li>
                <li>If the server is not running, the file will download for manual replacement</li>
                <li>Refresh your main website to see changes</li>
              </ol>
              <div className="mt-3 p-2 bg-green-100 rounded border-l-4 border-green-500">
                <p className="text-sm text-green-800">
                  <strong>Pro tip:</strong> With the server running, your changes take effect immediately without manual file replacement!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;