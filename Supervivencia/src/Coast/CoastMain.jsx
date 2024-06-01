import React from 'react'
import CoastStart from './CoastStart.jsx';
import InfoSection from '../Info/InfoSection.jsx'
import HigherOrLowerGame from './HigherOrLower.jsx'
import CoastCarousel from '../Components/carouselPage/CarouselInfo.jsx';
import coastAnimals from '/public/Coast/animalesCosta.json';
import coastPlants from '/public/Coast/plantasCosta.json';

import {useRef} from 'react';
import '../CSS/main.css'
import '../CSS/Start.css'
import NavBar from '../Start/NavBar';

function CoastMain(){

    const gridInfoRef = useRef(null);
    const startRef = useRef(null);

    const scrollToGridInfo = () => {
        gridInfoRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // const scrollToStart = () => {
    //     startRef.current.scrollIntoView({ behavior: 'smooth' });
    // };

    return(
        <>
            <main className='sliderContainer'>
                <NavBar scrollToGridInfo={scrollToGridInfo} currentLink={5}/>

                <div className='sliderItem' ref={startRef}>
                    <CoastStart scrollToGridInfo={scrollToGridInfo}/>
                </div>

                <div className='sliderItem' ref={startRef}>
                    <CoastCarousel data={coastPlants} id='Coast' title={'PLANTAS DE LA COSTA'} scrollToGridInfo={scrollToGridInfo}/>
                </div>

                <div className='sliderItem' ref={startRef}>
                    <CoastCarousel data={coastAnimals} id='Coast' title={'ANIMALES DE LA COSTA'} scrollToGridInfo={scrollToGridInfo}/>
                </div>

                <div className='sliderItem' ref={gridInfoRef}>
                    <HigherOrLowerGame/>
                </div>

                <div className='sliderItem' ref={gridInfoRef}>
                    <InfoSection/>
                </div>

            </main>  
        </>
    );

}

export default CoastMain;