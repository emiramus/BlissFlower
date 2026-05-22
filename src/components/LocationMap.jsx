import React from 'react';
import './LocationMap.css';

function LocationMap() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.123456789!2d21.4280!3d41.9973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415a0b5f2d8b7%3A0x9c9e8b5f2d8b7e5!2s8%20Mars%20Boulevard%2C%20Skopje%2C%20North%20Macedonia!5e0!3m2!1sen!2smk!4v1700000000000!5m2!1sen!2smk";

  return (
    <div className="map-wrapper">
      <iframe
        title="BlissFlower Location Map"
        src={mapUrl}
        width="100%"
        height="320"
        style={{ border: 0, borderRadius: '20px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default LocationMap;