import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../Utils/images/logo.png';
import './style.css';

function Footer() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='footer'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <a href='/'>
                  <img src={logo} alt='logo' className='logo'/>
                  </a>
                </IconButton>
              </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="body2" style={{fontSize:'11px', fontWeight: 300}}>
          © 2023 Homly. All rights reserved
          </Typography>


          
          <Box sx={{ flexGrow: 1 }} />
       
          <Box className='iconFooter'>
            <a href='https://www.instagram.com/soha_eyad99/' target='_blank' style={{color:'white'}}> < InstagramIcon /> </a>
            <a href='https://web.whatsapp.com/' target='_blank' style={{color:'white'}}> <WhatsAppIcon /> </a>
            <a href='https://www.facebook.com/soha.eiad.58173/?locale=ar_AR' target='_blank' style={{color:'white'}}><FacebookIcon /></a>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Footer;