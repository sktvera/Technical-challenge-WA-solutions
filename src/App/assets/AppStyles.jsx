// AppStyles.js

import styled, { keyframes } from 'styled-components';

// Animación de galaxia en movimiento
const moveStars = keyframes`
  from { background-position: 0 0; }
  to { background-position: -1000px 1000px; }
`;

// Fondo tipo galaxia con textura
export const SpaceBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;  /* Para que no interfiera con otros elementos */
  background-color: #000814;
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
  animation: ${moveStars} 50s linear infinite;
`;

export default { SpaceBackground };