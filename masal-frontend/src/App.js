import { useState } from 'react';
import Hosgeldin from './pages/Hosgeldin';
import TemaSecimi from './pages/TemaSecimi';
import MasalOlustur from './pages/MasalOlustur';
import MasalGoster from './pages/MasalGoster';
import SplashCursor from './components/SplashCursor';
import './App.css';

function App() {
  const [sayfa, setSayfa] = useState(1);
  const [secilenTema, setSecilenTema] = useState('');
  const [masal, setMasal] = useState('');

  const handleTemaSecimi = (tema) => {
    setSecilenTema(tema);
    setSayfa(3);
  };

  const handleMasalOlustur = (yeniMasal) => {
    setMasal(yeniMasal);
    setSayfa(4);
  };

  return (
    <div className="App">
      <SplashCursor />
      {sayfa === 1 && <Hosgeldin onNext={() => setSayfa(2)} />}
      {sayfa === 2 && <TemaSecimi onSelectTheme={handleTemaSecimi} />}
      {sayfa === 3 && <MasalOlustur tema={secilenTema} onMasalOlustur={handleMasalOlustur} />}
      {sayfa === 4 && <MasalGoster masal={masal} />}
    </div>
  );
}

export default App;
