import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import './MasalOlustur.css';

function MasalOlustur({ tema, setMasalBasligi, setMasal }) {
  const navigate = useNavigate();
  const [resimler, setResimler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [surukleniyor, setSurukleniyor] = useState(false);

  const handleResimSec = (e) => {
    const yeniDosyalar = Array.from(e.target.files);
    setResimler(prev => [...prev, ...yeniDosyalar]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setSurukleniyor(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setSurukleniyor(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSurukleniyor(false);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    setResimler(prev => [...prev, ...files]);
  };

  const handleResimSil = (index) => {
    setResimler(prev => prev.filter((_, i) => i !== index));
  };

  const handleMasalOlustur = async () => {
    if (resimler.length === 0) {
      alert('Lütfen en az 1 resim seçin!');
      return;
    }

    setYukleniyor(true);

    const formData = new FormData();
    resimler.forEach(resim => {
      formData.append('resimler', resim);
    });
    formData.append('tema', tema);

    try {
      const response = await axios.post('http://localhost:8000/masal-uret', formData);
      setMasalBasligi(response.data.baslik);
      setMasal(response.data.masal);
      navigate('/masal-goster');
    } catch (error) {
      alert('Hata: ' + error.message);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="masal-olustur">
      {yukleniyor && <LoadingSpinner />}
      <h1>Seçilen Tema: {tema}</h1>
      
      <div className="yukle-bolum">
        <label>Resimlerinizi Seçin:</label>
        
        <div 
          className={`dosya-yukle-alan ${surukleniyor ? 'surukleniyor' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="yukle-ikon">📷</div>
          <p className="yukle-metin">Resimleri buraya sürükleyip bırakın</p>
          <p className="veya-metin">veya</p>
          <label htmlFor="file-input" className="dosya-sec-buton">
            Dosya Seç
          </label>
          <input 
            id="file-input"
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleResimSec}
            style={{ display: 'none' }}
          />
        </div>

        <p className="secilen-dosya">{resimler.length} resim seçildi</p>
        
        {resimler.length > 0 && (
          <div className="resim-onizleme-container">
            {resimler.map((resim, index) => (
              <div key={index} className="onizleme-kart">
                <img 
                  src={URL.createObjectURL(resim)} 
                  alt={`Seçilen ${index + 1}`} 
                  className="onizleme-resim"
                />
                <button 
                  className="sil-buton"
                  onClick={() => handleResimSil(index)}
                  title="Resmi Kaldır"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        <button onClick={handleMasalOlustur} disabled={yukleniyor}>
          {yukleniyor ? 'Masal Oluşturuluyor...' : 'Masal Oluştur'}
        </button>
      </div>
    </div>
  );
}

export default MasalOlustur;
