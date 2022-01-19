
import React, { useState, useEffect } from 'react';
import { NavBar } from '../navbar/navbar'
import { CalculatorMenu } from '../calculator/CaculatorMenu'
import { Box, Typography, CircularProgress } from '@mui/material'
import { dataInit } from '../../services/dataInit'

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <NavBar />
      <CalculatorMenu />
    </div>
  );
}

export { HomePage };
