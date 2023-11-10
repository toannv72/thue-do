
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    
     <img src='https://png.pngitem.com/pimgs/s/255-2550608_how-to-create-a-helpful-and-better-404.png'alt='404'/>
      <p>Sorry, the page you are looking for might be in another castle.</p>
      <Link to={'/'}><Button variant="contained"> GO TO HOME</Button></Link>
    </div>
  );
};

export default NotFound;
