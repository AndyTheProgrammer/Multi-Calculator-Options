import React from 'react'
import { Box } from '@mui/material'
export default function NoComponent(){
    return(
        <Box
        sx={{
            width:'100%',
            height: 300,
            border: 1,
            paddingTop: 12, 
            textAlign: 'center' }}> 
            <h4>Component will be added</h4>
        </Box>
    );   
}
