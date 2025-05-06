import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TablePagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import dayjs from 'dayjs';

const getBackgroundColor = (netFlow, makeToOrder, redZone, yellowZone, greenZone) => {
    const total = netFlow + makeToOrder;
  
    if (total === 0) {
      return '#000000'; // Negro
    } else if (total >= 1 && total <= redZone) {
      return '#f44336'; // Rojo
    } else if (total > redZone && total <= redZone + yellowZone) {
      return '#ffeb3b'; // Amarillo
    } else if (total > redZone + yellowZone && total <= redZone + yellowZone + greenZone) {
      return '#4caf50'; // Verde
    } else if (total > redZone + yellowZone + greenZone) {
      return '#2196f3'; // Azul
    } else {
      return '#ffffff'; // Blanco por defecto
    }
  };








  const getZone = (netFlow, makeToOrder, redZone, yellowZone, greenZone) => {
    const total = netFlow + makeToOrder;
  

    if (total === 0){
        return 'Negro'
    } else if (total >= 1 && total <= redZone) {
        return 'Rojo';
    } else if (total > redZone && total <= redZone + yellowZone) {
        return 'Amarillo';
    } else if (total > redZone + yellowZone && total <= redZone + yellowZone + greenZone) {

        return 'Verde';
    } else if (total > redZone + yellowZone + greenZone) {
        return 'Azul';
    }else{

        return '#ffffff'; // Blanco por defecto
    }
  };










/*   ● Rojo: Si `1 <= (NetFlow + MakeToOrder) <= RedZone`.
  ● Amarillo: Si `RedZone < (NetFlow + MakeToOrder) <= RedZone +
  YellowZone`.
  ● Verde: Si `RedZone + YellowZone < (NetFlow + MakeToOrder) <=
  RedZone + YellowZone + GreenZone`.
  ● Negro: Si `(NetFlow + MakeToOrder) == 0`.
  ● Azul: Si `(NetFlow + MakeToOrder) > RedZone + YellowZone +
  GreenZone`.
 */

/*   Ejemplo:
  Si `NetFlow = 100`, `MakeToOrder = 23`, `RedZone = 50`, `YellowZone = 55`,
  `GreenZone = 55`, el color de la celda es verde. */




