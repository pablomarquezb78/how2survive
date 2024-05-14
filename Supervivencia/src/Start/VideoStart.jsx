import React from 'react';

import '../CSS/Start.css';
import { Typewriter, useTypewriter} from 'react-simple-typewriter';
import videoStart from "../assets/Start/videoStart.mp4";


function VideoStart() {

    const [text] = useTypewriter({
        words: ["Sobrevive", "Adáptate", "Aprende", "Resiste", "Perdura", "Persiste", "Aguanta", "Supéralo"],        
        loop: 0, 
        typeSpeed: 100,
        deleteSpeed: 70,
        delaySpeed: 1000,
    });
    
    return(
        
        <div className='position-absolute w-100 h-100 top-0 bottom-0 z-0'>
                <video className='w-100 h-100 object-fit-cover' autoPlay loop muted src={videoStart}></video>
        </div>
    )
}

export default VideoStart
