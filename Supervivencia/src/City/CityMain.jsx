import React from 'react'
import CityStart from './CityStart.jsx';
import InfoSection from '../Info/InfoSection.jsx'
import {useRef} from 'react';
import '../CSS/main.css'
import '../CSS/Start.css'

function CityMain(){

    const gridInfoRef = useRef(null);
    const startRef = useRef(null);

    const scrollToGridInfo = () => {
        gridInfoRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <>
            <main className='sliderContainer'>

                <div className='sliderItem' ref={startRef}>
                    <CityStart scrollToGridInfo={scrollToGridInfo}/>
                </div>

                <div className='sliderItem' ref={gridInfoRef}>
                    <InfoSection/>
                </div>

            </main>  
        </>
    );

}

export default CityMain;