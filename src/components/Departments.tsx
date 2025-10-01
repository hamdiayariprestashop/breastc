import React, { useState } from 'react';
import { Camera, Monitor, Target, Scan, Search, UserCheck } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Departments: React.FC = () => {
  const { content } = useContent();
  const departments = content?.departments?.items || [];
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Camera,
    Monitor,
    Target,
    Scan,
    Search,
    UserCheck,
  } as unknown as Record<string, React.ComponentType<{ className?: string }>>;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <section id="departements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {content?.departments?.title || 'Nos Départements'}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content?.departments?.subtitle || ''}
          </p>
        </div>

        {/* Department Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {(departments || []).map((dept: { title?: string; icon?: string; description?: string; image?: string }, index: number) => {
            const IconComponent = (dept?.icon && iconMap[dept.icon]) || UserCheck;
            
            return (
              <div
                key={index}
                className={`group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 transition-all duration-300 border ${selectedIndex === index ? 'border-purple-300 ring-2 ring-purple-200' : 'border-purple-100 hover:border-purple-200 hover:from-purple-100 hover:to-pink-100'}`}
                onClick={() => setSelectedIndex(index)}
                role="button"
                tabIndex={0}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {dept?.title || ''}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Featured Department (selected) */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {(departments[selectedIndex]?.title) || content?.departments?.featured?.title || ''}
              </h3>
              <p className="text-lg leading-relaxed text-purple-100">
                {departments[selectedIndex]?.description || content?.departments?.featured?.description || ''}
              </p>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={departments[selectedIndex]?.image || content?.departments?.featured?.image || ''}
                  alt={(departments[selectedIndex]?.title) || content?.departments?.featured?.title || ''}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;