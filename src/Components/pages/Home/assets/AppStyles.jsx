/**
 * @author Julian David Vera Godoy
 * @description Componente de estilos App
 * @date 2025-05-08
 */

//Librerias______
import styled, { keyframes } from 'styled-components';
import { Button, Typography } from '@mui/material';

// Animación de Glaxia en movimiento
const moveStars = keyframes`
  from { background-position: 0 0; }
  to { background-position: -1000px 1000px; }
`;

// Fondo tipo galaxia con textura
const SpaceBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #000814;
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
  animation: ${moveStars} 50s linear infinite;
`;

// Animación de entrada para el logo
const Logo = styled.img`
  width: 340px;
  height: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 15px #00f7ff);
  animation: fadeIn 1s ease-out;
`;

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

// Exportación estilos__________________
const AppStyles = {
  SpaceBackground,
  Logo,
  Title,
  Subtitle,
  StyledButton,
};

export default AppStyles;