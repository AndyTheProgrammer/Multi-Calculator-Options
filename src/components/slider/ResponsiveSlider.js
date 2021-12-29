import React from 'react'
import { AddSlider } from './AddSlider'
import { Box, Grid, Typography } from '@mui/material'
import iconLine from '../../common/assets/line.svg';
export default function ResponsiveSlider(){
    return(
        <Box 
            sx={{
                border: 'none',
                borderWidth: 1,
                borderColor: 'green',
                width: {
                    lg: 250,
                    md: '100%',
                    sm: '100%',
                    xs: '100%' 
                },
                height:{
                    lg: 200,
                    md: 150,
                    sm: 150,
                    xs: 150
                },
                position:{
                    md: 'fixed',
                    sm: 'fixed',
                    xs: 'fixed',
                },
                bottom:{
                    md: '-58px',
                    sm: '-58px',
                    xs: '-58px',
                },
                display:{
                    lg: 'none',
                    md: 'block',
                    sm: 'block',
                    xs: 'block'
                },
                justifyContent: 'center' 
            }}>
            <AddSlider/>
        </Box>
    );
}

export function ResponsiveSliderSmall(){
    return(
        <Box 
            sx={{
                border: 'none',
                borderWidth: 1,
                borderColor: 'green',
                width: {
                    lg: 250,
                    md: '100%',
                    sm: '100%',
                    xs: '100%' 
                },
                height:{
                    lg: 200,
                    md: 150,
                    sm: 150,
                    xs: 150
                },
                position:{
                    md: 'fixed',
                    sm: 'fixed',
                    xs: 'fixed',
                },
                bottom:{
                    md: '-58px',
                    sm: '-58px',
                    xs: '-58px',
                },
                display:{
                    lg: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block'
                },
                justifyContent: 'center' 
            }}>
            <AddSlider/>
        </Box>
    );
}

export function ResponsiveSliderHome(){
    return(
        <Box 
            sx={{
                border: 'none',
                borderWidth: 1,
                borderColor: 'green',
                width: {
                    lg: '100%',
                    md: '100%',
                    sm: '100%',
                    xs: '100%' 
                },
                height:{
                    lg: 200,
                    md: 150,
                    sm: 150,
                    xs: 150
                },
                position:{
                    lg: 'static',
                    md: 'static',
                    sm: 'fixed',
                    xs: 'fixed',
                },
                bottom:{
                    sm: '-58px',
                    xs: '-58px',
                },
                display:{
                    lg: 'block',
                    md: 'block',
                    sm: 'block',
                    xs: 'block'
                },
            }}>
            <Box className="container" item xs={12} md={12} 
                    sx={{
                        display:{
                            lg: 'flex',
                            md: 'flex',
                            sm: 'none',
                            xs: 'none',
                        }
                    }}>
                    <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                borderRadius: 3,
                                textAlign: 'center',
                                fontSize: 24,
                                color: '#8591B0',
                                // boxShadow: ' 0 8px 8px 0 rgba(0, 0, 0, 0.2)'
                            }}>
                        <Box>
                            <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
                        </Box>
                        <Typography>
                            <Box sx={{ fontSize: 16, marginLeft: 1, marginRight: 1, marginTop: 1 }}>
                                Advertisement
                            </Box>
                        </Typography>
                        <Box>
                            <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
                        </Box>
                    </Box>
                </Box>
            <AddSlider/>
        </Box>
    );
}