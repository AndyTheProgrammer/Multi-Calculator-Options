import React, { useState, useEffect, useRef } from 'react'// requires a loader
import Slider from "react-slick"
import addimage from '../../common/assets/add_image.svg'
import { Button, Paper, Box, Typography } from '@mui/material'
import add_4 from '../../common/assets/add_4.svg';
import next_arrow_1 from '../../common/assets/next_arrow_1.svg';
import prev_arrow_1 from '../../common/assets/prev_arrow_1.svg';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ 
            position: 'absolute',
            top: '25%',
            right: 0,
            display: "block", 
            height: 70,
            background: "none",
            width: 50
        }}
        onClick={onClick}
      >
          <img style={{ width: '100%', height:'100%' }} src={next_arrow_1} alt="add"  />
      </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ 
            position: 'absolute',
            top: '25%',
            left: 0,
            display: "block", 
            height: 70,
            background: "none",
            width: 50
        }}
        onClick={onClick}
      >
          <img style={{ width: '100%', height:'100%' }} src={prev_arrow_1} alt="add"  />
      </div>
    );
}

const boxstyle = {
    height: '100%',
    width: '100%',
    border:'0px solid black',
    display: 'flex',
    justifyContent: 'center'
}

const imagecontainer ={
    border:'0px solid red',
    width: "100%",
    height:"100%",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fit',
    justifyContent: 'start',
    // backgroundImage: `linear-gradient(to right, #3128af, #499fb8)`,
}

const imagestyle={
    border:'0px solid black',
    height: '140px', 
    width:'100%',
    objectFit: 'contain'
}

class AddSlider extends React.Component {
    render() {
      const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };
      return (
            <Slider style={{ maxHeight:'150px'}} className="container add-slider-height" {...settings}>
                <div>
                    <Box sx={{
                        ...imagecontainer
                    }}> 
                        <Box sx={{
                            ...boxstyle
                            }}> <img 
                                style={{ 
                                         ...imagestyle
                                    }} src={add_4} alt="add"  /> </Box>
                    </Box>
                </div>
                <Box sx={{
                        ...imagecontainer
                    }}> 
                        <Box sx={{
                            ...boxstyle
                            }}> <img 
                                style={{ 
                                    ...imagestyle
                                    }} src={add_4} alt="add"  /> </Box>
                    </Box>
                <div>
                <Box sx={{
                        ...imagecontainer
                    }}> 
                        <Box sx={{
                            ...boxstyle
                            }}> <img 
                                style={{ 
                                    ...imagestyle
                                    }} src={add_4} alt="add"  /> </Box>
                    </Box>
                </div>
            </Slider>
      );
    }
  }

export { AddSlider }