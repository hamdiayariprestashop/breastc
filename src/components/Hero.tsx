import React from 'react';
import { ArrowRight, Calendar, Shield, Award, Users } from 'lucide-react';
import content from '../data/content.json';

const Hero: React.FC = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-pink-600/70"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300/10 rounded-full blur-lg animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-md animate-bounce delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Logo and Title */}
          <div className="flex flex-col items-center space-y-6 animate-fade-in-up">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg"></div>
              <img 
                src={content.navigation.logo} 
                alt={content.site.title}
                className="relative h-32 w-auto drop-shadow-2xl"
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-4xl mx-auto">
                {content.hero.subtitle}
              </p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in-up delay-400">
            <a
              href="#contact"
              className="group bg-gradient-to-r from-pink-500 to-pink-600 text-white px-10 py-5 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center font-semibold text-lg shadow-2xl hover:shadow-pink-500/30 transform hover:-translate-y-2 hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Prendre Rendez-vous
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </a>
            <a
              href="#infos"
              className="group border-2 border-white/80 text-white px-10 py-5 rounded-full hover:bg-white hover:text-purple-900 transition-all duration-300 flex items-center justify-center font-semibold text-lg backdrop-blur-sm hover:backdrop-blur-none transform hover:-translate-y-2 hover:scale-105"
            >
              En savoir plus
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-white/60 text-xs font-medium tracking-wider">DÉCOUVRIR</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </section>
  );
};

export default Hero;