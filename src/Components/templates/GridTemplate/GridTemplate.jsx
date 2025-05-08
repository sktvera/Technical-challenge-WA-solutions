/**
 * @author Julian David Vera Godoy
 * @description Grid dinamica , donde permite al usuario interactuar y filtrar los diferentes tipos de datos y zonas
 * @date 2025-05-08
 */

//Librerias______
import React, { useState } from 'react';
import dayjs from 'dayjs';
import ColumnSummary from '../../organisms/ColumnSummary/ColumnSummary';
import GridTemplateStyles from './Assets/GridTemplateStyles';// Estilos styled-components
import { Snackbar, Alert } from '@mui/material';

import './Assets/GridTemplate.css'



//Determinar el color de la celda_______
const getBackgroundColor = (total, redZone, yellowZone, greenZone) => {
  if (total === 0) {
    return '#000000a2'; // Negro
  } else if (total >= 1 && total <= redZone) {
    return '#f44336a4'; // Rojo
  } else if (total > redZone && total <= redZone + yellowZone) {
    return '#ffeb3ba5'; // Amarillo
  } else if (total > redZone + yellowZone && total <= redZone + yellowZone + greenZone) {
    return '#4caf4f9b'; // Verde
  } else if (total > redZone + yellowZone + greenZone) {
    return '#2195f383'; // Azul
  } else {
    return '#5a5a5aa5'; // Blanco por defecto
  }
};



const GridTemplate = ({ data }) => {

    const [sortAsc, setSortAsc] = useState(true);
    const [visibleMonth, setVisibleMonth] = useState('');
  const [tableData, setTableData] = useState(data);
  const [selectedDate, setSelectedDate] = useState('');
  const [filterReference, setFilterReference] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterMtoMin, setFilterMtoMin] = useState('');
  const [filterMtoMax, setFilterMtoMax] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleSortOrder = () => {
    setSortAsc(prev => !prev);
  };

  const summaryRef = React.useRef(null); // Referencia al contenedor del resumen
  const scrollRef = React.useRef();

  const handleScroll = () => {
    if (!scrollRef.current) return;
  
    const ths = scrollRef.current.querySelectorAll('th');
  
    for (let th of ths) {
      const rect = th.getBoundingClientRect();
      const title = th.getAttribute('title');
      if (rect.left >= 140 && title) {
        const parsed = dayjs(title);
        if (parsed.isValid()) {
          const month = parsed.format('MMMM');
          setVisibleMonth(month);
          const monthIndex = parsed.month();
         
          break;
        }
      }
    }
  };

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

          console.log('NetFlow:',item.NetFlow)
          console.log('MakeToOrder:', newValue ||item.MakeToOrder )

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

