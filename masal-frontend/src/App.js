import { useState } from 'react';
import Hosgeldin from './pages/Hosgeldin';
import TemaSecimi from './pages/TemaSecimi';
import MasalOlustur from './pages/MasalOlustur';
import SplashCursor from './components/SplashCursor';
import './App.css';

function App() {
  const [sayfa, setSayfa] = useState(1);
  const [secilenTema, setSecilenTema] = useState('');

  const handleTemaSecimi = (tema) => {
    setSecilenTema(tema);
    setSayfa(3);
  };

  return (
    <div className="App">
      <SplashCursor />
      {sayfa === 1 && <Hosgeldin onNext={() => setSayfa(2)} />}
      {sayfa === 2 && <TemaSecimi onSelectTheme={handleTemaSecimi} />}
      {sayfa === 3 && <MasalOlustur tema={secilenTema} />}
    </div>
  );
}

export default App;
