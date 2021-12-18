import React from 'react'
import { Box, Grid } from '@mui/material'
import SpecifiedSearchForm from '../forms/SpecifiedSearchForm'
import { SingleSlider } from '../slider/SingleSlider'
import { NavBar2 } from '../navbar/navbar2'


export default function AddLayout({children}:any){
    return(
        <>
            {/* <Box 
                className="container"> 
                <Grid sx={{borderColor: 'red', width: '100%'}} container rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={9} >
                        <Box sx={{minHeight: 350}}>
                            {children}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Box sx={{ border:'solid' }}>
                            <Box sx={{border: 0, borderColor: 'blue', width: 150, height:200 }}>
                                <SingleSlider/>
                            </Box>
                            <Box>
                                <SpecifiedSearchForm/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box> */}
            <Box className="container"> 
                <Box sx={{ display: 'flex'}}>
                    <Box sx={{ border:'none', width: '100%' }}>
                        <Box sx={{minHeight: 350}}>
                            {children}
                        </Box>
                    </Box>
                    <Box sx={{ border:'none', width: 250 }}>
                        <Box >
                            <Box sx={{
                                    border: 'none',
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    width: 150, 
                                    height:200,
                                    display: 'flex',
                                    justifyContent: 'center' 
                                }}>
                                <SingleSlider/>
                            </Box>
                            <Box>
                                <SpecifiedSearchForm/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}