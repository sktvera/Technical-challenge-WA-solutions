import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Button, Typography, Box } from '@mui/material';
import waicon from './assets/image.png';
import GridTemplate from '../Components/GridTemplate/GridTemplate'
import data from './assets/DatosPruebas.json'

// Animación de estrellas en movimiento
const moveStars = keyframes`
  from { background-position: 0 0; }
  to { background-position: -1000px 1000px; }
`;

// Fondo más realista tipo galaxia
const SpaceBackground = styled.div`
  min-height: 100vh;
  background-color: #000814;
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
  animation: ${moveStars} 50s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

// Animación de entrada para el logo
const Logo = styled.img`
  width: 340px;
  height: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 15px #00f7ff);
  animation: fadeIn 1s ease-out;
`;

// Títulos con estética sci-fi
const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 15px #00e5ff;
  margin-bottom: 1rem;
`;

const Subtitle = styled(Typography)`
  color: #8df6ff;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(141, 246, 255, 0.5);
`;

// Botón tipo holograma
const StyledButton = styled(Button)`
  padding: 10px 30px !important;
  font-size: 1rem !important;
  font-weight: bold !important;
  background: linear-gradient(90deg, #00f7ff, #007cf0) !important;
  color: #fff !important;
  border-radius: 50px !important;
  box-shadow: 0 0 20px #00f7ff, 0 0 40px #007cf0;
  transition: 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(90deg, #007cf0, #00f7ff) !important;
    box-shadow: 0 0 30px #00e5ff, 0 0 50px #00f7ff;
  }
`;

// Home con estilo futurista
function Home() {
  return (
    <Box>
      <Logo src={waicon} alt="WA Logo" />
      <Title variant="h4">
        Bienvenido a la Prueba Técnica Senior Frontend
      </Title>
      <Subtitle variant="h5">
        WA Solutions 🚀
      </Subtitle>
      <br></br>
      <StyledButton variant="contained" component={Link} to="/about">
        ¿CÓMO INICIAR?
      </StyledButton>
    </Box>
  );
}

// Página secundaria simple
function About() {
  return (
    <Box color="white" textAlign="center" p={5}>
      <Typography variant="h5">Aquí puedes comenzar tu desarrollo técnico con WA Solutions.</Typography>
    </Box>
  );
}

// App
function App() {

  
  return (
    <Router>
      <SpaceBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<GridTemplate data={data.Datos} />} />
        </Routes>
      </SpaceBackground>
    </Router>
  );
}

export default App;