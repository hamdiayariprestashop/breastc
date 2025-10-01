import React from 'react';
import { Heart, Award, Target } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const About: React.FC = () => {
  const iconMap = {
    0: Heart,
    1: Target,
    2: Award
  };

  const { content } = useContent();

  return (
    <>
      {/* Why Choose BIC Section */}
      <section id="infos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {content?.whyChoose?.title || 'Pourquoi Choisir BIC ?'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                {content?.whyChoose?.description || ''}
              </p>

              <div className="space-y-8">
                {(content?.whyChoose?.features || []).map((feature, index) => {
                  const IconComponent = iconMap[index as keyof typeof iconMap];
                  
                  return (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-5 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {feature?.title || ''}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature?.description || ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={content?.whyChoose?.image || 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'}
                  alt={content?.whyChoose?.title || 'Centre médical'}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Intro Section (video left, content right) */}
      <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Video (if available) */}
              <div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-2">
                  {content?.team?.video ? (
                    <video className="w-full h-auto rounded-xl" controls poster={content?.whyChoose?.image || undefined}>
                      <source src={content.team.video} />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  ) : (
                    <div className="w-full h-64 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                      Aucune vidéo sélectionnée
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Text + Features */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {content?.team?.title || "Une Équipe Dédiée à Votre Santé"}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content?.team?.subtitle || "Nous sommes une équipe de spécialistes engagés, unissant expertise médicale et innovation technologique pour offrir des soins de qualité et un suivi personnalisé."}
                  </p>
                </div>

                <div className="space-y-6">
                  {(content?.team?.features || []).map((f, i) => (
                    <div key={i} className="group bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-6 shadow-sm border border-purple-100">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {f?.title || ''}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {f?.description || ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default About;