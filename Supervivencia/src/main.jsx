import React from 'react'
import ReactDOM from 'react-dom/client'
import './CSS/main.css'
import './CSS/Start.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
)