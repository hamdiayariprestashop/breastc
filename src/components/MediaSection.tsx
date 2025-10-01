import React, { useState } from 'react';
import { MediaItem } from '../types/content';
import { trackMediaView } from '../services/analytics';
import { PlayIcon, CalendarIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface MediaSectionProps {
  mediaItems: MediaItem[];
}

const MediaSection: React.FC<MediaSectionProps> = ({ mediaItems }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort media items by order and date
  const sortedMediaItems = [...mediaItems].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.order - a.order;
  });

  const handleMediaClick = (mediaItem: MediaItem) => {
    // Track media view
    trackMediaView(mediaItem.id, mediaItem.title);
    setSelectedMedia(mediaItem);
    setIsModalOpen(true);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'interview': return '🎤';
      case 'conference': return '🎯';
      case 'workshop': return '🔧';
      case 'campaign': return '🎗️';
      case 'course': return '📚';
      case 'seminar': return '💡';
      default: return '📺';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'interview': return 'Interview';
      case 'conference': return 'Conférence';
      case 'workshop': return 'Workshop';
      case 'campaign': return 'Campagne';
      case 'course': return 'Cours';
      case 'seminar': return 'Séminaire';
      default: return 'Média';
    }
  };

  const renderMediaContent = (mediaItem: MediaItem) => {
    if (mediaItem.mediaType === 'youtube') {
      const videoId = mediaItem.media.includes('youtube.com/watch?v=') 
        ? mediaItem.media.split('v=')[1].split('&')[0]
        : mediaItem.media.includes('youtu.be/')
        ? mediaItem.media.split('youtu.be/')[1].split('?')[0]
        : '';
      
      return (
        <div className="relative group cursor-pointer" onClick={() => handleMediaClick(mediaItem)}>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={mediaItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
              <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <PlayIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (mediaItem.mediaType === 'video') {
      return (
        <div className="relative group cursor-pointer" onClick={() => handleMediaClick(mediaItem)}>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              src={mediaItem.media}
              className="w-full h-full object-cover"
              muted
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
              <div className="bg-blue-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <PlayIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative group cursor-pointer" onClick={() => handleMediaClick(mediaItem)}>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={mediaItem.media}
              alt={mediaItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                <PhotoIcon className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Médias & Interventions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les interventions, interviews et participations de Dr. Zeineb Belkhiria 
            dans les médias, conférences et campagnes de sensibilisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMediaItems.map((mediaItem) => (
            <div key={mediaItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {renderMediaContent(mediaItem)}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getMediaIcon(mediaItem.type)} {getTypeLabel(mediaItem.type)}
                  </span>
                  {mediaItem.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ⭐ Vedette
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {mediaItem.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {mediaItem.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{new Date(mediaItem.date).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  {mediaItem.location && (
                    <>
                      <MapPinIcon className="h-4 w-4 ml-4 mr-1" />
                      <span>{mediaItem.location}</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleMediaClick(mediaItem)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedMediaItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun média disponible</h3>
            <p className="text-gray-500">Les médias et interventions seront ajoutés prochainement.</p>
          </div>
        )}
      </div>

      {/* Modal for detailed view */}
      {isModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                      {getMediaIcon(selectedMedia.type)} {getTypeLabel(selectedMedia.type)}
                    </span>
                    {selectedMedia.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Vedette
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMedia.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(selectedMedia.date).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    {selectedMedia.location && (
                      <>
                        <MapPinIcon className="h-4 w-4 ml-4 mr-1" />
                        <span>{selectedMedia.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                {selectedMedia.mediaType === 'youtube' && (
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedMedia.media.includes('youtube.com/watch?v=') 
                        ? selectedMedia.media.split('v=')[1].split('&')[0]
                        : selectedMedia.media.split('youtu.be/')[1].split('?')[0]}`}
                      title={selectedMedia.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
                {selectedMedia.mediaType === 'video' && (
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <video
                      src={selectedMedia.media}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                )}
                {selectedMedia.mediaType === 'image' && (
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={selectedMedia.media}
                      alt={selectedMedia.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: selectedMedia.content }}
                />
              </div>

              {selectedMedia.images && selectedMedia.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Galerie d'images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedMedia.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedMedia.title} - Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaSection;
