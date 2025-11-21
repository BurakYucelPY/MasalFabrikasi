import './MasalGoster.css';

function MasalGoster({ baslik, masal }) {
  return (
    <div className="masal-goster">
      <div className="masal-icerik">
        <h1>{baslik || "Masalın"}</h1>
        {masal && (
          <div className="masal-metin">
            <p>{masal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MasalGoster;
