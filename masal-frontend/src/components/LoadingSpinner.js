import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <div className="loading-text">Masalınız Hazırlanıyor...</div>
    </div>
  );
};

export default LoadingSpinner;