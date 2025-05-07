/**
 * @author Julian David Vera Godoy
 * @description Componente de Grid data table
 * @date 2025-05-08
 */

//Librerias______
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
  padding: 1rem;
  background-color: #000814;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const FixedMenu = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 10px 20px;
  z-index: 100;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px;
  width: 80%;
`;

const Input = styled.input`
  padding: 12px 16px;
  background: rgba(0, 8, 20, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  color: #ffffff;
  outline: none;
  font-size: 1rem;
  text-align: center;
  &:hover, &:focus {
    border-color: #00f7ff;
    box-shadow: 0 0 20px rgba(0, 247, 255, 0.8);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
    cursor: pointer;
`;

const Select = styled.select`
  padding: 12px 16px;
  background: rgba(0, 8, 20, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  color: #ffffff;
  outline: none;
  font-size: 1rem;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  text-align: center;
  &:hover, &:focus {
    border-color: #00f7ff;
    box-shadow: 0 0 20px rgba(0, 247, 255, 0.8);
  }
  option {
    background-color: rgba(0, 8, 20, 0.8);
    color: #ffffff;
  }
    cursor: pointer;
`;




const StickyThLeft = styled.th`
  position: sticky;
  left: ${props => props.left};
  top: 0;
  background: #000;
  color: #fff;
  z-index: 3;
  padding: 10px;
  white-space: nowrap;
`;

const Table = styled.table`
  display: block;
  min-width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
`;


const Th = styled.th`
  background: #000000;
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 600;
`;

const Td = styled.td`
  text-align: center;
  padding: 6px;
  width: 60px;
  height: 30px;
  color: white;
  background-color: ${props => props.bgColor || '#fff'};
  border: 0.01px solid #0000001e;
`;

const FixedColumn = styled.td`
  position: sticky;
  left: ${props => props.left};
  background: #000;
  color: #fff;
  z-index: 2;
  padding: 8px;
  white-space: nowrap;
`;

const MonthBanner = styled.div`
  position: sticky;
  top: 0;
  left: 1px;
  padding: 12px 20px;
  background: rgba(0, 8, 20, 0.2);
  z-index: 10;
  margin-bottom: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(0, 8, 20, 0.2);
  color: white;
  text-transform: uppercase;
  font-size: 12px;
font-weight: bold;
  transition: all 0.5s ease;
  backdrop-filter: blur(8px);
  overflow: hidden;
  cursor: pointer;


  /* Efecto de resplandor */
  &:hover, &:focus {
    border-color: #00f7ff;
    box-shadow: 0 0 20px rgba(0, 247, 255, 0.8);
  }



  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 20px ${(props) => props.bgColor || '#00f7ff'}, 0 0 40px rgba(0, 229, 255, 0.5);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 30px ${(props) => props.bgColor || '#00f7ff'}, 0 0 60px rgba(0, 229, 255, 0.7);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 20px ${(props) => props.bgColor || '#00f7ff'}, 0 0 40px rgba(0, 229, 255, 0.5);
    }
  }

  /* Efecto del cohete */
  .rocket {
    margin-left: 10px;

    filter: drop-shadow(0 0 5px white);
  }

  


  @keyframes trail {
    0% { opacity: 0.8; transform: translateY(3px); }
    50% { opacity: 0.4; transform: translateY(5px); }
    100% { opacity: 0; transform: translateY(7px); }
  }
`;



// Exportación estilos__________________
const GridTemplateStyles = {
    Container,
    TableWrapper,
    FixedMenu,
    FilterWrapper,
    Input,
    Select,
    StickyThLeft,
    Table,
    Th,
    Td,
    FixedColumn,
    MonthBanner
  };
  
  export default GridTemplateStyles;