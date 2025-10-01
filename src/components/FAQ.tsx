import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import content from '../data/content.json';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {content?.faq?.title || 'Questions Fréquentes'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content?.faq?.subtitle || ''}
          </p>
        </div>

        <div className="space-y-4">
          {(content?.faq?.questions || []).map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item?.question || ''}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {item?.answer || ''}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;