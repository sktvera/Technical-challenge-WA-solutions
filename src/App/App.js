/**
 * @author Julian David Vera Godoy
 * @description Componente principal de la aplicación que gestiona la página de inicio y el sistema de rutas.
 * @date 2025-05-08
 */

//Librerias ______
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GridTemplate from '../Components/templates/GridTemplate/GridTemplate';
import data from './assets/DatosPruebas.json'; //Simulacion de datos prueba tecnica
import Home from '../Components/pages/Home/Home'
import AppStyles from './assets/AppStyles'; 


function App() {
  return (
    <Router>
      <AppStyles.SpaceBackground /> {/* Fondo aplicado globalmente */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<GridTemplate data={data.Datos} />} />
      </Routes>
    </Router>
  );
}

export default App;