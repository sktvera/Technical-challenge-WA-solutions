import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ColumnSummary from '../ColumnSummary/ColumnSummary';

const Container = styled.div`
  overflow: auto;
  background: #111;
  padding: 1rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 4px;
`;

const Select = styled.select`
  padding: 4px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: max-content;
`;

const Th = styled.th`
  background: #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Td = styled.td`
  text-align: center;
  padding: 6px;
  width: 60px;
  height: 30px;
  color: white;
  background-color: ${props => props.bgColor || '#fff'};
  border: 1px solid #ccc;
`;

const FixedColumn = styled.td`
  position: sticky;
  left: ${props => props.left};
  background: #fff;
  z-index: 1;
  border: 1px solid #ccc;
  padding: 6px;
  font-weight: bold;
`;

const getBackgroundColor = (total, redZone, yellowZone, greenZone) => {
  if (total === 0) return '#000000';
  if (total <= redZone) return '#f44336';
  if (total <= redZone + yellowZone) return '#ffeb3b';
  if (total <= redZone + yellowZone + greenZone) return '#4caf50';
  return '#2196f3';
};

const CalendarGrid = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [selectedDate, setSelectedDate] = useState('');
  const [filterReference, setFilterReference] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterMtoMin, setFilterMtoMin] = useState('');
  const [filterMtoMax, setFilterMtoMax] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const dates = [...new Set(data.map(item => dayjs(item.VisibleForecastedDate).format('YYYY-MM-DD')))].sort();

  const grouped = {};
  tableData.forEach(item => {
    const key = `${item.CenterCode}-${item.Reference}`;
    const date = dayjs(item.VisibleForecastedDate).format('YYYY-MM-DD');
    const total = item.NetFlow + item.MakeToOrder;
    const color = getBackgroundColor(total, item.RedZone, item.YellowZone, item.GreenZone);

    if (!grouped[key]) {
      grouped[key] = {
        CenterCode: item.CenterCode,
        Reference: item.Reference,
        cells: {},
      };
    }

    grouped[key].cells[date] = {
      value: item.MakeToOrder,
      bgColor: color,
    };
  });

  const handleEdit = (key, date, newValue) => {
    setTableData(prev =>
      prev.map(item => {
        const idKey = `${item.CenterCode}-${item.Reference}`;
        const itemDate = dayjs(item.VisibleForecastedDate).format('YYYY-MM-DD');
        if (idKey === key && itemDate === date) {
          const total = item.NetFlow + newValue;
          return {
            ...item,
            MakeToOrder: newValue,
            color: getBackgroundColor(total, item.RedZone, item.YellowZone, item.GreenZone),
          };
        }
        return item;
      })
    );
  };

  const handleDateClick = date => {
    setSelectedDate(date);
  };

  const filteredGrouped = Object.entries(grouped)
    .filter(([_, row]) => {
      const hasDate = filterDate ? Object.keys(row.cells).includes(filterDate) : true;
      const colorMatch = filterColor ? Object.values(row.cells).some(c => c.bgColor === filterColor) : true;
      const mtoMinMatch = filterMtoMin === '' || Object.values(row.cells).some(c => c.value >= parseFloat(filterMtoMin));
      const mtoMaxMatch = filterMtoMax === '' || Object.values(row.cells).some(c => c.value <= parseFloat(filterMtoMax));
      return (
        row.Reference.toLowerCase().includes(filterReference.toLowerCase()) &&
        hasDate && colorMatch && mtoMinMatch && mtoMaxMatch
      );
    })
    .sort(([, a], [, b]) => a.Reference.localeCompare(b.Reference));

  return (
    <Container>
      <FilterBar>
        <Input placeholder="Filtrar por Reference" value={filterReference} onChange={e => setFilterReference(e.target.value)} />
        <Input placeholder="MTO Min" type="number" value={filterMtoMin} onChange={e => setFilterMtoMin(e.target.value)} />
        <Input placeholder="MTO Max" type="number" value={filterMtoMax} onChange={e => setFilterMtoMax(e.target.value)} />
        <Select value={filterColor} onChange={e => setFilterColor(e.target.value)}>
          <option value="">Color</option>
          <option value="#f44336">Rojo</option>
          <option value="#ffeb3b">Amarillo</option>
          <option value="#4caf50">Verde</option>
          <option value="#2196f3">Azul</option>
          <option value="#000000">Negro</option>
        </Select>
        <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
      </FilterBar>

      <Table>
        <thead>
          <tr>
            <Th>CenterCode</Th>
            <Th>Reference</Th>
            {dates.map(date => (
              <Th key={date} onClick={() => handleDateClick(date)}>{date}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredGrouped.map(([key, row]) => (
            <tr key={key}>
              <FixedColumn left="0">{row.CenterCode}</FixedColumn>
              <FixedColumn left="120px">{row.Reference}</FixedColumn>
              {dates.map(date => (
                <Td
                  key={date}
                  bgColor={row.cells[date]?.bgColor}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => {
                    const value = parseFloat(e.target.innerText) || 0;
                    handleEdit(key, date, value);
                  }}
                >
                  {row.cells[date]?.value || 0}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedDate && <ColumnSummary grouped={grouped} date={selectedDate} />}
    </Container>
  );
};

export default CalendarGrid;
