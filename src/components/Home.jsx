import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Flower2,
  Cookie,
  Wine,
  Gift,
  HeartHandshake,
  Star,
  Truck,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';

import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'BlissFlower',
      subtitle: 'Luxury Gifts & Elegant Bouquets',
      description: 'Discover curated collections of fresh flowers, premium chocolates, fine wines, and exquisite gift sets for every special moment.',
      image: '/images/flowers.jpg',
      tag: 'SINCE 2020'
    }
  ];

  const collections = [
    {
      title: 'Luxury Bouquets',
      icon: <Flower2 size={28} />,
      image: '/images/Bouquets.jpeg',
      filter: 'flowers',
      color: '#ff8fab'
    },
    {
      title: 'Premium Chocolates',
      icon: <Cookie size={28} />,
      image: '/images/Chocolates.jpeg',
      filter: 'chocolates',
      color: '#c4a27a'
    },
    {
      title: 'Fine Wines',
      icon: <Wine size={28} />,
      image: '/images/wines.jpeg',
      filter: 'wines',
      color: '#9b2e2e'
    },
    {
      title: 'Luxury Gift Sets',
      icon: <Gift size={28} />,
      image: '/images/sets.jpeg',
      filter: 'giftsets',
      color: '#d4af37'
    }
  ];

  const features = [
    { icon: <Truck size={24} />, title: 'Same-Day Delivery', desc: 'Order before 2 PM' },
    { icon: <Clock size={24} />, title: 'Freshness Guaranteed', desc: 'Always premium quality' },
    { icon: <Award size={24} />, title: 'Luxury Packaging', desc: 'Elegant gift wrapping' },
    { icon: <HeartHandshake size={24} />, title: '24/7 Support', desc: 'We\'re here for you' }
  ];

  const featuredProducts = [
    { name: 'Romantic Rose Mix', price: 2999, image: '/images/Romantic Rose Mix.jpeg', category: 'flowers', emoji: '🌹' },
    { name: 'Belgian Chocolate Box', price: 899, image: '/images/Belgian Chocolate Box.webp', category: 'chocolates', emoji: '🍫' },
    { name: 'Luxury Love Set', price: 5999, image: '/images/Luxury Love Set.png', category: 'giftsets', emoji: '💖' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="home">
      <section className="hero">
        <div 
          className="hero-bg" 
          style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">{heroSlides[currentSlide].tag}</span>
          <h1>{heroSlides[currentSlide].title}</h1>
          <h2>{heroSlides[currentSlide].subtitle}</h2>
          <p>{heroSlides[currentSlide].description}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Shop Now <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/create-bouquet')}>
              Create Your Bouquet
            </button>
          </div>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="luxury-strip">
        {features.map((feature, index) => (
          <div key={index} className="luxury-item">
            <span className="luxury-icon">{feature.icon}</span>
            <div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="collections">
        <div className="section-header">
          <span className="section-tag">OUR COLLECTIONS</span>
          <h2>Luxury Gifting Experience</h2>
          <p>Discover our carefully curated collections for every occasion</p>
        </div>
        <div className="collections-grid">
          {collections.map((item, index) => (
            <div 
              key={index} 
              className="collection-card"
              onClick={() => navigate('/products', { state: { filter: item.filter } })}
              style={{ '--card-color': item.color }}
            >
              <img src={item.image} alt={item.title} />
              <div className="collection-overlay">
                <div className="collection-icon" style={{ backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <button className="collection-btn">
                  Discover <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-products">
        <div className="section-header">
          <span className="section-tag">BEST SELLERS</span>
          <h2>Signature Luxury Collection</h2>
          <p>Our most loved gifts, chosen by thousands of happy customers</p>
        </div>
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <div key={index} className="featured-card">
              <div className="featured-image">
                <img src={product.image} alt={product.name} />
                <span className="featured-emoji">{product.emoji}</span>
              </div>
              <div className="featured-info">
                <h3>{product.name}</h3>
                <p>Starting from</p>
                <div className="featured-bottom">
                  <span className="featured-price">{product.price} ден</span>
                  <button 
                    className="featured-btn"
                    onClick={() => navigate('/products', { state: { filter: product.category } })}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experience">
        <div className="experience-left">
          <span className="section-tag">WHY BLISSFLOWER</span>
          <h2>More Than A Gift.<br />A Luxury Experience.</h2>
          <p>Every bouquet, chocolate box, wine bottle, and luxury set is carefully curated to create unforgettable memories for the people you love.</p>
          <div className="experience-stats">
            <div className="stat">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Fresh Guarantee</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
          <button className="btn-primary" onClick={() => navigate('/products')}>
            Shop Luxury Gifts <ArrowRight size={18} />
          </button>
        </div>
        <div className="experience-right">
          <div className="experience-card">
            <HeartHandshake size={32} className="card-icon" />
            <h4>Handcrafted Elegance</h4>
            <p>Each arrangement is uniquely designed by our master florists</p>
          </div>
          <div className="experience-card">
            <Gift size={32} className="card-icon" />
            <h4>Luxury Packaging</h4>
            <p>Elegant gift wrapping with personalized messages</p>
          </div>
          <div className="experience-card">
            <Star size={32} className="card-icon" />
            <h4>Premium Quality</h4>
            <p>Only the finest ingredients and freshest flowers</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <span className="section-tag">KIND WORDS</span>
          <h2>What Our Clients Say</h2>
          <p>Join thousands of satisfied customers who trust BlissFlower</p>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p>"Absolutely beautiful flowers and amazing packaging. The perfect luxury gift for my wife. Will definitely order again!"</p>
            <h4>— Elena K.</h4>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p>"The chocolates and wine set looked premium and elegant. The delivery was on time and the presentation was stunning. Highly recommended."</p>
            <h4>— Martin D.</h4>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p>"Best flower and luxury gift shop in Skopje! I've ordered multiple times and the quality is always exceptional."</p>
            <h4>— Sara P.</h4>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter-content">
          <Sparkles size={32} className="newsletter-icon" />
          <span>PRIVATE ACCESS</span>
          <h2>Join The BlissFlower Circle</h2>
          <p>Receive exclusive offers, seasonal collections, and luxury gifting inspiration.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
          <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🌸 BlissFlower</span>
            <p>Luxury gifts for every special moment. Fresh flowers, premium chocolates, and fine wines delivered with care.</p>
            <div className="footer-social">
              <span>📷</span>
              <span>📘</span>
              <span>📧</span>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <button 
                  onClick={() => navigate('/products')} 
                  className="footer-link-btn"
                >
                  Shop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="footer-link-btn"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/create-bouquet')} 
                  className="footer-link-btn"
                >
                  Create Bouquet
                </button>
              </li>
            </ul>
          </div>
          
          <div className="footer-hours">
            <h4>Store Hours</h4>
            <p>Monday - Sunday: 9AM - 9PM</p>
            <p>Delivery: Same-day before 2PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 BlissFlower. All rights reserved. Luxury gifts for every occasion.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;