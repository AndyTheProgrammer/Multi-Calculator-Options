

import React, {useState} from 'react'
import { Grid, Typography, Box, Container, Link } from '@mui/material'
import { useHistory } from "react-router-dom";
import iconLine from '../../common/assets/line.svg';
import Slider from "react-slick";
import { mathRoutes } from '../../routes/routes_new'
import { Slide } from '../slider/slider'
import { ResponsiveSliderSmall } from '../slider/ResponsiveSlider';
import general_math from '../../common/assets/general_math.svg';
import algebra_icon from '../../common/assets/algebra_icon.svg';
import stats from '../../common/assets/stats_icon.svg';
import geometry_icon from '../../common/assets/geometry_icon.svg';
import {
    slider_box_content_wrapper_style,
    boxStyle,
    categoryHeaderShadow
} from '../../styling/SliderStyle';

import { CustomNextArrow } from '../custom/sliderArrows/CustomNextArrow';
import { CustomPrevArrow } from '../custom/sliderArrows/CustomPrevArrow';
import { mobileText } from '../../styling/textStyle'
import fractions from '../../common/assets/fractions_icon.svg';

import AddLayout2 from '../layouts/AddLayout2'

var classNames = require('classnames');

const linktexts = {
    width: '100%', 
    paddingBottom: 0.5,  
    fontSize: 16, 
    color: '#8591B0',
    // textAlign:'right'
}
function MathMenu(){
    const history = useHistory()

    return(
        <Box sx={{ width:'100%'}} >
            <Grid container sx={{ width:'100%' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <div style={{ width: '300px' }}>
                        <Box sx={{
                            ...slider_box_content_wrapper_style
                        }}>
                            <Box sx={{...boxStyle }}>
                                <Box 
                                    sx={{ 
                                        ...categoryHeaderShadow
                                    }}>
                                    <Box sx={{ height: 30, }}>
                                        <img style={{ height: '100%', }} alt="icon" src={general_math} />
                                    </Box>
                                    <Typography sx={{width: '100%'}}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                paddingRight: 3,
                                                paddingLeft: 0.5,
                                                paddingTop: 0.5,
                                                fontSize: 16,
                                            }}>
                                                General Calculators
                                        </Box>
                                    </Typography>
                                    
                                </Box>
                                <Box className="general-text-box app-scroller" >
                                    {
                                        mathRoutes.subCategories[0].sub_calculator.map((r:any) => {
                                            
                                            return (
                                                <Typography key={r.name}>
                                                    <Link 
                                                    className="div-link" 
                                                    onClick={()=>{
                                                        history.push(r.path)
                                                    }} 
                                                    component="button"
                                                    sx={{ 
                                                            ...linktexts,
                                                            textAlign:'left'
                                                        }}> {r.name}</Link>
                                                </Typography> 
                                            );
                                        })
                                    }
                                    
                                  
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <div style={{ width: '300px' }}>
                        <Box sx={{
                            ...slider_box_content_wrapper_style
                        }}>
                            <Box sx={{...boxStyle }}>
                                <Box 
                                    sx={{ 
                                        ...categoryHeaderShadow
                                    }}>
                                    <Box sx={{ height: 30, }}>
                                        <img style={{ height: '100%', }} alt="icon" src={algebra_icon} />
                                    </Box>
                                    <Typography sx={{width: '100%'}}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                paddingRight: 3,
                                                paddingLeft: 0.5,
                                                paddingTop: 0.5,
                                                fontSize: 16,
                                            }}>
                                                Algebra Calculators
                                        </Box>
                                    </Typography>
                                    
                                </Box>
                                <Box className="general-text-box app-scroller" >
                                    {
                                        mathRoutes.subCategories[1].sub_calculator.map((r:any) => {
                                            
                                            return (
                                                <Typography key={r.name}>
                                                    <Link 
                                                    className="div-link" 
                                                    onClick={()=>{
                                                        history.push(r.path)
                                                    }} 
                                                    component="button"
                                                    sx={{ 
                                                            ...linktexts,
                                                            textAlign:'left'
                                                        }}> {r.name}</Link>
                                                </Typography> 
                                            );
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <div style={{ width: '300px' }}>
                        <Box sx={{
                            ...slider_box_content_wrapper_style
                        }}>
                            <Box sx={{...boxStyle }}>
                                <Box 
                                    sx={{ 
                                        ...categoryHeaderShadow
                                    }}>
                                    <Box sx={{ height: 30, }}>
                                        <img style={{ height: '100%', }} alt="icon" src={stats} />
                                    </Box>
                                    <Typography sx={{width: '100%'}}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                paddingRight: 3,
                                                paddingLeft: 0.5,
                                                paddingTop: 0.5,
                                                fontSize: 16,
                                            }}>
                                                Statistics Calculators
                                        </Box>
                                    </Typography>
                                    
                                </Box>
                                <Box 
                                    className="general-text-box app-scroller" 
                                    >
                                    {
                                        mathRoutes.subCategories[2].sub_calculator.map((r:any) => {
                                            
                                            return (
                                                <Typography key={r.name}>
                                                    <Link 
                                                    className="div-link" 
                                                    onClick={()=>{
                                                        history.push(r.path)
                                                    }} 
                                                    component="button"
                                                    sx={{ 
                                                            ...linktexts,
                                                            textAlign:'left'
                                                        }}> {r.name}</Link>
                                                </Typography> 
                                            );
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <div style={{ width: '300px' }}>
                        <Box sx={{
                            ...slider_box_content_wrapper_style
                        }}>
                            <Box sx={{...boxStyle }}>
                                <Box 
                                    sx={{ 
                                        ...categoryHeaderShadow
                                    }}>
                                    <Box sx={{ height: 30, }}>
                                        <img style={{ height: '100%', }} alt="icon" src={geometry_icon} />
                                    </Box>
                                    <Typography sx={{width: '100%'}}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                paddingRight: 3,
                                                paddingLeft: 0.5,
                                                paddingTop: 0.5,
                                                fontSize: 16,
                                            }}>
                                                Geometry Calculators
                                        </Box>
                                    </Typography>
                                    
                                </Box>
                                <Box className="general-text-box app-scroller" >
                                    {
                                        mathRoutes.subCategories[3].sub_calculator.map((r:any) => {
                                            
                                            return (
                                                <Typography key={r.name}>
                                                    <Link 
                                                    className="div-link" 
                                                    onClick={()=>{
                                                        history.push(r.path)
                                                    }} 
                                                    component="button"
                                                    sx={{ 
                                                            ...linktexts,
                                                            textAlign:'left'
                                                        }}> {r.name}</Link>
                                                </Typography> 
                                            );
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export { MathMenu }