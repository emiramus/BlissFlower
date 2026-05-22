import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBouquet.css';

function CreateBouquet({ isLoggedIn, cart, addToCart }) {
  const navigate = useNavigate();

  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [bouquetName, setBouquetName] = useState('');
  const [savedBouquets, setSavedBouquets] = useState([]);
  const [message, setMessage] = useState('');
  const [showCheckoutNow, setShowCheckoutNow] = useState(false);
  const [lastCreatedBouquet, setLastCreatedBouquet] = useState(null);

  const [personalization, setPersonalization] = useState({
    giftMessage: '',
    recipientName: '',
    senderName: '',
    wrapColor: 'pink',
    ribbonColor: 'gold',
    size: 'medium',
    sticker: '💝'
  });

  const availableFlowers = [
    { id: 1, name: 'Pink Rose', image: '/images/Pink Rose.png', price: 299, emoji: '🌹' },
    { id: 2, name: 'Red Rose', image: '/images/Red Rose.jpeg', price: 299, emoji: '❤️' },
    { id: 3, name: 'White Lily', image: '/images/Lily.jpeg', price: 399, emoji: '🌺' },
    { id: 4, name: 'Peony', image: '/images/Peony.jpeg', price: 399, emoji: '🌸' },
    { id: 5, name: 'Sunflower', image: '/images/Sunflower.jpeg', price: 249, emoji: '🌻' },
    { id: 6, name: 'Orchid', image: '/images/Orchid.jpeg', price: 499, emoji: '🪷' },
    { id: 7, name: 'Tulip', image: '/images/Tulip.jpeg', price: 199, emoji: '🌷' },
    { id: 8, name: 'Lavender', image: '/images/Lavender.jpeg', price: 299, emoji: '💜' },
    { id: 9, name: 'Catalea', image: '/images/Catalea.jpeg', price: 299, emoji: '💜' }
  ];

  const wrapColors = [
    { value: 'pink', code: '#ffc1d6', name: 'Rose Petal' },
    { value: 'white', code: '#ffffff', name: 'Pearl White' },
    { value: 'gold', code: '#f7d794', name: 'Champagne' },
    { value: 'lavender', code: '#d4c4e8', name: 'Lavender' }
  ];

  const ribbonColors = [
    { value: 'gold', code: '#f7d794', name: 'Gold' },
    { value: 'pink', code: '#ff6b9a', name: 'Blush' },
    { value: 'white', code: '#ffffff', name: 'Pearl' }
  ];

  const stickers = ['💝', '🌸', '💐', '✨', '❤️', '🌹', '🎀'];

  const getStorageKey = useCallback(() => {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail ? `userBouquets_${userEmail}` : 'userBouquets_temp';
  }, []);

  const loadSavedBouquets = useCallback(() => {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) setSavedBouquets(JSON.parse(saved));
    else setSavedBouquets([]);
  }, [getStorageKey]);

  useEffect(() => {
    if (!isLoggedIn) {
      setMessage('⚠️ Please login to save your bouquets permanently!');
      setTimeout(() => setMessage(''), 3000);
    }
    loadSavedBouquets();
  }, [isLoggedIn, loadSavedBouquets]);

  const addFlower = (flower) => {
    if (selectedFlowers.length < 12) {
      setSelectedFlowers([...selectedFlowers, flower]);
      setMessage(`✨ ${flower.name} added to your bouquet`);
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('Maximum 12 flowers per bouquet');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const removeFlower = (index) => {
    const copy = [...selectedFlowers];
    const removed = copy.splice(index, 1);
    setSelectedFlowers(copy);
    setMessage(`Removed ${removed[0].name}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const getTotal = () => {
    const flowersTotal = selectedFlowers.reduce((sum, f) => sum + f.price, 0);
    const sizeExtra = personalization.size === 'large' ? 400 : personalization.size === 'medium' ? 200 : 0;
    return flowersTotal + sizeExtra;
  };

  const clearBouquet = () => {
    setSelectedFlowers([]);
    setBouquetName('');
    setPersonalization({
      giftMessage: '',
      recipientName: '',
      senderName: '',
      wrapColor: 'pink',
      ribbonColor: 'gold',
      size: 'medium',
      sticker: '💝'
    });
    setShowCheckoutNow(false);
    setLastCreatedBouquet(null);
    setMessage('Bouquet cleared');
    setTimeout(() => setMessage(''), 2000);
  };

  const createProductFromBouquet = (name, total, flowers, person) => {
    return {
      id: `custom_${Date.now()}`,
      name: name,
      price: total,
      image: null,
      emoji: person.sticker || '🌸',
      description: `Custom bouquet with ${flowers.length} flowers • ${person.size} size • ${person.wrapColor} wrap`,
      category: 'custom',
      isCustomBouquet: true,
      bouquetDetails: {
        flowers: flowers.map(f => ({ name: f.name, price: f.price, image: f.image })),
        giftMessage: person.giftMessage,
        recipientName: person.recipientName,
        senderName: person.senderName,
        wrapColor: person.wrapColor,
        ribbonColor: person.ribbonColor,
        size: person.size,
        sticker: person.sticker
      }
    };
  };

  const saveBouquet = () => {
    if (!bouquetName || selectedFlowers.length === 0) {
      setMessage('Name your bouquet first');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (!isLoggedIn) {
      setMessage('⚠️ Please login to save your bouquet permanently!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const total = getTotal();
    const bouquetProduct = createProductFromBouquet(bouquetName, total, selectedFlowers, personalization);

    const newBouquet = {
      id: Date.now(),
      name: bouquetName,
      flowers: selectedFlowers,
      totalPrice: total,
      personalization,
      date: new Date().toLocaleDateString(),
      productId: bouquetProduct.id
    };

    const storageKey = getStorageKey();
    const existing = localStorage.getItem(storageKey);
    const savedBouquetsList = existing ? JSON.parse(existing) : [];
    const updated = [newBouquet, ...savedBouquetsList];
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setSavedBouquets(updated);
    
    setLastCreatedBouquet(bouquetProduct);
    setShowCheckoutNow(true);
    
    setMessage(`✨ "${bouquetName}" saved! ✨`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleGoToCheckout = () => {
    if (lastCreatedBouquet) {
      addToCart(lastCreatedBouquet, 1);
      if (isLoggedIn) {
        navigate('/checkout');
      } else {
        navigate('/login');
      }
    }
  };

  const editBouquet = (bouquet) => {
    setSelectedFlowers(bouquet.flowers);
    setBouquetName(bouquet.name);
    setPersonalization(bouquet.personalization);
    setShowCheckoutNow(false);
    setLastCreatedBouquet(null);
    setMessage(`Editing "${bouquet.name}"`);
    setTimeout(() => setMessage(''), 2000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteBouquet = (id) => {
    const storageKey = getStorageKey();
    const updated = savedBouquets.filter(b => b.id !== id);
    setSavedBouquets(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setMessage('Bouquet deleted');
    setTimeout(() => setMessage(''), 2000);
  };

  const selectedWrap = wrapColors.find(w => w.value === personalization.wrapColor);
  const selectedRibbon = ribbonColors.find(r => r.value === personalization.ribbonColor);

  return (
    <div className="create-bouquet-single">
      
      {message && <div className="toast-message">{message}</div>}

      <div className="single-header">
        <h1>🌸 Create Your Bouquet</h1>
        <p>Choose individual flowers and arrange them into your perfect bouquet</p>
        {!isLoggedIn && (
          <p style={{ color: '#ff6b8b', fontSize: '0.8rem', marginTop: '10px' }}>
            ⚠️ Login to save your bouquets permanently!
          </p>
        )}
      </div>

      <div className="single-layout">
        
        <div className="bouquet-preview-side">
          <div className="preview-title">
            <span>💐 Your Creation</span>
            <h3>{bouquetName || 'Name your bouquet'}</h3>
          </div>

          <div className="preview-canvas" style={{ background: selectedWrap?.code || '#ffc1d6' }}>
            <div className="canvas-ribbon" style={{ background: selectedRibbon?.code || '#f7d794' }}></div>
            <div className="canvas-flowers">
              {selectedFlowers.length === 0 ? (
                <div className="empty-canvas">
                  <span>🌸</span>
                  <p>Click on flowers to add them</p>
                </div>
              ) : (
                selectedFlowers.map((flower, idx) => (
                  <div key={idx} className="canvas-flower" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <img src={flower.image} alt={flower.name} className="canvas-flower-img" />
                  </div>
                ))
              )}
            </div>
            <div className="canvas-sticker">{personalization.sticker}</div>
            <div className="canvas-size">
              {personalization.size === 'small' ? 'Small' : personalization.size === 'medium' ? 'Medium' : 'Large'}
            </div>
          </div>

          <div className="preview-details">
            <div className="preview-price">
              <span>{selectedFlowers.length} flowers</span>
              <strong>{getTotal()} den</strong>
            </div>
            <div className="preview-message">
              {personalization.giftMessage && (
                <p>💌 "{personalization.giftMessage.substring(0, 50)}..."</p>
              )}
              {personalization.recipientName && <span>For: {personalization.recipientName}</span>}
              {personalization.senderName && <span>From: {personalization.senderName}</span>}
            </div>
          </div>

          <div className="preview-actions">
            <input 
              type="text" 
              className="name-input"
              placeholder="Name your bouquet..."
              value={bouquetName}
              onChange={(e) => setBouquetName(e.target.value)}
            />
            <div className="action-buttons">
              <button className="btn-clear" onClick={clearBouquet}>Clear</button>
              <button className="btn-save" onClick={saveBouquet}>Save Bouquet →</button>
            </div>
            
            {showCheckoutNow && lastCreatedBouquet && (
              <div className="cart-actions" style={{ marginTop: '12px' }}>
                <button 
                  className="btn-checkout-now" 
                  onClick={handleGoToCheckout}
                >
                  💳 Checkout Now ({lastCreatedBouquet.price} den)
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="controls-side">
          
          <div className="control-section">
            <div className="section-title">
              <span>🌸</span>
              <h3>Choose Flowers</h3>
              <span className="count">{selectedFlowers.length}/12</span>
            </div>
            <div className="flowers-grid">
              {availableFlowers.map(flower => (
                <div key={flower.id} className="flower-item" onClick={() => addFlower(flower)}>
                  <div className="flower-item-img">
                    <img src={flower.image} alt={flower.name} />
                    <div className="flower-overlay">+</div>
                  </div>
                  <div className="flower-item-info">
                    <span className="flower-name">{flower.name}</span>
                    <span className="flower-price">{flower.price} den</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedFlowers.length > 0 && (
            <div className="control-section">
              <div className="section-title">
                <span>💐</span>
                <h3>Your Bouquet</h3>
              </div>
              <div className="selected-flowers-list">
                {selectedFlowers.map((flower, idx) => (
                  <div key={idx} className="selected-item" onClick={() => removeFlower(idx)}>
                    <img src={flower.image} alt="" className="selected-img" />
                    <span className="selected-name">{flower.name}</span>
                    <span className="selected-price">{flower.price} den</span>
                    <button className="remove-x">✖</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="control-section">
            <div className="section-title">
              <span>✨</span>
              <h3>Personalize</h3>
            </div>

            <div className="personalization-grid">
              <div className="personal-item">
                <label>💌 Gift Message</label>
                <textarea 
                  rows="2"
                  placeholder="Write a special message..."
                  value={personalization.giftMessage}
                  onChange={(e) => setPersonalization({...personalization, giftMessage: e.target.value})}
                />
              </div>

              <div className="personal-row">
                <div className="personal-item">
                  <label>🌸 For</label>
                  <input 
                    type="text"
                    placeholder="Recipient"
                    value={personalization.recipientName}
                    onChange={(e) => setPersonalization({...personalization, recipientName: e.target.value})}
                  />
                </div>
                <div className="personal-item">
                  <label>💝 From</label>
                  <input 
                    type="text"
                    placeholder="Your name"
                    value={personalization.senderName}
                    onChange={(e) => setPersonalization({...personalization, senderName: e.target.value})}
                  />
                </div>
              </div>

              <div className="personal-row">
                <div className="personal-item">
                  <label>📦 Wrap Color</label>
                  <div className="color-options">
                    {wrapColors.map(c => (
                      <button 
                        key={c.value}
                        className={`color-option ${personalization.wrapColor === c.value ? 'active' : ''}`}
                        style={{ background: c.code }}
                        onClick={() => setPersonalization({...personalization, wrapColor: c.value})}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="personal-item">
                  <label>🎀 Ribbon</label>
                  <div className="color-options">
                    {ribbonColors.map(c => (
                      <button 
                        key={c.value}
                        className={`color-option ${personalization.ribbonColor === c.value ? 'active' : ''}`}
                        style={{ background: c.code }}
                        onClick={() => setPersonalization({...personalization, ribbonColor: c.value})}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="personal-row">
                <div className="personal-item">
                  <label>📏 Size</label>
                  <div className="size-options">
                    <button className={`size-opt ${personalization.size === 'small' ? 'active' : ''}`} onClick={() => setPersonalization({...personalization, size: 'small'})}>Small</button>
                    <button className={`size-opt ${personalization.size === 'medium' ? 'active' : ''}`} onClick={() => setPersonalization({...personalization, size: 'medium'})}>Medium (+200)</button>
                    <button className={`size-opt ${personalization.size === 'large' ? 'active' : ''}`} onClick={() => setPersonalization({...personalization, size: 'large'})}>Large (+400)</button>
                  </div>
                </div>
                <div className="personal-item">
                  <label>✨ Sticker</label>
                  <div className="sticker-options">
                    {stickers.map(s => (
                      <button 
                        key={s}
                        className={`sticker-opt ${personalization.sticker === s ? 'active' : ''}`}
                        onClick={() => setPersonalization({...personalization, sticker: s})}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {savedBouquets.length > 0 && (
        <div className="saved-gallery-single">
          <div className="gallery-header-single">
            <h3>📋 Your Saved Bouquets</h3>
            <span>{savedBouquets.length} creations</span>
          </div>
          <div className="gallery-grid-single">
            {savedBouquets.map(b => (
              <div key={b.id} className="saved-card-single">
                <div className="saved-preview-single">
                  {b.flowers.slice(0, 5).map((f, i) => (
                    <img key={i} src={f.image} alt="" className="saved-flower-img" />
                  ))}
                  {b.flowers.length > 5 && <span className="more-count-single">+{b.flowers.length - 5}</span>}
                </div>
                <div className="saved-info-single">
                  <h4>{b.name}</h4>
                  <p>{b.flowers.length} flowers • {b.totalPrice} den</p>
                </div>
                <div className="saved-actions-single">
                  <button className="edit-btn-single" onClick={() => editBouquet(b)}>Edit</button>
                  <button className="delete-btn-single" onClick={() => deleteBouquet(b.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default CreateBouquet;