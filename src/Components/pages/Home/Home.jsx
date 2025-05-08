/**
 * @author Julian David Vera Godoy
 * @description Home page 
 * @date 2025-05-08
 */

//Librerias____
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
//Assets_____
import waicon from './assets/image.png'; // icon Wa solution
import SpaceScene from '../../atoms/SpaceScene/SpaceScene'; //componente 3D HOME PAGE
import AppStyles from './assets/AppStyles';// Estilos styled-components




function Home() {
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <AppStyles.SpaceBackground />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <SpaceScene />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <AppStyles.Logo src={waicon} alt="WA Logo" />
          <AppStyles.Title variant="h3" sx={{ mb: 1 }}>
            Bienvenido a la Prueba Técnica
          </AppStyles.Title>
          <AppStyles.Subtitle variant="h5">Senior Frontend — WA Solutions 🚀</AppStyles.Subtitle>
          <AppStyles.StyledButton variant="contained" component={Link} to="/about" sx={{ mt: 4 }}>
             INICIAR 
          </AppStyles.StyledButton>
        </Box>
      </Box>
    );
  }

  export default Home;