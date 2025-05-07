/**
 * @author Julian David Vera Godoy
 * @description Consolidado de datos data grid
 * @date 2025-05-08
 */


//assets______
import React from 'react';
import Astronauta from '../../atoms/SpaceHeader/SpaceHeader';
import ColumnSummaryStyles from './assets/ColumnSummaryStyles'


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
    <ColumnSummaryStyles.SummaryContainer>
      <h3>Resumen de la fecha: {date}</h3>
      {Object.entries(colorCount).map(([color, count]) => (
        <ColumnSummaryStyles.ColorRow key={color}>
          <ColumnSummaryStyles.ColorBox color={color} />
          <span style={{ width: 80 }}>{colorMap[color] || color}</span>
          <strong style={{ marginLeft: 10 }}>{count}</strong>
          <span style={{ marginLeft: 10 }}>
            ({total > 0 ? ((count / total) * 100).toFixed(0) : 0}%)
          </span>
        </ColumnSummaryStyles.ColorRow>
      ))}
      <hr />
      <p><strong>Total celdas:</strong> {total}</p>
      <ColumnSummaryStyles.AstronautWrapper>
        <Astronauta />
      </ColumnSummaryStyles.AstronautWrapper>
    </ColumnSummaryStyles.SummaryContainer>
  );
};

export default ColumnSummary;