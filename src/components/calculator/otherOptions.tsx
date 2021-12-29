import React, { useState } from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'
import { useHistory } from "react-router-dom";
import iconLine from '../../common/assets/line.svg';
import Slider from "react-slick";


import { Slide } from '../slider/slider'
import { ResponsiveSliderSmall }  from '../slider/ResponsiveSlider';


import { othersRoutes } from '../../routes/routes'
import convertion_calc_icon from '../../common/assets/others_icons/convertion_calc_icon.svg';
import fitness_calc_icon from '../../common/assets/others_icons/fitness_calc_icon.svg';
import health_calc_icon from '../../common/assets/others_icons/health_calc_icon.svg';
import measurement_calc_icon from '../../common/assets/others_icons/measurement_calc_icon.svg';
import tech_calc_icon from '../../common/assets/others_icons/tech_calc_icon.svg';
import time_calc_icon from '../../common/assets/others_icons/time_calc_icon.svg';
import transport_util_icon from '../../common/assets/others_icons/transport_util_icon.svg';

import {
    slider_box_content_wrapper_style,
    boxStyle,
    categoryHeaderShadow
} from '../../styling/SliderStyle'

import { CustomNextArrow } from '../custom/sliderArrows/CustomNextArrow';
import { CustomPrevArrow } from '../custom/sliderArrows/CustomPrevArrow';

import { mobileText } from '../../styling/textStyle';

var classNames = require('classnames');

const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    variableWidth: true,
    responsive:[
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
    ]
};

function OtherOptions(){
    const history = useHistory()

    return(
        <>
            <Box 
                sx={{ 
                    height: 300,
                    display:{
                        lg: 'flex',
                        md: 'flex',
                        sm: 'none',
                        xs: 'none'
                    },
                    justifyContent: 'center'
                }} className="container mt-4">

                <Box style={{ width: '100%', }} >
                    
                    <Slider  {...settings}>
                        <div style={{ width: '340px' }}>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Fitness Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[0].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{ width: '470px' }}>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Health Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[1].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%',
                                                    paddingBottom: 0.5,  fontSize: 16,paddingRight: 1 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{ width: '350px' }}>
                        
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Time and Date Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[2].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{ width: '350px' }}>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Technology Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[3].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{ width: '350px' }}>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Transport and Utilities Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[4].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>

                        <div style={{ width: '350px' }}>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Measurements Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[5].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div style={{ width: '350px' }}>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Unit Conversion Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller">
                                        {
                                            othersRoutes.subCategories[6].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" 
                                                onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        
                    </Slider>
                    <Box >
                        <Box sx={{ }}>
                            <Slide />
                        </Box>
                    </Box>
                    <Box >
                    </Box>
                </Box>
            </Box>
            <OptionsForSmallerScreens/>
        </>
    );
}

function OptionsForSmallerScreens(){
    const history = useHistory()
    const [categoryIndex, setCategoryIndex] = useState([
        {id: 0, show: true},
        {id: 1, show: false},
        {id: 2, show: false},
        {id: 3, show: false},
        {id: 4, show: false},
        {id: 5, show: false},
        {id: 6, show: false}
    ])

    const handleCategoryChange = (e:number)=>{
        
        const copyOfCategoryIndexData = categoryIndex;
        console.log(copyOfCategoryIndexData[0].id)
        for(var i = 0; i < copyOfCategoryIndexData.length; i++){
            if(copyOfCategoryIndexData[i].id === e){
                copyOfCategoryIndexData[i].show = !copyOfCategoryIndexData[i].show
            }
            else{
                copyOfCategoryIndexData[i].show = false
            }
        }
        setCategoryIndex([...copyOfCategoryIndexData])
    }
    return(
        <>
            {/* ********************************************** */}
            {/* ********************************************** */}
            {/* ********************************************** */}
            {/* ********************************************** */}

            {/* mobile */}
            <Box 
                className="container"
                sx={{
                    display:{
                        lg: 'none',
                        md: 'none',
                        sm: 'block',
                        xs: 'block',
                    }
                    
                }}>
                <Box sx={{ minWidth: 120 }} className="container">
                    <Box>
                        {/* {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[0].id) }}>
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Fitness Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[0].show,
                                                'reveal-text': categoryIndex[0].show
                                            })} >
                                            {
                                                (categoryIndex[0].id === 0)?
                                                othersRoutes.subCategories[0].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        } */}

                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[0].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={fitness_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Fitness Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[0].show,
                                                'reveal-text': categoryIndex[0].show
                                            })} >
                                            {
                                                (categoryIndex[0].id === 0)?
                                                othersRoutes.subCategories[0].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[1].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={health_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Health Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[1].show,
                                                'reveal-text': categoryIndex[1].show
                                            })} >
                                            {
                                                (categoryIndex[1].id === 1)?
                                                othersRoutes.subCategories[1].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[2].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={time_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Time and Date Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[2].show,
                                                'reveal-text': categoryIndex[2].show
                                            })} >
                                            {
                                                (categoryIndex[2].id === 2)?
                                                othersRoutes.subCategories[2].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[3].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={tech_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Technology Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[3].show,
                                                'reveal-text': categoryIndex[3].show
                                            })} >
                                            {
                                                (categoryIndex[3].id === 3)?
                                                othersRoutes.subCategories[3].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[4].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={transport_util_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Transport and Utilities Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[4].show,
                                                'reveal-text': categoryIndex[4].show
                                            })} >
                                            {
                                                (categoryIndex[4].id === 4)?
                                                othersRoutes.subCategories[4].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[5].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={measurement_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Measurements Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[5].show,
                                                'reveal-text': categoryIndex[5].show
                                            })} >
                                            {
                                                (categoryIndex[5].id === 5)?
                                                othersRoutes.subCategories[5].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[6].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={convertion_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Unit Conversion Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[6].show,
                                                'reveal-text': categoryIndex[6].show
                                            })} >
                                            {
                                                (categoryIndex[6].id === 6)?
                                                othersRoutes.subCategories[6].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        
                    </Box>
                </Box>
            </Box>
            <ResponsiveSliderSmall/>
        </>
    );
}
export { OtherOptions }