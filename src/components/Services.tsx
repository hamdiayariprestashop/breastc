import React from 'react';
import { Camera, Monitor, Scan, Target, Search, UserCheck } from 'lucide-react';
import content from '../data/content.json';

const Services: React.FC = () => {
  const iconMap = {
    'Camera': Camera,
    'Monitor': Monitor,
    'Scan': Scan,
    'Target': Target,
    'Search': Search,
    'UserCheck': UserCheck
  };

  const services = content?.services;

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {services?.title || 'Nos Services'}
          </h2>
          <p className="text-xl text-purple-600 font-medium max-w-4xl mx-auto">
            {services?.subtitle || ''}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(services?.items || []).map((service, index) => {
            const IconComponent = iconMap[(service?.icon as keyof typeof iconMap) || 'Camera'] || Camera;
            
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service?.image || ''}
                    alt={service?.title || ''}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-purple-50 transition-colors duration-300">
                      {IconComponent && <IconComponent className="w-6 h-6 text-purple-600" />}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {service?.title || ''}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service?.description || ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;