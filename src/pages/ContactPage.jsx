import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { COMPANY_DETAILS } from '../data/constants';

const FORM_ENDPOINT = '/api/contact';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [formValues, setFormValues] = useState({ name: '', phone: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      setStatus('success');
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={`Contact Engineering Desk | ${COMPANY_DETAILS.shortName}`}
        description={`Contact ${COMPANY_DETAILS.name} at ${COMPANY_DETAILS.address}. Call ${COMPANY_DETAILS.phone} for heating, plumbing, and AC quotes across Basildon and South Essex.`}
      />

      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono font-bold text-copper uppercase tracking-widest block">CONTACT US</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-paper">
          Speak to Our Basildon Engineering Desk
        </h1>
        <p className="text-base text-paper-muted leading-relaxed">
          Have a question about a boiler replacement, CP12 inspection, or air conditioning installation? Reach out directly to our Basildon headquarters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Contact Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-obsidian-border space-y-5">
            <h3 className="text-lg font-bold text-paper font-mono text-copper">Head Office Details</h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <div>
                  <span className="text-paper font-bold block">{COMPANY_DETAILS.name}</span>
                  <span className="text-paper-muted">{COMPANY_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-copper shrink-0" />
                <div>
                  <span className="text-paper font-bold block">Local Dispatch Desk</span>
                  <a href={COMPANY_DETAILS.phoneHref} className="text-copper hover:underline font-bold">{COMPANY_DETAILS.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal shrink-0" />
                <div>
                  <span className="text-paper font-bold block">General Inquiries</span>
                  <a href={COMPANY_DETAILS.emailHref} className="text-paper-subtle hover:underline">{COMPANY_DETAILS.email}</a>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-dark border border-obsidian-border text-[11px] font-mono text-paper-muted space-y-1">
              <div>Companies House Reg: {COMPANY_DETAILS.regNumber}</div>
              <div>SIC Code: {COMPANY_DETAILS.sicCode}</div>
              <div>Director: {COMPANY_DETAILS.director}</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-obsidian-border">
            {status === 'success' ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal/20 border border-teal text-teal flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-paper">Message Sent!</h4>
                <p className="text-xs text-paper-muted">Thank you. Our Basildon dispatch desk will respond within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-paper font-mono">Send Us a Message</h3>

                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-danger/10 border border-danger/40 text-xs text-danger flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Something went wrong sending your message. Please call us directly at {COMPANY_DETAILS.phone} or try again.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-paper-subtle mb-1">Your Name *</label>
                    <input id="contact-name" name="name" type="text" required placeholder="John Smith" value={formValues.name} onChange={handleChange} className="w-full bg-obsidian-dark border border-obsidian-border rounded-lg px-3 py-2.5 text-xs text-paper focus:border-copper focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-paper-subtle mb-1">Phone Number *</label>
                    <input id="contact-phone" name="phone" type="tel" required placeholder="07123 456789" value={formValues.phone} onChange={handleChange} className="w-full bg-obsidian-dark border border-obsidian-border rounded-lg px-3 py-2.5 text-xs text-paper focus:border-copper focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-paper-subtle mb-1">Email Address *</label>
                  <input id="contact-email" name="email" type="email" required placeholder="john@example.co.uk" value={formValues.email} onChange={handleChange} className="w-full bg-obsidian-dark border border-obsidian-border rounded-lg px-3 py-2.5 text-xs text-paper focus:border-copper focus:outline-none" />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-paper-subtle mb-1">How can we help? *</label>
                  <textarea id="contact-message" name="message" rows="4" required placeholder="Details of your plumbing, heating, or AC requirements..." value={formValues.message} onChange={handleChange} className="w-full bg-obsidian-dark border border-obsidian-border rounded-lg px-3 py-2.5 text-xs text-paper focus:border-copper focus:outline-none"></textarea>
                </div>

                <button type="submit" disabled={status === 'submitting'} className="w-full btn-primary justify-center text-xs py-3 font-bold disabled:opacity-60">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
