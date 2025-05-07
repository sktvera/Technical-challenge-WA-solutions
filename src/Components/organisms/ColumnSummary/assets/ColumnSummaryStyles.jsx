/**
 * @author Julian David Vera Godoy
 * @description Componente resultados de Grid data table
 * @date 2025-05-08
 */

//Librerias______
import styled from 'styled-components';



const SummaryContainer = styled.div`
  background: #222;
  color: white;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #555;
  position: relative;
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  margin-right: 10px;
  border: 1px solid #fff;
`;

const AstronautWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 150px;
  height: 150px;
  z-index: 10;
`;




// Exportación estilos__________________
const ColumnSummaryStyles = {
    SummaryContainer,
    ColorRow,
    ColorBox,
    AstronautWrapper
  };
  
  export default ColumnSummaryStyles;