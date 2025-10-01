import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import content from '../data/content.json';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    alert('Merci pour votre inscription!');
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={content?.navigation?.logo || ''} 
                alt={content?.site?.title || ''}
                className="h-12 w-auto mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">{content?.footer?.companyInfo?.name || ''}</h3>
                <p className="text-pink-300 text-sm">{content?.footer?.companyInfo?.fullName || ''}</p>
              </div>
            </div>
            
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>{content?.footer?.companyInfo?.address?.line1 || ''}</p>
                  <p>{content?.footer?.companyInfo?.address?.line2 || ''}</p>
                  <p>{content?.footer?.companyInfo?.address?.line3 || ''}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{content?.footer?.companyInfo?.phone || ''}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{content?.footer?.companyInfo?.email || ''}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-300">Navigation</h4>
            <ul className="space-y-3">
              {(content?.navigation?.menuItems || []).map((item, index) => (
                <li key={index}>
                  <a
                    href={item?.href || '#'}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item?.label || ''}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-300">
              {content?.footer?.blog?.title || 'Restez informé(e)'}
            </h4>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {content?.footer?.blog?.description || ''}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content?.footer?.blog?.placeholder || 'Votre adresse email'}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-r-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {content?.footer?.socialLinks?.facebook && content.footer.socialLinks.facebook !== "#" && (
                <a
                  href={content?.footer?.socialLinks?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
              )}
              {content?.footer?.socialLinks?.linkedin && content.footer.socialLinks.linkedin !== "#" && (
                <a
                  href={content?.footer?.socialLinks?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
              )}
              {content?.footer?.socialLinks?.instagram && content.footer.socialLinks.instagram !== "#" && (
                <a
                  href={content?.footer?.socialLinks?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
              )}
              {content?.footer?.socialLinks?.twitter && content.footer.socialLinks.twitter !== "#" && (
                <a
                  href={content?.footer?.socialLinks?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
              )}
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {content?.footer?.copyright || ''}
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            {content?.footer?.credits || ''}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;