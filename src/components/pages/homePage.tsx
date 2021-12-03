import React, { useState, useEffect } from 'react';
import { NavBar } from '../navbar/navbar'
import { CalcOptions } from '../calculator/calcOptions'
import { Box, Typography, CircularProgress } from '@mui/material'
import { dataInit } from '../../services/dataInit'

// async function initialize(){
//   console.log("initialize")
//   const data = await dataInit()
//   return data
// }

// if(!localStorage.webdata){
//   initialize()
// }

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function initialize() {
      // if(!localStorage.webdata){
      //   console.log("initialize")
      //   var data = await dataInit()
      //   if(data){
      //     setIsLoading(true)
      //   }
      // }
      if (true) {
        console.log("initialize")
        var data = await dataInit()
        if (data) {
          setIsLoading(true)
        }
      }
      else {
        setIsLoading(true)
        // console.log("When localstorage has data")
        // console.log(JSON.parse(localStorage.webdata))
      }
    }

    initialize()
  }, []);

  if (!isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ position: 'absolute', display: 'flex', left: '47%', top: '45%' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <NavBar />
      <Typography component="div">
        <Box
          sx={{
            textAlign: 'center',
            fontSize: 28,
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
