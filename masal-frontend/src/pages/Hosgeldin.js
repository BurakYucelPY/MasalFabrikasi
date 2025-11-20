import './Hosgeldin.css';
import backgroundImage from '../images/scene-with-young-children-playing-nature-outdoors.jpg';

function Hosgeldin({ onNext }) {
  return (
    <div className="hosgeldin" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <div className="title-wrapper">
          <h1 className="bouncy-title">
            <span style={{"--i": 0}}>M</span>
            <span style={{"--i": 1}}>a</span>
            <span style={{"--i": 2}}>s</span>
            <span style={{"--i": 3}}>a</span>
            <span style={{"--i": 4}}>l</span>
            <span style={{"--i": 5}}> </span>
            <span style={{"--i": 6}}>F</span>
            <span style={{"--i": 7}}>a</span>
            <span style={{"--i": 8}}>b</span>
            <span style={{"--i": 9}}>r</span>
            <span style={{"--i": 10}}>i</span>
            <span style={{"--i": 11}}>k</span>
            <span style={{"--i": 12}}>a</span>
            <span style={{"--i": 13}}>s</span>
            <span style={{"--i": 14}}>ı</span>
            <span style={{"--i": 15}}>n</span>
            <span style={{"--i": 16}}>a</span>
            <span style={{"--i": 17}}> </span>
            <span style={{"--i": 18}}>H</span>
            <span style={{"--i": 19}}>o</span>
            <span style={{"--i": 20}}>ş</span>
            <span style={{"--i": 21}}>g</span>
            <span style={{"--i": 22}}>e</span>
            <span style={{"--i": 23}}>l</span>
            <span style={{"--i": 24}}>d</span>
            <span style={{"--i": 25}}>i</span>
            <span style={{"--i": 26}}>n</span>
            <span style={{"--i": 27}}>i</span>
            <span style={{"--i": 28}}>z</span>
          </h1>
        </div>
        <p>Resimlerinizi yükleyin, bir tema seçin ve yapay zeka sizin için özel bir masal oluştursun!</p>
        <button onClick={onNext} className="magic-button">
          <span className="magic-button-content">
            ✨ Masala Başla ✨
          </span>
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✦</span>
          <span className="sparkle sparkle-3">✦</span>
          <span className="sparkle sparkle-4">✦</span>
        </button>
      </div>
    </div>
  );
}

export default Hosgeldin;
