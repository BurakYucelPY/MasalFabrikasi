import './Hosgeldin.css';
import backgroundImage from '../images/scene-with-young-children-playing-nature-outdoors.jpg';

function Hosgeldin({ onNext }) {
  return (
    <div className="hosgeldin" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <div className="title-wrapper">
          <svg viewBox="0 0 1200 350" className="curved-text-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <path id="curve" d="M 100 300 Q 600 80 1100 300" />
              <linearGradient id="rainbow-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="14%" stopColor="#ff7f00" />
                <stop offset="28%" stopColor="#ffff00" />
                <stop offset="42%" stopColor="#00ff00" />
                <stop offset="56%" stopColor="#0000ff" />
                <stop offset="70%" stopColor="#4b0082" />
                <stop offset="84%" stopColor="#8f00ff" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="black" floodOpacity="1"/>
              </filter>
            </defs>
            <text width="1200">
              <textPath href="#curve" startOffset="50%" textAnchor="middle" fill="url(#rainbow-gradient)" filter="url(#shadow)">
                Masal Fabrikasına Hoşgeldiniz
              </textPath>
            </text>
          </svg>
        </div>
        <p>Resimlerinizi yükleyin, bir tema seçin ve yapay zeka sizin için özel bir masal oluştursun!</p>
        <button onClick={onNext}>Devam Et</button>
      </div>
    </div>
  );
}

export default Hosgeldin;
