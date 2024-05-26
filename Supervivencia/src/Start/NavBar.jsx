import logoWeb from '../assets/Start/Logos/logo_web.png'
import hamburguesa from '../assets/Start/Logos/new_burger.png'
import cross from '../assets/Start/Logos/X.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';

import '../CSS/Start.css';
import '../CSS/NavBar.css';
import { Link ,NavLink} from "react-router-dom";
import {useState ,useEffect} from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import React from 'react';
 
function navBar({ scrollToGridInfo, position}) {

    const AnimatedIconButton = styled(IconButton)`
    .MuiSvgIcon-root {
        color: black;

        width: calc(22px + (80 - 22) * ((100vmin - 350px) / (1080 - 350)));
        height: calc(22px + (80 - 22) * ((100vmin - 350px) / (1080 - 350)));
    }
    `;
 
    //Control background blanco
    const bg = position == "absolute" ? "" : "bg-white";

    //0 es equivalente a hamburguesa no pulsada,  1 a pulsada y 2 es equivalente a ver pagina en grande (flex)
    const [showMenu,setShowMenu] = useState(2);
    const [prevShowMenu, setPrevShowMenu] = useState(2); // Estado previo del menú

    const toggleMenu = () => {
        setShowMenu(prevState => (prevState + 1)%2);
    };

    //Control de tamaño de pantalla y el estado del menu de navegacion
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            
            if(screenWidth > 600) { //Vuelve a mostrar el menu con flex y setea la hamburguesa a no pulsado
                setShowMenu(2);
            }else{
                setShowMenu(0);
            }

        };
        
        window.addEventListener('resize', handleResize);
        handleResize();
        window.addEventListener('load', handleResize);;
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, []);

    //Control cambios del estado del menu de navegacion
    useEffect(() => {
        const overlay = document.getElementById('overlay');
        const ayudaLogoStart = document.getElementById('ayudaLogoStart');
        const hamburger = document.getElementById('hamburger');
        const webLogoStart = document.getElementById('webLogoStart')

        if (showMenu === 1) {
            ayudaLogoStart.style.display = 'none';
            hamburger.setAttribute('src', cross);

            //Se muestra el overlay
            overlay.style.display = 'block';
            overlay.classList.remove('hidden');
        } else {
            webLogoStart.style.display = showMenu === 0 ? 'none' : 'block';
            hamburger.style.display = showMenu === 0 ? 'block' : 'none';

            //En grande desaparece el overlay.
            if(showMenu === 2) overlay.style.display = 'none'; 
           
            //Si se estaba mostrando el overlay y se quita se oculta
            if(prevShowMenu !==2 && showMenu === 0){
                overlay.classList.add('hidden');
            }

            ayudaLogoStart.style.display = 'flex';
            hamburger.setAttribute('src', hamburguesa);
        }
        // Actualiza el estado previo del menú
        setPrevShowMenu(showMenu);
    }, [showMenu]);

    //Si estoy en inicio y pulso inicio otra vez debe haber un reload
    const handleInicioClick = () => {
        if (window.location.pathname === '/UI_UMA/') {
            window.location.reload();
        }
    };

    return(
    <>
        <header className={`d-flex flex-row position-${position} ${bg} top-0 start-0 end-0 z-3 vw-100 vh-9 navBar`}>
            <div className="navBarItem">
                <Link to='/UI_UMA/' onClick={handleInicioClick}><img alt='paginaInicio' id="webLogoStart" src={logoWeb}></img></Link>
                <input type='image' id="hamburger" src={hamburguesa} onClick={toggleMenu}/>
            </div>
            <nav>
                <ul id="navList" style={{ 
                    display: showMenu === 2 ? 'flex' : 'none',
                    }}>
                    <li>
                        <NavLink to='/UI_UMA/mountain' activeclassname="active">
                        <span className='animatedSpanNavBar'>Montaña</span>
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to='/UI_UMA/forest' activeclassname="active">
                        <span className='animatedSpanNavBar'>Bosque</span>
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to='/UI_UMA/desert' activeclassname="active">
                            <span className='animatedSpanNavBar'>Desierto</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/UI_UMA/coast' activeclassname="active">
                            <span className='animatedSpanNavBar'>Costa</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/UI_UMA/jungle' activeclassname="active">
                            <span className='animatedSpanNavBar'>Jungla</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="navBarItem">
                <AnimatedIconButton title="Ayuda Página" className="navBarItem" id="ayudaLogoStart" disableRipple={true} onClick={scrollToGridInfo}><HelpOutlineIcon alt='seccionAyuda'></HelpOutlineIcon></AnimatedIconButton>
            </div>
        </header>
        <div id="overlay">
            <ul>
                <li><NavLink end to='/UI_UMA/' activeclassname="active" onClick={handleInicioClick}>
                    <span className='animatedSpanNavBar'>Inicio</span></NavLink>
                </li>
                <li><NavLink to='/UI_UMA/mountain' activeclassname="active">
                    <span className='animatedSpanNavBar'>Montaña</span></NavLink>
                </li>
                <li><NavLink to='/UI_UMA/forest' activeclassname="active">
                    <span className='animatedSpanNavBar'>Bosque</span></NavLink>
                </li>
                <li><NavLink to='/UI_UMA/desert' activeclassname="active">
                    <span className='animatedSpanNavBar'>Desierto</span></NavLink>
                </li>
                <li><NavLink to='/UI_UMA/coast' activeclassname="active">
                    <span className='animatedSpanNavBar'>Costa</span></NavLink>
                </li>
                <li><NavLink to='/UI_UMA/jungle' activeclassname="active">
                    <span className='animatedSpanNavBar'>Jungla</span></NavLink>
                </li>
            </ul>
        </div> 
    </>
    
    )
}

export default navBar

