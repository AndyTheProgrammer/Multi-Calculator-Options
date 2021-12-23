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
var classNames = require('classnames');

const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
                        <div>
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
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Conversion Calculatorss
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller" sx={{ paddingLeft: 2 }}>
                                        {
                                            othersRoutes.subCategories[5].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={fitness_calc_icon} />
                                        </Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Fitness Calculators
                                            </Box>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div>
                        <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={health_calc_icon} />
                                        </Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Health Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={time_calc_icon} />
                                        </Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Time and Date Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={tech_calc_icon} />
                                        </Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Technology Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={transport_util_icon} />
                                        </Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Transport and Utilities Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ 
                                ...slider_box_content_wrapper_style
                            }}>
                                <Box sx={{...boxStyle }}>
                                    <Box 
                                        sx={{ 
                                            ...categoryHeaderShadow
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={measurement_calc_icon} />
                                        </Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 240,
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                    Measurements Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </Slider>
                    <Box >
                        <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    p: 1,
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
                            <p style={{ marginLeft: 30, marginRight: 30 }}>Advertisement</p>
                            <Box>
                                <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
                            </Box>
                        </Box>
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
        {id: 0, show: false},
        {id: 1, show: false},
        {id: 2, show: false},
        {id: 3, show: false},
        {id: 4, show: false},
        {id: 5, show: true},
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
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[5].id) }}>
                                    
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
                                                        Conversion Calculatorss
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
                                                        width: '100%', 
                                                        paddingBottom: 0.5,  
                                                        fontSize: 18,  
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
                                            'hidden-text': !categoryIndex[1].show,
                                            'reveal-text': categoryIndex[1].show
                                        })} >
                                            
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
                                            'hidden-text': !categoryIndex[2].show,
                                            'reveal-text': categoryIndex[2].show
                                        })} >
                                    
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
                                            'hidden-text': !categoryIndex[3].show,
                                            'reveal-text': categoryIndex[3].show
                                        })} >
                                      
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
                                            'hidden-text': !categoryIndex[4].show,
                                            'reveal-text': categoryIndex[4].show
                                        })} >
                                           
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