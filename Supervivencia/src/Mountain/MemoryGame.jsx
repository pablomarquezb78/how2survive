import React, { useState, useEffect } from "react";
import './CSS/MemoryGame.css';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SosIcon from '@mui/icons-material/Sos';
import KeyboardIcon from '@mui/icons-material/Keyboard';


import HelpSection from "./HelpSection";
import ShortcutsSection from '../Components/ShortcutsSection.jsx';


const MemoryGame = () => {
  const AnimatedIconButton = styled(IconButton)`
    color: black;
    .MuiSvgIcon-root {
      width: calc(33px + (64 - 33) * ((100vmin - 350px) / (1080 - 350)));
      height: calc(33px + (64 - 33) * ((100vmin - 350px) / (1080 - 350)));
    }
  `;



  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [shouldFlipIncorrect, setShouldFlipIncorrect] = useState(false);
  const [difficulty, setDifficulty] = useState("facil");
  const [showResult, setShowResult] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [shortcutsPressed, setShortcutsPressed] = useState(false);
  const [announcement, setAnnouncement] = useState('');


  useEffect(() => {
    if (difficulty === "facil") {
      setAnnouncement('Juegas en modo fácil');
    } else if (difficulty === "dificil") {
      setAnnouncement('Juegas en modo difícil');
    }
  }, [difficulty]);

  const shuffleCards = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const images= [
      "/Mountain/huella_de_oso.png",
      "/Mountain/foto_de_oso.png",
      "/Mountain/huella_de_lobo.png",
      "/Mountain/foto_de_lobo.png",
      "/Mountain/huella_de_ciervo.png",
      "/Mountain/foto_de_ciervo.png",
      "/Mountain/huella_de_cabra.png",
      "/Mountain/foto_de_cabra.png"
    ];

    const cardPairs = images.map((image, index) => ({
      id: Math.floor(index / 2),
      image
    }));

    setCards(shuffleCards(cardPairs));
  }, []);

  const handleCardClick = index => {
    if (matchedCards.includes(index) || flippedCards.includes(index) || flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      const firstCardIndex = newFlippedCards[0];
      const secondCardIndex = newFlippedCards[1];
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.id === secondCard.id) {
        const newMatchedCards = [...matchedCards, firstCardIndex, secondCardIndex];
        setAnnouncement('Elegiste 2 cartas correctas');
        setMatchedCards(newMatchedCards);
        setFlippedCards([]);
        if (newMatchedCards.length === cards.length) {
          setShowResult(true);
        }
      } else {
        if (difficulty === "facil") {
          setShouldFlipIncorrect(true);

        } else if (difficulty === "dificil") {

          setTimeout(() => {
            setFlippedCards([]);
            setAnnouncement('Elegiste 2 cartas incorrectas');
          }, 1500);
        }
      }
    }
  };

  const showShortcuts = () => {
    setAnnouncement('Abriste Seccion Atajos');

    setShortcutsPressed(prevState => !prevState);
  }

  const toggleHelp = () => {
    setAnnouncement('Abriste Seccion Ayuda');

    setShowHelp(!showHelp);
  };

  const handleResetIncorrectCards = () => {
    setAnnouncement('Volteaste las 2 cartas incorrectas');

    setFlippedCards([]);
    setShouldFlipIncorrect(false);
  };

  const cancelGame = () => {
    setAnnouncement('Volviste a la ventana de juego');

    setShowHelp(false);
  };

  const handleCardKeyPress = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      handleCardClick(index);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key >= "1" && e.key <= "8") {
      const cardIndex = parseInt(e.key) - 1;
      if (cardIndex >= 0 && cardIndex < cards.length && !isCardFlipped(cardIndex) && !matchedCards.includes(cardIndex)) {
        handleCardClick(cardIndex);
      }
    } else if (e.key.toUpperCase() === "R") {
      handleResetIncorrectCards();
    } else if (e.key.toUpperCase() === "0") {
      handleResetGame();
    }
  };

  const handleResetGame = () => {
    setAnnouncement('El juego ha sido reiniciado');

    setMoves(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setShouldFlipIncorrect(false);
    setShowResult(false);
    setCards(shuffleCards(cards));
  };  

  const isCardFlipped = index => {
    return flippedCards.includes(index) || matchedCards.includes(index);
  };

  return (
    <div 
      className="memory-game" 
      tabIndex="0" 
      onKeyDown={handleKeyPress}
      role="application" 
      aria-label="Relaciona a cada animal con su huella">
      <h2>Relaciona a cada animal con su huella</h2>
      <div aria-label="Sección de botones" className="controls">
        <label htmlFor="dificultadselect">
          Dificultad:
          <select id="dificultadselect" title="seleccionar dificultad" value={difficulty} onChange={e => setDifficulty(e.target.value)} className="form-select">
            <option value="facil">FÁCIL</option>
            <option value="dificil">DIFÍCIL</option>
          </select>
        </label>

        <AnimatedIconButton 
          className='helpmont' 
          title="Ayuda" 
          aria-label="Botón de Ayuda"
          tabIndex={0} 
          onClick={toggleHelp} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') toggleHelp();
          }}>
          <SosIcon />
        </AnimatedIconButton>

        <AnimatedIconButton aria-label="Botón de atajos" className='helpmont' title="Atajos de teclado" onClick={showShortcuts}>
                        <KeyboardIcon /> 
        </AnimatedIconButton>  

        <button
            aria-label="Boton para reiniciar el juego" 
            tabIndex="0"
                    style={{ marginTop : 35}}
            onClick={handleResetGame} 
          className="btn btn-dark">
          Reiniciar
        </button>
      </div>

      {showHelp && (
       <HelpSection  cancelGame={cancelGame} />
      )}
      {(shortcutsPressed) && (
                    <ShortcutsSection  showShortcuts={showShortcuts} imagen={"/Mountain/atajosmont.png"} altText={"Atajos: Con los números 1-8 del teclado se eligen las cartas y con R puedes girarlas en el modo fácil."} propButton={"btn btn-dark h-25 mt-4"}/>
      )}
      

      <div className="cards-grid">
        {Array.from({ length: 8 }, (_, rowIndex) => (
              <div
                key={rowIndex}
                className={`card ${isCardFlipped(rowIndex) ? "flipped" : ""}`}
                onClick={() => handleCardClick(rowIndex)}
                onKeyDown={(e) => handleCardKeyPress(e, rowIndex)}
                tabIndex="0"
                role="button"
                aria-pressed={isCardFlipped(rowIndex)}
                aria-label={
                  isCardFlipped(rowIndex) 
                  ? `Carta con imagen de ${cards[rowIndex].image.split('/').pop().replace(/\.[^/.]+$/, "")}`
                  : `Carta Misteriosa ${rowIndex +1}`}                
              >
                <img
              src={isCardFlipped(rowIndex) ? cards[rowIndex].image : "/Mountain/interrogacion.png"}
                  alt={isCardFlipped(rowIndex) ? cards[rowIndex].image.split('/').pop().replace(/\.[^/.]+$/, "") : "Carta Misteriosa"}
                  className="card-image"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
      </div>

      <div style={{ visibility: shouldFlipIncorrect ? 'visible' : 'hidden' }}>
        <button onClick={handleResetIncorrectCards} style={{ height: 'auto'}} className="btn btn-primary"> 
          Volver a Intentar
        </button>
      </div>

      <span aria-live="assertive" aria-atomic="true" className="sr-only visually-hidden" id="anunciosHOL">
                {announcement}
      </span>





      {showResult && (
        <div 
          className="resultmont position-absolute top-50 start-50 translate-middle bg-white rounded p-3 z-1 border border-dark"
          role="alertdialog"
          aria-labelledby="resultTitle"
          aria-describedby="resultDescription">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 id="resultTitle" className="text-center">¡Has completado el juego en {moves} movimientos!</h3>
            <button id="resultDescription" className="btn btn-dark m-2" onClick={handleResetGame}>Reiniciar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;