// Alterna la selección o deselección de la columna al hacer clic
const handleDateClick = async (date) => {
  setSelectedDate((prevDate) => {
    const newDate = prevDate === date ? '' : date;

    // Mostrar la notificación solo cuando se activa el resultado
    if (newDate) {
      setNotificationOpen(true);
    }

    // Esperar un pequeño tiempo para garantizar el renderizado antes del scroll
    setTimeout(() => {
      if (newDate && summaryRef.current) {
        summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 300); // Ajuste del tiempo para garantizar la visibilidad

    return newDate;
  });
};

const handleCloseNotification = (event, reason) => {
  if (reason === 'clickaway') return;
  setNotificationOpen(false);
};


  const dateMatch = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const isAfterStart = !filterStartDate || dayjs(formattedDate).isSameOrAfter(dayjs(filterStartDate));
    const isBeforeEnd = !filterEndDate || dayjs(formattedDate).isSameOrBefore(dayjs(filterEndDate));
    return isAfterStart && isBeforeEnd;
  };
  
  // Filtrado de datos corregido para respetar el rango de MTO
  const filteredGrouped = Object.entries(grouped)
    .filter(([_, row]) => {
      const hasDate = !filterStartDate && !filterEndDate 
        ? true 
        : Object.keys(row.cells).some(date => dateMatch(date));
  
      const colorMatch = filterColor
        ? Object.values(row.cells).some(c => c.bgColor === filterColor)
        : true;
  
      // Filtrar por MTO Min y Max ajustado
      const mtoMinMatch = filterMtoMin === '' || Object.values(row.cells).some(c => parseFloat(c.value) >= parseFloat(filterMtoMin));
      const mtoMaxMatch = filterMtoMax === '' || Object.values(row.cells).some(c => parseFloat(c.value) <= parseFloat(filterMtoMax));
  
      return (
        row.Reference.toLowerCase().includes(filterReference.toLowerCase()) &&
        hasDate && colorMatch && mtoMinMatch && mtoMaxMatch
      );
    })
    // Ordenar alfabéticamente por referencia
    .sort(([, a], [, b]) => {
      const compare = a.Reference.localeCompare(b.Reference);
      return sortAsc ? compare : -compare;
    });

  return (
    <GridTemplateStyles.Container >
      

     {/*  FILTROS GRID DATA TABLE____________ */}
    <GridTemplateStyles.FixedMenu>
        <GridTemplateStyles.FilterWrapper>
            <GridTemplateStyles.Input 
            placeholder="Filtrar por Reference" 
            value={filterReference} 
            onChange={e => setFilterReference(e.target.value)} 
            />
           {/*  <GridTemplateStyles.Input 
            placeholder="MTO Min" 
            type="number" 
            value={filterMtoMin} 
            onChange={e => setFilterMtoMin(e.target.value)} 
            />
            <GridTemplateStyles.Input 
            placeholder="MTO Max" 
            type="number" 
            value={filterMtoMax} 
            onChange={e => setFilterMtoMax(e.target.value)} 
            /> */}
            <GridTemplateStyles.Select 
            value={filterColor} 
            onChange={e => setFilterColor(e.target.value)}
            >
            <option value="">Color</option>
            <option value="#f44336a4">Rojo</option>
            <option value="#ffeb3ba5">Amarillo</option>
            <option value="#4caf4f9b">Verde</option>
            <option value="#2195f383">Azul</option>
            <option value="#000000a2">Negro</option>
            </GridTemplateStyles.Select>

        {
          visibleMonth && (
          <GridTemplateStyles.MonthBanner >
          {visibleMonth}
          <span className="rocket">🚀</span>
          </GridTemplateStyles.MonthBanner>
          )
        }

{/* <GridTemplateStyles.Input
  type="date"
  placeholder="Desde"
  value={filterStartDate}
  onChange={e => setFilterStartDate(e.target.value)}
/>
<GridTemplateStyles.Input
  type="date"
  placeholder="Hasta"
  value={filterEndDate}
  onChange={e => setFilterEndDate(e.target.value)}
/> */}
        
                </GridTemplateStyles.FilterWrapper>
    </GridTemplateStyles.FixedMenu>


{/* Tabla data grid_______ */}

<GridTemplateStyles.TableWrapper ref={scrollRef} onScroll={handleScroll}>
<GridTemplateStyles.Table>

  <thead>
      <tr>
          <GridTemplateStyles.StickyThLeft left="0">CenterCode</GridTemplateStyles.StickyThLeft>
          <GridTemplateStyles.StickyThLeft
          left="110px"
           onClick={toggleSortOrder}
          >
             Reference {sortAsc ? '▲' : '▼'}
          </GridTemplateStyles.StickyThLeft>
          {
            dates.map((date, index) => {
            const fullDate = dayjs(date).format('YYYY-MM-DD');
            const shortDate = dayjs(date).format('DD/MM');
            const isSelected = selectedDate === date;

                return (
                <GridTemplateStyles.Th
                key={date}
                title={fullDate}
                onClick={() => handleDateClick(date)}
                className={`col-${index} ${isSelected ? 'selected-column' : ''}`}
                >
                {shortDate}
                </GridTemplateStyles.Th>
                );
            })
          }
      </tr>
  </thead>


<tbody>
    {filteredGrouped.map(([key, row]) => (
        <tr key={key}>
            <GridTemplateStyles.FixedColumn left="0">{row.CenterCode}</GridTemplateStyles.FixedColumn>
            <GridTemplateStyles.FixedColumn left="110px">{row.Reference}</GridTemplateStyles.FixedColumn>
            {dates.map((date, index) => {
        const cell = row.cells[date];
        const isSelected = selectedDate === date;
        
        // Verificar si el filtro de color está activo y si la celda coincide
        if (filterColor && cell?.bgColor !== filterColor) return null;
                    return (
                        <GridTemplateStyles.Td
                            key={date}
                            bgColor={row.cells[date]?.bgColor}
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={e => {
                            // Obtener el valor ingresado_____
                            const inputValue = e.target.innerText;

                            // Verificar si el valor es un número válido (positivo o negativo)_____
                            const value = /^-?\d+(\.\d+)?$/.test(inputValue) ? parseFloat(inputValue) : 0;

                            // Llamar a la función de edición solo si es un número válido_____
                            if (!isNaN(value)) {
                            handleEdit(key, date, value);
                            } else {
                            // Restaurar el valor anterior si el nuevo no es válido_____
                            e.target.innerText = row.cells[date]?.value || 0;
                            }
                            }}
                            className={`col-${index} ${isSelected ? 'selected-column' : ''}`}
                        >
                            {row.cells[date]?.value || 0}
                        </GridTemplateStyles.Td>
                    );
                })}
        </tr>
    ))}
</tbody>

</GridTemplateStyles.Table>
</GridTemplateStyles.TableWrapper>


{/* RESULTADO CONSOLIDADO DEL DATA GRID______________________ */}
<div ref={summaryRef}>
    {/* Tu componente principal aquí */}
    {selectedDate && <ColumnSummary grouped={grouped} date={selectedDate} />}

    {/* Snackbar de Material-UI */}
    <Snackbar
      open={notificationOpen}
      autoHideDuration={3000}
      onClose={handleCloseNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
        Resultado Activo
      </Alert>
    </Snackbar>
  </div>
    </GridTemplateStyles.Container>
  );
};

export default GridTemplate;









