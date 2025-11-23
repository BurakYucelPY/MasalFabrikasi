import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ loadingText = "Masalınız Hazırlanıyor..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <div className="loading-text">{loadingText}</div>
    </div>
  );
};

export default LoadingSpinner;