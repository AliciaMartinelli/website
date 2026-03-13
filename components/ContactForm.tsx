'use client';
import { useState } from 'react';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Hier würde normalerweise die API-Anfrage stehen
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuliert API-Call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-am-ink mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-am-ink placeholder-am-ink/60 focus:outline-none focus:ring-2 focus:ring-am-periwinkle/50 focus:border-transparent"
            placeholder="Dein Name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-am-ink mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-am-ink placeholder-am-ink/60 focus:outline-none focus:ring-2 focus:ring-am-periwinkle/50 focus:border-transparent"
            placeholder="deine@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-am-ink mb-2">
            Betreff *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-am-ink focus:outline-none focus:ring-2 focus:ring-am-periwinkle/50 focus:border-transparent"
          >
            <option value="">Wähle ein Thema</option>
            <option value="speaking">Speaking / Vortrag</option>
            <option value="collaboration">Zusammenarbeit</option>
            <option value="ai-stammtisch">AI-Stammtisch</option>
            <option value="open-source">Open Source</option>
            <option value="other">Sonstiges</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-am-ink mb-2">
            Nachricht *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-am-ink placeholder-am-ink/60 focus:outline-none focus:ring-2 focus:ring-am-periwinkle/50 focus:border-transparent resize-none"
            placeholder="Erzähl mir, womit ich dir helfen kann..."
          />
        </div>
        
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-xl text-green-800">
            Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-800">
            Es gab einen Fehler beim Senden. Bitte versuche es erneut.
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full glass-button px-6 py-3 rounded-pill text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
        </button>
      </form>
    </div>
  );
}
