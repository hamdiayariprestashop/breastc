import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { trackContactForm } from '../services/analytics';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://madit-agency.com/src/milou.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `${formData.subject}\n\n${formData.message}`
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Track contact form submission
        trackContactForm(formData.name, formData.email);
        
        setSubmitStatus({
          type: 'success',
          message: data.success || 'Votre message a été envoyé avec succès!',
        });
        // Reset form on successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { content } = useContent();

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {content?.contactInfo?.title || 'Contactez-nous'}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content?.contactInfo?.subtitle || ''}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-5 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <MapPin className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {content?.contactInfo?.address?.title || 'Adresse'}
                  </h3>
                  <div className="text-gray-600">
                    <p>{content?.contactInfo?.address?.line1 || ''}</p>
                    <p>{content?.contactInfo?.address?.line2 || ''}</p>
                    <p>{content?.contactInfo?.address?.line3 || ''}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-5 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <Mail className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {content?.contactInfo?.email?.title || 'Email'}
                  </h3>
                  <p className="text-gray-600">{content?.contactInfo?.email?.value || ''}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-5 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <Phone className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {content?.contactInfo?.phone?.title || 'Téléphone'}
                  </h3>
                  <p className="text-gray-600">{content?.contactInfo?.phone?.value || ''}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-10 h-64 rounded-2xl overflow-hidden shadow-lg border border-purple-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.8234567890123!2d10.194301!3d36.825689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ5JzMyLjUiTiAxMMKwMTEnMzkuNSJF!5e0!3m2!1sfr!2stn!4v1234567890123!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Breast Imaging Center Tunis Location"
              ></iframe>
              </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {content?.contactInfo?.form?.fields?.name || 'Nom'} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {content?.contactInfo?.form?.fields?.email || 'Email'} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {content?.contactInfo?.form?.fields?.subject || 'Sujet'} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {content?.contactInfo?.form?.fields?.message || 'Message'} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg flex items-start ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;