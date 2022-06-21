import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import Header from '../Header';

const HomeScreen: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Header />
      <Link to="/flats">
        <Button size="large" variant="contained" sx={{ mt: '124px' }}>
          Register
        </Button>
      </Link>
    </Box>
  );
};

export default HomeScreen;
