import React from "react";
import './CSS/ShortcutsSection.css';

function ShortcutsSection({ imagen, altText, showShortcuts, propButton, aditionalClass = ''}) {
    return (
<div id="shortcutsContainer" className={`position-absolute z-1 bg-white border border-black rounded p-3 mb-5 appear-animation d-flex flex-column justify-content-center align-items-center top-50 start-50 translate-middle ${aditionalClass}`}>
            <h1 style={{ fontSize: 'calc(12px + (40 - 12) * ((100vmin - 350px) / (1080 - 350)))'}}>Atajos de teclado</h1>
            <img src={imagen} alt={altText}></img>
            <button id="forestCloseHelp" className={propButton} style={{ maxHeight: '50px' }} onClick={showShortcuts}>Volver</button>
        </div>
    );
}

export default ShortcutsSection;