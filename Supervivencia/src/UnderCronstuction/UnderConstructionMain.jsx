import React from 'react';
import InfoSection from '../Info/InfoSection.jsx';
import {useRef} from 'react';
import '../CSS/main.css';
import '../CSS/Start.css';
import UnderConstructionStart from './UnderConstructionStart.jsx';

function MountainMain(){

    const gridInfoRef = useRef(null);
    const startRef = useRef(null);

    const scrollToGridInfo = () => {
        gridInfoRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToStart = () => {
        startRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <>
            <main className='sliderContainer'>

                <div className='sliderItem' ref={startRef}>
                    <UnderConstructionStart scrollToGridInfo={scrollToGridInfo}/>
                </div>

                <div className='sliderItem' ref={gridInfoRef}>
                    <InfoSection scrollToStart={scrollToStart}/>
                </div>

            </main>  
        </>
    );

}

export default MountainMain;