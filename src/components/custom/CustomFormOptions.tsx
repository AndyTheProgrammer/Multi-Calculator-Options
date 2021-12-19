import React, { useRef, useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'

export default function CustomFormOptions(props:any){
    return( 
        <Box sx={{
          display: 'flex',
        }}>
          <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box>
          <select 
          style={{
            width:'100%',
            backgroundColor:'#F0F3F6',
            border: 'none',
            borderColor: 'red',
            borderRadius: 7,
            outline: 'none',
            color:'black' 
          }}
          {...props} >
            <option value="Kilogram">Kilogram</option>
          </select>
        </Box>
    );
}
