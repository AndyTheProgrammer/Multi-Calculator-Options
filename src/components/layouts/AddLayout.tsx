import React from 'react'
import { Box, Grid } from '@mui/material'
import SpecifiedSearchForm from '../forms/SpecifiedSearchForm'
import { SingleSlider } from '../slider/SingleSlider'
import { NavBar2 } from '../navbar/navbar2'
import { AddSlider } from '../slider/AddSlider'
import ResponsiveSlider from '../slider/ResponsiveSlider'

export default function AddLayout({children}:any){
    return(
        <>
            <Box className="container"> 
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ border:'0px solid red', width: '100%' }}>
                        <Box sx={{minHeight: 350}}>
                            {children}
                        </Box>
                    </Box>
                    <Box sx={{ 
                        border:'none', 
                        width:{
                                lg: 250,
                                md: '100%',
                                sm: '100%',
                                xs: '100%'
                            } ,
                            display: {
                                lg: 'flex',
                                md: 'none',
                                sm: 'none',
                                xs: 'none'
                            }
                        }}>
                        <Box >
                            <Box sx={{
                                    border: 'none',
                                    borderWidth: 1,
                                    borderColor: 'green',
                                    width: {
                                        lg: 250,
                                        md: '100%',
                                        sm: '100%',
                                        xs: '100%' 
                                    },
                                    justifyContent: 'center' ,
                                   
                                }}>
                                <SingleSlider/>
                            </Box>
                            <Box sx={{ 
                                    display: {
                                        lg: 'block',
                                        md: 'none',
                                        sm: 'none',
                                        xs: 'none'
                                    }
                                }}>
                                <SpecifiedSearchForm/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ResponsiveSlider/>
        </>
    )
}