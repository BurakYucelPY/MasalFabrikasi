import { useState } from 'react';
import axios from 'axios';
import './MasalOlustur.css';

function MasalOlustur({ tema, onMasalOlustur }) {
  const [resimler, setResimler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [surukleniyor, setSurukleniyor] = useState(false);

  const handleResimSec = (e) => {
    setResimler(Array.from(e.target.files));
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
    setResimler(files);
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
      onMasalOlustur(response.data.masal);
    } catch (error) {
      alert('Hata: ' + error.message);
      setYukleniyor(false);
    }
  };

  return (
    <div className="masal-olustur">
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
        
        <button onClick={handleMasalOlustur} disabled={yukleniyor}>
          {yukleniyor ? 'Masal Oluşturuluyor...' : 'Masal Oluştur'}
        </button>
      </div>
    </div>
  );
}

export default MasalOlustur;
