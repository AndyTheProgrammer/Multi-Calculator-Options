
import React, { useState, useEffect } from 'react';
import { NavBar } from '../navbar/navbar'
import { CalcOptions } from '../calculator/calcOptions'
import { Box, Typography, CircularProgress } from '@mui/material'
import { dataInit } from '../../services/dataInit'

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
    return(
      <div>
        <NavBar />
        <Typography component="div">
          <Box
            sx={{
              textAlign: 'center',
              fontSize: 28,
              fontWeight: 100,
              color: '#8591B0',
              marginBottom: 3,
            }}>
            Calculator Categories
          </Box>
        </Typography>
        <CalcOptions />
      </div>
    );
}

export { HomePage };
