import './TemaSecimi.css';

function TemaSecimi({ onSelectTheme }) {
  const themes = [
    { name: 'DOSTLUK', emoji: '🤝', color: 'pink' },
    { name: 'MACERA', emoji: '🗺️', color: 'orange' },
    { name: 'CESARET', emoji: '🦁', color: 'red' },
    { name: 'EĞİTİCİ', emoji: '📚', color: 'blue' },
    { name: 'KOMİK', emoji: '😂', color: 'yellow' },
    { name: 'GİZEM', emoji: '🔮', color: 'purple' }
  ];

  return (
    <div className="tema-secimi">
      <h1>Bir Tema Seçin</h1>
      <div className="tema-kartlar">
        {themes.map(theme => (
          <div 
            key={theme.name} 
            className={`tema-kart tema-${theme.color}`} 
            onClick={() => onSelectTheme(theme.name)}
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
