import './TemaSecimi.css';

function TemaSecimi({ onSelectTheme }) {
  const themes = ['DOSTLUK', 'MACERA', 'CESARET', 'EĞİTİCİ', 'KOMİK', 'GİZEM'];

  return (
    <div className="tema-secimi">
      <h1>Bir Tema Seçin</h1>
      <div className="tema-kartlar">
        {themes.map(theme => (
          <div key={theme} className="tema-kart" onClick={() => onSelectTheme(theme)}>
            <h2>{theme}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemaSecimi;
