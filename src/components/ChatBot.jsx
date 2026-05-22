// components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to BlissFlower! I'm your gift assistant. How can I help you today?", sender: 'bot', time: formatTime(new Date()) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('flower')) {
      return "We have beautiful fresh flowers! Roses (1499 den), Peonies (2499 den), Sunflowers (1199 den). Would you like me to show you our collection?";
    }
    if (msg.includes('chocolate')) {
      return "Our artisanal chocolates include Belgian Chocolate Box (899 den), Ferrero Rocher Set (1999 den), and Heart-shaped Truffles (1299 den). Perfect for gifting!";
    }
    if (msg.includes('wine')) {
      return "We have premium wines: Tikveš Rosé (899 den), Vranec Premium (1299 den), and Prosecco (1599 den). Would you like recommendations?";
    }
    if (msg.includes('gift')) {
      return "Our Gift Sets are very popular! Romantic Set (4499 den) includes roses + truffles + rosé. Luxury Love Set (5999 den) has peonies + Ferrero + prosecco.";
    }
    if (msg.includes('delivery')) {
      return "We offer free delivery on orders over 1000 den! Same-day delivery available for orders before 2 PM. Delivery times: 13:00, 15:00, or 17:00.";
    }
    if (msg.includes('price')) {
      return "Our prices range from 599 den for chocolates to 5999 den for luxury gift sets. All prices are in Macedonian Denars.";
    }
    if (msg.includes('help')) {
      return "I can help you with: flowers, chocolates, wines, gift sets, delivery info, pricing, and order assistance. Just ask me anything!";
    }
    if (msg.includes('order')) {
      return "To place an order, simply add items to your cart and click checkout. Our team will contact you within 30 minutes to confirm your order details.";
    }
    if (msg.includes('contact')) {
      return "You can reach us at +389 70 123 456, email writeus@blissflower.com, or visit our boutique at 8 Mars Boulevard, Skopje. We're open 9AM-9PM every day!";
    }
    if (msg.includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with?";
    }
    
    return "Thank you for your message! Feel free to ask me about flowers, chocolates, wines, gift sets, delivery, or pricing!";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user', time: formatTime(new Date()) };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const currentInput = input;

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);
      const botMessage = { text: botResponse, sender: 'bot', time: formatTime(new Date()) };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestedQuestions = [
    "What flowers do you have?",
    "Tell me about gift sets",
    "Delivery options?",
    "Chocolate prices"
  ];

  return (
    <>
      <button className={`chat-button ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(true)}>
        <div className="single-flower">
          <div className="flower-petal petal-top">🌸</div>
          <div className="flower-petal petal-right">🌸</div>
          <div className="flower-petal petal-bottom">🌸</div>
          <div className="flower-petal petal-left">🌸</div>
          <div className="flower-center">💬</div>
        </div>
        <span className="chat-text">Need help?</span>
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar-flower">
                <span>🌸</span>
              </div>
              <div>
                <h3>BlissFlower Assistant</h3>
                <p>Here to help you</p>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-bubble">
                  <span className="typing-dots">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="suggested-questions">
              {suggestedQuestions.map((q, idx) => (
                <button key={idx} className="suggested-btn" onClick={() => setInput(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend} disabled={!input.trim()}>
              Send →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;