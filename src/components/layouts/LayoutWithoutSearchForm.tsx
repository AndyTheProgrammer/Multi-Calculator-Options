import React from 'react'
import { Box, Grid } from '@mui/material'
import SpecifiedSearchForm from '../forms/SpecifiedSearchForm'
import { SingleSlider } from '../slider/SingleSlider'
import { NavBar2 } from '../navbar/navbar2'
import ResponsiveSlider from '../slider/ResponsiveSlider'

export default function LayoutWithoutSearchForm({children}:any){
    return(
        <>
            <Box className="container"> 
                <Box sx={{ display: {
                            lg: 'flex',
                            md: 'flex',
                            sm: 'flex',
                            xs: 'block'
                    }}}>
                    <Box sx={{ border:'none', width: '100%' }}>
                        <Box sx={{minHeight: 350}}>
                            {children}
                        </Box>
                    </Box>
                    <Box sx={{ 
                            border:'none', 
                            width: 250,
                            display: {
                                lg: 'block',
                                md: 'none',
                                sm: 'none',
                                xs: 'none'
                            } 
                        }}>
                        <Box >
                            <Box sx={{
                                    border: 'none',
                                    borderWidth: 1,
                                    borderColor: 'red', 
                                    height:200,
                                    justifyContent: 'center',
                                    width:{
                                        lg: 250,
                                        md: 250,
                                        sm: 250,
                                        xs: '100%'
                                    } ,
                                    display: 'flex'
                                }}>
                                <SingleSlider/>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <ResponsiveSlider/>
        </>
    )
}