import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  background: #222;
  color: white;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #555;
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

const ColumnSummary = ({ grouped, date }) => {
  const colorMap = {
    '#2196f3': 'Azul',
    '#4caf50': 'Verde',
    '#ffeb3b': 'Amarillo',
    '#f44336': 'Rojo',
    '#000000': 'Negro'
  };

  const colorCount = {
    '#2196f3': 0,
    '#4caf50': 0,
    '#ffeb3b': 0,
    '#f44336': 0,
    '#000000': 0
  };

  let total = 0;

  for (const row of Object.values(grouped)) {
    const cell = row.cells[date];
    if (cell) {
      colorCount[cell.bgColor] = (colorCount[cell.bgColor] || 0) + 1;
      total++;
    }
  }

  return (
    <SummaryContainer>
      <h3>Resumen de la fecha: {date}</h3>
      {Object.entries(colorCount).map(([color, count]) => (
        <ColorRow key={color}>
          <ColorBox color={color} />
          <span style={{ width: 80 }}>{colorMap[color] || color}</span>
          <strong style={{ marginLeft: 10 }}>{count}</strong>
          <span style={{ marginLeft: 10 }}>
            ({total > 0 ? ((count / total) * 100).toFixed(0) : 0}%)
          </span>
        </ColorRow>
      ))}
      <hr />
      <p><strong>Total celdas:</strong> {total}</p>
    </SummaryContainer>
  );
};

export default ColumnSummary;