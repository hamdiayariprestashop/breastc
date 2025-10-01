import React, { useState } from 'react';
import { Calendar, User, Eye, Play, Image as ImageIcon } from 'lucide-react';
import { Article } from '../types/content';
import { trackArticleView } from '../services/analytics';

interface ScientificArticlesProps {
  articles: Article[];
}

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(article.publishDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-4 bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Media content */}
            {(article.image || article.video) && (
              <div className="mb-6">
                {article.video ? (
                  <div className="relative w-full h-64 sm:h-96 bg-gray-900 rounded-lg overflow-hidden">
                    <video 
                      src={article.video} 
                      controls 
                      className="w-full h-full object-contain"
                      poster={article.image}
                    >
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  </div>
                ) : article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-64 sm:h-96 object-cover rounded-lg"
                  />
                ) : null}
              </div>
            )}

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScientificArticles: React.FC<ScientificArticlesProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (article: Article) => {
    // Track article view
    trackArticleView(article.id);
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  // Sort articles by publish date (newest first) and filter featured ones
  const sortedArticles = articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6); // Show only 6 most recent featured articles

  if (sortedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Articles Scientifiques
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Découvrez nos dernières publications scientifiques et nos recherches en imagerie médicale. 
            Nos articles explorent les avancées technologiques et les meilleures pratiques en radiologie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Media */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {article.video ? (
                  <div className="relative w-full h-full">
                    <video 
                      src={article.video} 
                      className="w-full h-full object-cover"
                      poster={article.image}
                      muted
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                ) : article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(article.publishDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Read more button */}
                <button
                  onClick={() => handleReadMore(article)}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center group/btn"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Lire l'article
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View all articles button */}
        {articles.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-white text-purple-600 border-2 border-purple-600 py-3 px-8 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200">
              Voir tous les articles
            </button>
          </div>
        )}
      </div>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ScientificArticles;
