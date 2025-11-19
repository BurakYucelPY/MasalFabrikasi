import { useState } from 'react';
import axios from 'axios';
import './MasalOlustur.css';

function MasalOlustur({ tema }) {
  const [resimler, setResimler] = useState([]);
  const [masal, setMasal] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);

  const handleResimSec = (e) => {
    setResimler(Array.from(e.target.files));
  };

  const handleMasalOlustur = async () => {
    if (resimler.length === 0) {
      alert('Lütfen en az 1 resim seçin!');
      return;
    }

    setYukleniyor(true);
    setMasal('');

    const formData = new FormData();
    resimler.forEach(resim => {
      formData.append('resimler', resim);
    });
    formData.append('tema', tema);

    try {
      const response = await axios.post('http://localhost:8000/masal-uret', formData);
      setMasal(response.data.masal);
    } catch (error) {
      alert('Hata: ' + error.message);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="masal-olustur">
      <h1>Seçilen Tema: {tema}</h1>
      
      <div className="yukle-bolum">
        <label>Resimlerinizi Seçin:</label>
        <input type="file" multiple accept="image/*" onChange={handleResimSec} />
        <p>{resimler.length} resim seçildi</p>
        <button onClick={handleMasalOlustur} disabled={yukleniyor}>
          {yukleniyor ? 'Masal Oluşturuluyor...' : 'Masal Oluştur'}
        </button>
      </div>

      {masal && (
        <div className="masal-sonuc">
          <h2>Masalınız:</h2>
          <p>{masal}</p>
        </div>
      )}
    </div>
  );
}

export default MasalOlustur;
