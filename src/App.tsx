import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ContentEditor from './pages/admin/ContentEditor';
import { trackPageView } from './services/analytics';

// Main App Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Departments from './components/Departments';
import Doctors from './components/Doctors';
import FAQ from './components/FAQ';
import ScientificArticles from './components/ScientificArticles';
import MediaSection from './components/MediaSection';
import Gallery from './components/Gallery';
import Appointment from './components/Appointment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet-async';

const MainApp = () => {
  const { content } = useContent();
  
  // Track page view when component mounts
  React.useEffect(() => {
    trackPageView('/home');
  }, []);
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Dr Belkhiria Zeineb | Radiologue Cité El Khadra Tunis | Centre d'Imagerie Médicale BIC</title>
        <meta
          name="description"
          content="Centre d'Imagerie Médicale à Cité El Khadra, Tunis: Dr Belkhiria Zeineb – Radiologue. Mammographie 3D, Angio‑Mammographie, Échographie, Scanner, IRM. Prise de rendez‑vous rapide."
        />
        <meta
          name="keywords"
          content="Dr Belkhiria ZEINEB Radiologue Cite El Khadra Tunis, radiologie Tunis, imagerie médicale Tunis, mammographie 3D Tunis, échographie Tunis, scanner Tunis, IRM Tunis, sénologie Tunis, centre d'imagerie Cité El Khadra"
        />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Centre d'Imagerie – Dr Belkhiria Zeineb | Radiologue à Tunis" />
        <meta property="og:description" content="Imagerie médicale avancée à Cité El Khadra, Tunis: mammographie 3D, échographie, scanner, IRM." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalClinic',
          name: 'Centre de Radiologie El Hakim – BIC',
          url: '/',
          image: '/your-logo.webp',
          telephone: '+21653008108',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Centre Médical El Hakim, Voie X2 - Cité El Khadra',
            addressLocality: 'Tunis',
            postalCode: '1003',
            addressCountry: 'TN'
          },
          medicalSpecialty: 'Radiology',
          areaServed: 'Tunisia',
          sameAs: []
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Physician',
          name: 'Dr Belkhiria Zeineb',
          jobTitle: 'Radiologue',
          worksFor: {
            '@type': 'MedicalClinic',
            name: 'Centre de Radiologie El Hakim – BIC'
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Centre Médical El Hakim, Voie X2 - Cité El Khadra',
            addressLocality: 'Tunis',
            postalCode: '1003',
            addressCountry: 'TN'
          },
          medicalSpecialty: 'Radiology'
        })}</script>
      </Helmet>
      <Header />
      <Hero />
      <About />
      <Services />
      <Departments />
      <Doctors />
      <MediaSection mediaItems={content.media || []} />
      <FAQ />
      <ScientificArticles articles={content.articles || []} />
      <Gallery />
      <Appointment />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainApp />} />
          
          {/* Auth Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentEditor />} />
            <Route path="articles" element={<ContentEditor />} />
            {/* Add more admin routes here as needed */}
          </Route>
          
          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ContentProvider>
  );
}

export default App;