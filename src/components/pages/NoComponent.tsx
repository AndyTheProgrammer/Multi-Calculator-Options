import React from 'react'
import { Box } from '@mui/material'
import AddLayout from '../layouts/AddLayout';
import { NavBar2 } from '../navbar/navbar2'

export default function NoComponent(){
    return(
        <>
        <NavBar2 pagename="Calculator Name"/>
        <AddLayout>
            <Box
                sx={{
                    width:'100%',
                    height: 300,
                    border: 'none',
                    paddingTop: 12, 
                    textAlign: 'center' }}> 
                    <h4>Calculator component to be added</h4>
            </Box>
        </AddLayout>
        </>
    );   
}
