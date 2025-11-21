import React, { useState, useEffect } from 'react';
import FlipBook from '../components/FlipBook';
import './MasalGoster.css';

function MasalGoster({ baslik, masal }) {
  const [sayfalar, setSayfalar] = useState([]);

  useEffect(() => {
    if (masal) {
      // Masalı sayfalara böl (yaklaşık 600 karakter)
      const words = masal.split(' ');
      const pages = [];
      let currentPage = '';
      const CHAR_LIMIT = 600;

      words.forEach(word => {
        if ((currentPage + word).length > CHAR_LIMIT) {
          pages.push(currentPage);
          currentPage = word + ' ';
        } else {
          currentPage += word + ' ';
        }
      });
      if (currentPage) pages.push(currentPage);
      
      setSayfalar(pages);
    }
  }, [masal]);

  if (sayfalar.length === 0) {
    return (
      <div className="masal-goster-page">
        <div className="yukleniyor">Masal Hazırlanıyor...</div>
      </div>
    );
  }

  return (
    <div className="masal-goster-page">
      <FlipBook baslik={baslik || "Masal Kitabı"} sayfalar={sayfalar} />
    </div>
  );
}

export default MasalGoster;
