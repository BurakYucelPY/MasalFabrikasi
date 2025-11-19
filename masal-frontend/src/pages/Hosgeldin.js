import './Hosgeldin.css';

function Hosgeldin({ onNext }) {
  return (
    <div className="hosgeldin">
      <h1>Masal Fabrikasına Hoşgeldiniz</h1>
      <p>Resimlerinizi yükleyin, bir tema seçin ve yapay zeka sizin için özel bir masal oluştursun!</p>
      <button onClick={onNext}>Devam Et</button>
    </div>
  );
}

export default Hosgeldin;
