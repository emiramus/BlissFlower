import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactMethods = [
    { icon: '📍', title: 'Visit Us', details: ['8 Mars Boulevard, No. 15', 'Skopje, 1000, North Macedonia'], action: 'https://www.google.com/maps/dir/?api=1&destination=8+Mars+Boulevard+Skopje', actionText: 'Get Directions →' },
    { icon: '📞', title: 'Call Us', details: ['+389 70 123 456', 'Mon-Sun: 9AM - 9PM'], action: 'tel:+38970123456', actionText: 'Call Now →' },
    { icon: '✉️', title: 'Email Us', details: ['writeus@blissflower.com', 'We reply within 2 hours'], action: 'mailto:writeus@blissflower.com', actionText: 'Send Email →' },
    { icon: '💬', title: 'Live Chat', details: ['Available 24/7', 'Instant responses'], action: '#', actionText: 'Start Chat →' }
  ];

  const faqs = [
    { q: 'How long does delivery take?', a: 'Same-day delivery for orders placed before 2 PM. Next-day delivery for all other orders.' },
    { q: 'Do you offer international shipping?', a: 'Currently we deliver only within North Macedonia. We plan to expand soon!' },
    { q: 'Can I add a personal message?', a: 'Yes! Every order includes a free gift message card. Just write your message at checkout.' },
    { q: 'What is your return policy?', a: 'We accept returns within 7 days. Contact us for assistance.' }
  ];

  return (
    <div className="contact-new">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div className="contact-methods">
        {contactMethods.map((method, idx) => (
          <a key={idx} href={method.action} target={method.action.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="method-card">
            <div className="method-icon">{method.icon}</div>
            <h3>{method.title}</h3>
            {method.details.map((detail, i) => <p key={i}>{detail}</p>)}
            <span className="method-link">{method.actionText}</span>
          </a>
        ))}
      </div>

      <div className="contact-faq">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions</p>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-card">
              <h3>❓ {faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form and we'll get back to you shortly</p>
          </div>
          {submitted && <div className="success-message">✅ Message sent successfully! We'll contact you soon.</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="input-group">
                <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <input type="tel" name="phone" placeholder="Phone number (optional)" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="input-group">
                <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
              </div>
            </div>
            <div className="input-group">
              <textarea name="message" rows="5" placeholder="Your message..." value={formData.message} onChange={handleChange}></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <div className="map-header">
          <h2>Find Us Here</h2>
          <p>8 Mars Boulevard, Skopje, North Macedonia</p>
        </div>
        <div className="map-wrapper">
          <iframe
            title="BlissFlower Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.123456789!2d21.4280!3d41.9973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415a0b5f2d8b7%3A0x9c9e8b5f2d8b7e5!2s8%20Mars%20Boulevard%2C%20Skopje%2C%20North%20Macedonia!5e0!3m2!1sen!2smk!4v1700000000000!5m2!1sen!2smk"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;