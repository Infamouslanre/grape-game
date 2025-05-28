import React, { useEffect } from 'react';

const AdSpace = ({ position, className = '' }) => {
  useEffect(() => {
    // Initialize AdSense ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Define ad sizes based on position
  const getAdSize = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'horizontal';
      case 'sidebar-left':
      case 'sidebar-right':
        return 'vertical';
      default:
        return 'auto';
    }
  };

  const adSize = getAdSize();

  return (
    <div 
      className={`ad-container ${className}`}
      data-ad-position={position}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...(adSize === 'horizontal' && { height: '90px', width: '728px' }),
          ...(adSize === 'vertical' && { height: '600px', width: '300px' }),
          ...(adSize === 'auto' && { height: '250px', width: '100%' })
        }}
        data-ad-client="ca-pub-7131419666924013"
        data-ad-slot={getAdSlot(position)}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Helper function to generate unique ad slots
const getAdSlot = (position) => {
  const slots = {
    'top': '1234567890',
    'bottom': '0987654321',
    'sidebar-left': '1122334455',
    'sidebar-right': '5544332211'
  };
  return slots[position] || '0000000000';
};

export default AdSpace; 