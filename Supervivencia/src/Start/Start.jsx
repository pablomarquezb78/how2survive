import React from 'react';

import '../CSS/Start.css';
import '../CSS/NavBar.css';

import VideoStart from './VideoStart';
import NavBar from './NavBar';
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import { useEffect } from "react";

function Start({scrollToGridInfo}) {

    useEffect(() => {
        document.title = "How2Survive";
    }, []);

    const [text] = useTypewriter({
        words: ["Sobrevive", "Adáptate", "Aprende", "Resiste", "Perdura", "Persiste", "Aguanta"],        
        loop: 0, 
        typeSpeed: 100,
        deleteSpeed: 70,
        delaySpeed: 1000,
    });
    
    return(
        
        
        <section className="position-relative text-left vw-100 vh-100">
    
            {/* Envuelto por una etiqueta header dentro del componente NavBar*/}
            <NavBar scrollToGridInfo={scrollToGridInfo} currentLink={1}/>

            {/* Envuelto por un etiqueta div dentro del componente VideoStart*/}
            <VideoStart/>

            <article className="position-absolute z-1 startArticle">
            
                <h1 id="typeWriteText">{'\u00A0'}{text}</h1>
            
                <article>

                    <h2 id="resilencia">resiliencia</h2>
            
                    <p id="resilenciaDefinition">Capacidad de adaptación de un ser vivo frente a un agente perturbador, un estado o situación adversos.</p>
            
                </article>

            </article>

       </section>
 
    )
}

export default Start
