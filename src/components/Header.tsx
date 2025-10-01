import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import content from '../data/content.json';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
      {/* Top Contact Bar */}
      <div className="bg-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{content.contact.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                {content.contact.phones.map((phone, index) => (
                  <div key={index} className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={content.navigation.logo} 
              alt={content.site.title}
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {content.navigation.menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 font-medium text-sm tracking-wide transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center text-sm font-medium shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4 mr-2" />
              {content.navigation.ctaButton}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {content.navigation.menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 font-medium text-sm tracking-wide px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 flex items-center justify-center mt-4 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2" />
                {content.navigation.ctaButton}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;