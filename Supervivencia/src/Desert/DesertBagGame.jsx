import React, { useState, useEffect } from "react";
import Bag from './DesertImages/Bag.png';
import './Desert.css';
import itemList from './itemsBag.json';

function DesertBagGame() {
    const imgPath = "src/Desert/DesertImages/";
    //Control de puntos de supervivencia conseguidos
    const [suma,setSuma] = useState(0);
    //Indice de la lista actual
    const [currentIndex, setCurrentIndex] = useState(0);
    //Animacion de objeto a mochila
    const [isAnimating, setIsAnimating] = useState(false);
    //animacion mochila
    const [isItemIncluded, setIsItemIncluded] = useState(false);
    //control cambio indice
    const [indexChanged,setIndexChanged] = useState(false);

    useEffect(() =>{
        setIndexChanged(true);
        setTimeout(() => {
            setIndexChanged(false);
        }, 500);
    },[currentIndex])

    useEffect(() => {
        //Si termina la animacion y se ha introducido item animamos la mochila
        if (!isAnimating && isItemIncluded) {
            setTimeout(() => {
                //Acabamos la animacion de la mochila
                setIsItemIncluded(false);
            }, 500);
        }
    }, [isAnimating, isItemIncluded]);

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % itemList.length); // Actualiza el índice actual
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + itemList.length) % itemList.length); // Actualiza el índice actual
    };

    const includeItem = () => {
        if (itemList.length === 7) {
            //Control Fin del Juego
            return;
        }
        setSuma(suma + itemList[currentIndex].puntuacion);
        setIsAnimating(true);

        setTimeout(() => {
            //Termina la animacion del item
            setIsAnimating(false);
            //Iniciamos animacion de la mochila
            setIsItemIncluded(true);

            //Elimino el elemento y avanzo el índice
            itemList.splice(currentIndex, 1);
            setCurrentIndex((currentIndex + 1) % itemList.length);
        }, 500);
    };

    return (
        <section id="completeSection" className="position-relative vw-100 vh-100">
            <div id="resultDisplay" className="">
                <h1 className="text-center text-white">¡Prepara la mochila para sobrevivir!</h1>
                <h2 className={`text-center text-white ${itemList.length === 7 ? "" : "d-none"}`}>¡Fin del juego! Has conseguido {suma} puntos de supervivencia</h2>
            </div>
            <div id="bagGameDisplay" className="position-absolute d-flex justify-content-center w-100">
                <div className="d-flex flex-grow-0 h-100 flex-column justify-content-center">
                    <div id="CapacityContainer">
                        <h5 className="d-block text-center text-white f-size-4">{14-itemList.length}/7</h5>
                    </div>
                    <div id="BagContainer" className={`d-flex justify-content-center flex-grow-0 w-100  ${isItemIncluded ? "item-included" : ""}`}>
                        <img src={Bag} alt="Bag" className="img-fluid"></img>
                    </div>
                </div>
                <div id="itemsContainer" className="h-100 d-flex flex-column align-items-center justify-content-center">
                    <div id="imgContainer" className="d-flex justify-content-center flex-grow-0 w-100">
                    <img
                        src={imgPath + itemList[currentIndex].imagen}
                        alt={`Imagen ${itemList[currentIndex].id}`}
                        className={`img-fluid ${isAnimating ? "move-left-scale-animation" : ""} ${(isItemIncluded || indexChanged) ? "appear-animation" : ""} `}
                        onAnimationEnd={() => {
                            setIsAnimating(false); // Indica que la animación del objeto ha terminado
                        }}
                    />
                    </div>
                    <div id="buttonContainer" className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-primary h-50" onClick={prevImage}>&lt;</button>
                        <button className="btn btn-primary h-50" onClick={includeItem}>Incluir</button>
                        <button className="btn btn-primary h-50" onClick={nextImage}>&gt;</button>
                    </div>
                </div>
                <div id="itemInfoContainer">
                    <h3 id="itemDisplayed" className="text-white text-center">{itemList[currentIndex].nombre}</h3><br/>
                    <span className="fw-bold text-white">Ventajas: {itemList[currentIndex].ventajas}</span> <br/><br/>
                    <span className="fw-bold text-white">Desventajas: {itemList[currentIndex].desventajas}</span>
                </div>
            </div>
        </section>
    );
}

export default DesertBagGame;