const GridTemplate = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [filterMakeToOrderMin, setFilterMakeToOrderMin] = useState('');
const [filterMakeToOrderMax, setFilterMakeToOrderMax] = useState('');

  // Filtros
  const [filterCenter, setFilterCenter] = useState('');
  const [filterReference, setFilterReference] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterNetFlowMin, setFilterNetFlowMin] = useState('');
  const [filterNetFlowMax, setFilterNetFlowMax] = useState('');
  const [filterZone, setFilterZone] = useState('');

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleInputChange = (index, value) => {
    const updated = [...filteredData];
    updated[index].MakeToOrder = parseFloat(value) || 0;
    setTableData(prev =>
      prev.map((item, idx) =>
        item.Reference === updated[index].Reference &&
        item.VisibleForecastedDate === updated[index].VisibleForecastedDate
          ? { ...item, MakeToOrder: updated[index].MakeToOrder }
          : item
      )
    );
  };

  const uniqueCenters = [...new Set(data.map(d => d.CenterCode))];
  const uniqueReferences = [...new Set(data.map(d => d.Reference))];

  const filteredData = tableData.filter(row => {
    const date = dayjs(row.VisibleForecastedDate).format('YYYY-MM-DD');
    const total = row.NetFlow + row.MakeToOrder;
    const zone = getZone(row.NetFlow, row.MakeToOrder, row.RedZone, row.YellowZone, row.GreenZone);
  
    return (
      (!filterCenter || row.CenterCode === filterCenter) &&
      (!filterReference || row.Reference === filterReference) &&
      (!filterDate || date === filterDate) &&
      (!filterStartDate || date >= filterStartDate) &&
      (!filterEndDate || date <= filterEndDate) &&
      (!filterNetFlowMin || row.NetFlow >= parseFloat(filterNetFlowMin)) &&
      (!filterNetFlowMax || row.NetFlow <= parseFloat(filterNetFlowMax)) &&
      (!filterZone || zone === filterZone) &&
      (!filterMakeToOrderMin || row.MakeToOrder >= parseFloat(filterMakeToOrderMin)) &&
      (!filterMakeToOrderMax || row.MakeToOrder <= parseFloat(filterMakeToOrderMax))
    );
  });

  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);



  

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom align="center">
        Tabla de Productos por Fecha
      </Typography>

      {/* Filtros */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>CenterCode</InputLabel>
            <Select value={filterCenter} onChange={e => setFilterCenter(e.target.value)} label="CenterCode">
              <MenuItem value="">Todos</MenuItem>
              {uniqueCenters.map(center => (
                <MenuItem key={center} value={center}>{center}</MenuItem>
              ))}
            </Select>
          </FormControl>



          <TextField
    label="MTO Min"
    type="number"
    value={filterMakeToOrderMin}
    onChange={e => setFilterMakeToOrderMin(e.target.value)}
    fullWidth
  />
</Grid>

<Grid item xs={6} sm={1}>
  <TextField
    label="MTO Max"
    type="number"
    value={filterMakeToOrderMax}
    onChange={e => setFilterMakeToOrderMax(e.target.value)}
    fullWidth
  />
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Reference</InputLabel>
            <Select value={filterReference} onChange={e => setFilterReference(e.target.value)} label="Reference">
              <MenuItem value="">Todos</MenuItem>
              {uniqueReferences.map(ref => (
                <MenuItem key={ref} value={ref}>{ref}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <TextField
            type="date"
            label="Fecha específica"
            InputLabelProps={{ shrink: true }}
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <TextField
            type="date"
            label="Desde"
            InputLabelProps={{ shrink: true }}
            value={filterStartDate}
            onChange={e => setFilterStartDate(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <TextField
            type="date"
            label="Hasta"
            InputLabelProps={{ shrink: true }}
            value={filterEndDate}
            onChange={e => setFilterEndDate(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={1}>
          <TextField
            label="NetFlow Min"
            type="number"
            value={filterNetFlowMin}
            onChange={e => setFilterNetFlowMin(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={1}>
          <TextField
            label="NetFlow Max"
            type="number"
            value={filterNetFlowMax}
            onChange={e => setFilterNetFlowMax(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Zona</InputLabel>
            <Select value={filterZone} onChange={e => setFilterZone(e.target.value)} label="Zona">
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="Rojo">Rojo</MenuItem>
              <MenuItem value="Amarillo">Amarillo</MenuItem>
              <MenuItem value="Verde">Verde</MenuItem>
              <MenuItem value="Azul">Azul</MenuItem>
              <MenuItem value="Negro">Negro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>CenterCode</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="center">MakeToOrder</TableCell>
              <TableCell align="center">NetFlow</TableCell>
              <TableCell align="center">Zona</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              const total = row.NetFlow + row.MakeToOrder;
              const bgColor = getBackgroundColor(
                row.NetFlow,
                row.MakeToOrder,
                row.RedZone,
                row.YellowZone,
                row.GreenZone
              );

              const zone = getZone(row.NetFlow, row.MakeToOrder, row.RedZone, row.YellowZone, row.GreenZone);

              return (
                <TableRow key={index}>
                  <TableCell>{row.CenterCode}</TableCell>
                  <TableCell>{row.Reference}</TableCell>
                  <TableCell>{row.VisibleForecastedDate.split('T')[0]}</TableCell>
                  <TableCell align="center" sx={{ backgroundColor: bgColor }}>
                    <TextField
                      value={row.MakeToOrder}
                      variant="standard"
                      onChange={e => handleInputChange(index + page * rowsPerPage, e.target.value)}
                      inputProps={{ style: { textAlign: 'center', color: '#fff' } }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.NetFlow}</TableCell>
                  <TableCell align="center">{zone}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </Box>
  );
};

export default GridTemplate;








