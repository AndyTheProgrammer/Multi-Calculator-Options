import React from 'react'
import { Box, Grid } from '@mui/material'
import SpecifiedSearchForm from '../forms/SpecifiedSearchForm'
import { SingleSlider } from '../slider/SingleSlider'
import { NavBar2 } from '../navbar/navbar2'


export default function LayoutWithoutSearchForm({children}:any){
    return(
        <>
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
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}