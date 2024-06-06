import React, { useState, useEffect } from 'react';
import data from './RandomImage.jsx';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SosIcon from '@mui/icons-material/Sos';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import './Coast.css';
import HelpHOL from './HelpHOL.jsx';
import ShortcutsSection from './ShortcutsSection.jsx';

function HigherLowerGame() {
    const AnimatedIconButton = styled(IconButton)`
    color: black;

    &:focus {
        transform: scale(1.1);
        transition: transform 0.1s ease;
    }

    .MuiSvgIcon-root {
        width: calc(22px + (50 - 22) * ((100vmin - 350px) / (1080 - 350)));
        height: auto;
    }
    `;


    const [leftCardIndex, setLeftCardIndex] = useState(0);
    const [rightCardIndex, setRightCardIndex] = useState(1);
    const [imageArray, setImageArray] = useState([]);
    const [showDeaths, setShowDeaths] = useState(false);
    const [buttonsVisible, setButtonsVisible] = useState(true);

    const [isCorrect, setIsCorrect] = useState(0);
    const [tickAnimation, setTickAnimation] = useState(false);
    const [crossAnimation, setCrossAnimation] = useState(false);

    const [showAnimation, setShowAnimation] = useState(false);
    const [counter, setCounter] = useState(0);
    const [showResult, setShowResult] = useState(false); 
    const [needHelp, setNeedHelp] = useState(false);
    const [shortcutsPressed, setShortcutsPressed] = useState(false);

    useEffect(() => {
        const numberOfCardAux = new Array(data.longData()).fill().map((_, index) => index + 1);
        const shuffleCard = numberOfCardAux.sort(() => Math.random() - 0.5);
        setImageArray(shuffleCard);
    }, []);

    useEffect(() => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 500);
    }, [rightCardIndex, showResult]);

    useEffect(() => {
        if (tickAnimation) {
            const timer = setTimeout(() => {
                if (rightCardIndex + 1 > imageArray.length - 1) {
                    setShowResult(true);
                    setTickAnimation(false);
                } else {
                    setLeftCardIndex(rightCardIndex);
                    setRightCardIndex(rightCardIndex + 1);
                    setIsCorrect(0);
                    setTickAnimation(false);
                    setShowDeaths(false);
                    setButtonsVisible(true);
                }
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [tickAnimation, rightCardIndex, imageArray.length]);

    const handleHigherClick = () => {
        setButtonsVisible(false);
        setNeedHelp(false);
        setShortcutsPressed(false);
        if (parseInt(data.randomImage(imageArray[leftCardIndex]).mortalidad) <= parseInt(data.randomImage(imageArray[rightCardIndex]).mortalidad)) {
            setIsCorrect(1);
            setShowDeaths(true);
            setTickAnimation(true);
            setTimeout(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1500);
        } else {
            setIsCorrect(2);
            setShowDeaths(true);
            setCrossAnimation(true);
            setTimeout(() => {
                setCrossAnimation(false);
                setShowResult(true);
            }, 1500);
        }
    };

    const handleLowerClick = () => {
        setButtonsVisible(false);
        setNeedHelp(false);
        setShortcutsPressed(false);
        if (parseInt(data.randomImage(imageArray[leftCardIndex]).mortalidad) >= parseInt(data.randomImage(imageArray[rightCardIndex]).mortalidad)) {
            setIsCorrect(1);
            setShowDeaths(true);
            setTickAnimation(true);
            setTimeout(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1500);
        } else {
            setIsCorrect(2);
            setShowDeaths(true);
            setCrossAnimation(true);
            setTimeout(() => {
                setCrossAnimation(false);
                setShowResult(true);
            }, 1500);
        }
    };

    const resetGame = () => {
        const numberOfCardAux = new Array(data.longData()).fill().map((_, index) => index + 1);
        const shuffleCard = numberOfCardAux.sort(() => Math.random() - 0.5);
        setImageArray(shuffleCard);
        setLeftCardIndex(0);
        setRightCardIndex(1);
        setIsCorrect(0);
        setShowDeaths(false);
        setCounter(0);
        setButtonsVisible(true);
        setShowResult(false);
    };

    const cancelGame = () => {
        setShowResult(false);
        setNeedHelp(false);
        setShortcutsPressed(false);
    };

    const helpHandler = () => {
        setNeedHelp(prevState => !prevState);
        setShortcutsPressed(false);
    };

    const showShortcuts = () => {
        setShortcutsPressed(prevState => !prevState);
        setNeedHelp(false);
    }


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === '0') {
                resetGame();
            } else if (e.key.toLowerCase() === '9') {
                helpHandler();
            } else if (e.key === '8') {
                handleHigherClick();
            } else if (e.key === '2') {
                handleLowerClick();
            } else if (e.key.toLowerCase() === '1') {
                cancelGame();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },);


    return (
        <section className='gameHOL d-flex flex-column justify-content-center align-items-center text-center vh-100 vw-100'>
            <div tabIndex='0' id='cabeceraHOL' className='position-relative w-100 d-flex justify-content-center align-items-center'>
            <div>
                <h2 className='tituloHOL'>Higher or Lower</h2>
                <h2 className='tituloHOL'>¿Cuál es más letal para el humano 💀?</h2>
            </div>
            <AnimatedIconButton title="Atajos de teclado" aria-label='Atajos del juego' aria-hidden='false' className={`position-absolute ${!showResult ? '' : 'esconderBoton'}`} id='keyboardHOL' onClick={showShortcuts}><KeyboardIcon /></AnimatedIconButton>
            <AnimatedIconButton title="Ayuda para el juego" aria-label='Ayuda para el juego' aria-hidden='false' className={`position-absolute ${!showResult ? '' : 'esconderBoton'}`}  id='sosHOL' onClick={helpHandler}><SosIcon/></AnimatedIconButton>
        </div>
            <section className='imagenesHOL position-relative d-flex justify-content-center align-items-center'>
                {needHelp && (<HelpHOL helpHandler={helpHandler}/>)}
                {shortcutsPressed && (<ShortcutsSection  showShortcuts={showShortcuts}/>)}
                <div className='imagenHOL position-relative'>
                    <img alt={data.randomImage(imageArray[leftCardIndex])?.imgAlt} className='img-fluid containerHOL' src={data.randomImage(imageArray[leftCardIndex])?.img}/>
                    <div id='informacion_imagen_i'>
                        <h3 tabIndex='0' className='card-text'> {data.randomImage(imageArray[leftCardIndex])?.cardTitle}: {data.randomImage(imageArray[leftCardIndex])?.mortalidad} muertes al año </h3>
                    </div>      
                </div>
                <div className='imagenHOL position-relative'>
                    <img alt={data.randomImage(imageArray[rightCardIndex])?.imgAlt} className='img-fluid containerHOL' src={data.randomImage(imageArray[rightCardIndex])?.img}/>
                    <div id='informacion_imagen_d'  className='position-absolute text-center'>
                        <h3 tabIndex='0' className='card-text'> {data.randomImage(imageArray[rightCardIndex])?.cardTitle}: {showDeaths ? data.randomImage(imageArray[rightCardIndex])?.mortalidad : '?'} muertes al año </h3>
                    </div>
                    <div className='botonesHOL position-absolute'>
                        {buttonsVisible && (
                            <>
                                <button className='custom-buttonHOL mb-1' onClick={handleHigherClick}>Higher</button>
                                <button className='custom-buttonHOL' onClick={handleLowerClick}>Lower</button>
                            </>
                        )}
                    </div> 
                </div>
                {showResult && (
                    <div className="position-absolute z-1 bg-white rounded p-2 border border-black" >
                        <h2 tabIndex='0' style={{fontSize:'calc(20px + (30 - 20) * ((100vmin - 350px) / (1080 - 350)))'}} className={`${isCorrect == 2 ? 'text-danger' : 'text-success'}`}>{isCorrect === 2 ? '¡Fallaste!' : '¡Ganaste!'}</h2>
                        <button tabIndex='0' className='custom-buttonHOL m-2' onClick={cancelGame}>Cancelar</button>
                        <button tabIndex='0' className='custom-buttonHOL m-2' onClick={resetGame}>Volver a jugar</button>      
                    </div>
                )}
                <div className={`position-absolute ${isCorrect !== 0 && 'fade-icon'}`}>
                    {isCorrect === 0 && <img src="/Coast/CoastGame/versus-icon.png"  alt="VS" style={{ maxHeight: 'calc(40px + (100 - 40) * ((100vmin - 350px) / (1080 - 350)))', backgroundColor: 'black', borderRadius:'50%'}} />}
                    {isCorrect === 1 && <img src="/Coast/CoastGame/tick-icon.png" alt="Tick" style={{ maxHeight: 'calc(40px + (100 - 40) * ((100vmin - 350px) / (1080 - 350)))', backgroundColor: 'green', borderRadius:'50%' }} />}
                    {isCorrect === 2 && <img src="/Coast/CoastGame/cross-icon.png" alt="Cross" style={{ maxHeight: 'calc(40px + (100 - 40) * ((100vmin - 350px) / (1080 - 350)))', backgroundColor: 'red', borderRadius:'50%' }} />}
                </div>
            </section>
            <div className="d-flex justify-content-center align-items-center">
                <button className={`custom-buttonHOL m-3 ${!showResult && !crossAnimation && !tickAnimation ? '' : 'esconderBoton'}`} onClick={resetGame}>Reiniciar</button>
                <h3 tabIndex='0' style={{fontSize:'calc(15px + (30 - 15) * ((100vmin - 350px) / (1080 - 350)))'}} className={`${showAnimation ? "puntuacionHOL" : ""}`}>Puntuación: {counter}</h3>
            </div>
        </section>
    );
}

export default HigherLowerGame;
