import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Appointment: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    department: '',
    doctor: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // External PHP endpoint that processes appointment emails
  const APPOINTMENT_ENDPOINT = 'https://madit-agency.com/src/milouz.php';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(APPOINTMENT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        mode: 'cors'
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        throw new Error(data?.error || 'Une erreur est survenue lors de l\'envoi.');
      }

      setSubmitMessage(data?.success || 'Votre demande de rendez-vous a été envoyée avec succès!');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', department: '', doctor: '', message: '' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { content } = useContent();
  const departments = (content?.services?.items || []).map(service => service.title);
  const doctors = (content?.doctors?.members || []).map(doctor => doctor.name);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {content?.appointment?.title || 'Prendre un Rendez-vous'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content?.appointment?.subtitle || ''}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-8 border border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  {content?.appointment?.form?.fields?.name || 'Nom'} *
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
                  <Mail className="w-4 h-4 inline mr-2" />
                  {content?.appointment?.form?.fields?.email || 'Email'} *
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
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                {content?.appointment?.form?.fields?.phone || 'Téléphone'} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  {content?.appointment?.form?.fields?.date || 'Date'} *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {content?.appointment?.form?.fields?.time || 'Heure'} *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  {content?.appointment?.form?.fields?.department || 'Service'} *
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">{content?.appointment?.form?.fields?.department || 'Service'}</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
                  {content?.appointment?.form?.fields?.doctor || 'Médecin'} *
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  required
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">{content?.appointment?.form?.fields?.doctor || 'Médecin'}</option>
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                {content?.appointment?.form?.fields?.message || 'Message'}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              ></textarea>
            </div>

            {submitMessage && (
              <div className="rounded-md bg-green-50 p-4 text-green-700">{submitMessage}</div>
            )}
            {submitError && (
              <div className="rounded-md bg-red-50 p-4 text-red-700">{submitError}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center font-semibold shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 hover:shadow-xl transform hover:-translate-y-1'}`}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Envoi...' : (content?.appointment?.form?.submitText || 'Envoyer')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;