import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [resimler, setResimler] = useState([]);
  const [tema, setTema] = useState('DOSTLUK');
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
    <div className="App">
      <h1>Masal Fabrikası</h1>
      
      <div>
        <label>Resim Seç (Çoklu): </label>
        <input type="file" multiple accept="image/*" onChange={handleResimSec} />
        <p>{resimler.length} resim seçildi</p>
      </div>

      <div>
        <label>Tema: </label>
        <select value={tema} onChange={(e) => setTema(e.target.value)}>
          <option value="DOSTLUK">DOSTLUK</option>
          <option value="MACERA">MACERA</option>
          <option value="CESARET">CESARET</option>
          <option value="EĞİTİCİ">EĞİTİCİ</option>
          <option value="KOMİK">KOMİK</option>
        </select>
      </div>

      <button onClick={handleMasalOlustur} disabled={yukleniyor}>
        {yukleniyor ? 'Masal Oluşturuluyor...' : 'Masal Oluştur'}
      </button>

      {masal && (
        <div style={{ marginTop: '20px', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
          <h2>Masal:</h2>
          <p>{masal}</p>
        </div>
      )}
    </div>
  );
}

export default App;
