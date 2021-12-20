import React from 'react'
import { Box } from '@mui/material'
import AddLayout from '../layouts/AddLayout';

export default function NoComponent(){
    return(
        <AddLayout>
            <Box
                sx={{
                    width:'100%',
                    height: 300,
                    border: 1,
                    paddingTop: 12, 
                    textAlign: 'center' }}> 
                    <h4>Component being updated</h4>
            </Box>
        </AddLayout>
    );   
}
