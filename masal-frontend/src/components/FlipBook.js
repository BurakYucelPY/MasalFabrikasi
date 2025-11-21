import React, { forwardRef, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';

const Page = forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <div className="page-content">
        {props.children}
        <div className="page-number">{props.number}</div>
      </div>
    </div>
  );
});

function FlipBook({ baslik, sayfalar }) {
  const book = useRef();

  return (
    <div className="flipbook-wrapper">
      <HTMLFlipBook 
        width={450} 
        height={650} 
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        usePortrait={false}
        className="demo-book"
        ref={book}
      >
        <Page key="cover" number={1}>
          <div className="kapak-sayfa">
            <h2>{baslik}</h2>
            <div className="kapak-sus">✨</div>
          </div>
        </Page>
        
        {sayfalar.map((sayfa, index) => (
          <Page key={`page-${index}`} number={index + 2}>
            <div className="metin-sayfasi">
              <p>{sayfa}</p>
            </div>
          </Page>
        ))}

        <Page key="back-cover" number={sayfalar.length + 2}>
          <div className="arka-kapak">
            <h3>SON</h3>
            <div className="son-sus">🌟</div>
          </div>
        </Page>
      </HTMLFlipBook>

      <div className="book-controls">
        <button onClick={() => book.current.pageFlip().flipPrev()}>&lt; Önceki</button>
        <button onClick={() => book.current.pageFlip().flipNext()}>Sonraki &gt;</button>
      </div>
    </div>
  );
}

export default FlipBook;