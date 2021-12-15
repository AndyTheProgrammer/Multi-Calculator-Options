import React from 'react'
import { Box, Grid } from '@mui/material'
import SpecifiedSearchForm from '../forms/SpecifiedSearchForm'
import { SingleSlider } from '../slider/SingleSlider'
import { NavBar2 } from '../navbar/navbar2'


export default function AddLayout({children}:any){
    return(
        <>
            <Box 
                sx={{
                    border: 0,
                    display: 'flex',
                    justifyContent: 'center'
                }} 
                className="container"> 
                <Grid sx={{borderColor: 'red', width: '100%'}} container rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={9} >
                        <Box sx={{minHeight: 350}}>
                            {children}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Box sx={{border: 0, borderColor: 'blue', width: 150, height:200 }}>
                            <SingleSlider/>
                        </Box>
                        <Box>
                            <SpecifiedSearchForm/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}