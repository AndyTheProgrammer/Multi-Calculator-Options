
import React, { useState, useEffect } from 'react';
import { NavBar } from '../navbar/navbar'
import { CalcOptions } from '../calculator/calcOptions'
import { Box, Typography, CircularProgress } from '@mui/material'
import { dataInit } from '../../services/dataInit'

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialize(){
      if(true){
        console.log("initialize")
        var data = await dataInit()
        if(data){
          setIsLoading(true)
        }
      }
      else{
        setIsLoading(true)
      }
    }
    // initialize()
  });

    if(!isLoading){
      return(
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ position: 'absolute', display: 'flex', left: '47%', top: '45%' }}>
            <CircularProgress />
          </Box>
        </Box>
      );
    }

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
