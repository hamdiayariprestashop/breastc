import React from 'react';
import { useContent } from '../contexts/ContentContext';

const Team: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="equipe" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {content?.doctors?.title || 'Notre Équipe'}
          </h2>
          <p className="text-xl text-purple-600 font-medium max-w-3xl mx-auto">
            {content?.doctors?.subtitle || ''}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(content?.doctors?.members || []).map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member?.image || ''}
                  alt={member?.name || ''}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member?.name || ''}
                </h3>
                <p className="text-purple-600 font-medium mb-3 text-sm">
                  {member?.specialty || ''}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member?.description || ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;