import { useNavigate } from 'react-router-dom';
import './TemaSecimi.css';

function TemaSecimi({ setSecilenTema }) {
  const navigate = useNavigate();
  const themes = [
    { name: 'DOSTLUK', emoji: '🤝', color: 'pink' },
    { name: 'MACERA', emoji: '🗺️', color: 'orange' },
    { name: 'CESARET', emoji: '🦁', color: 'red' },
    { name: 'EĞİTİCİ', emoji: '📚', color: 'blue' },
    { name: 'KOMİK', emoji: '😂', color: 'yellow' },
    { name: 'GİZEM', emoji: '🔮', color: 'purple' }
  ];

  const handleThemeSelect = (themeName) => {
    setSecilenTema(themeName);
    navigate('/masal-olustur');
  };

  return (
    <div className="tema-secimi">
      <h1>Bir Tema Seçin</h1>
      <div className="tema-kartlar">
        {themes.map(theme => (
          <div 
            key={theme.name} 
            className={`tema-kart tema-${theme.color}`} 
            onClick={() => handleThemeSelect(theme.name)}
          >
            <div className="tema-emoji">{theme.emoji}</div>
            <h2>{theme.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemaSecimi;
