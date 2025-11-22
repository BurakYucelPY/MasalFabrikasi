import { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hosgeldin from './pages/Hosgeldin';
import TemaSecimi from './pages/TemaSecimi';
import MasalOlustur from './pages/MasalOlustur';
import MasalGoster from './pages/MasalGoster';
import SplashCursor from './components/SplashCursor';
import './App.css';

function AppContent() {
  const location = useLocation();
  const [secilenTema, setSecilenTema] = useState('');
  const [masal, setMasal] = useState('');
  const [masalBasligi, setMasalBasligi] = useState('');

  // SplashCursor sadece MasalGoster sayfasında gizli
  const showSplash = location.pathname !== '/masal-goster';

  return (
    <div className="App">
      {showSplash && <SplashCursor />}
      <Routes>
        <Route path="/" element={<Hosgeldin />} />
        <Route 
          path="/tema-secimi" 
          element={<TemaSecimi setSecilenTema={setSecilenTema} />} 
        />
        <Route 
          path="/masal-olustur" 
          element={
            <MasalOlustur 
              tema={secilenTema} 
              setMasalBasligi={setMasalBasligi} 
              setMasal={setMasal} 
            />
          } 
        />
        <Route 
          path="/masal-goster" 
          element={<MasalGoster baslik={masalBasligi} masal={masal} />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
