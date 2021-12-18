import React, { useState, useEffect, useRef } from 'react'// requires a loader
import Slider from "react-slick"
import addimage from '../../common/assets/add_image.svg'
import { Button, Paper, Box } from '@mui/material'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
            width: 100,
            height: 100,
            display: "block", 
            background: "transparent",
            backgroundColor: 'green' 
        }}
        onClick={onClick}
      />
    );
}

class AddSlider extends React.Component {
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // nextArrow: <SampleNextArrow />,
      };
      return (
            <Slider className="container" {...settings}>
                <div>
                    <Box sx={{
                        width: "100%",
                        marginRight: 1,
                        display: 'flex',
                        justifyContent: 'start'
                    }}> <img style={{ width: "100%" }} src={addimage} alt="add"  /></Box>
                </div>
                <Box >
                    <Box sx={{
                        width: "100%",
                        marginRight: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}> <img style={{ width: "100%" }} src={addimage} alt="add"  /> </Box>
                </Box>
                <div>
                <Box sx={{
                        width: "100%",
                        marginRight: 1,
                        textAlign: 'end',
                        display: 'flex',
                        justifyContent: 'end'
                    }}> <img style={{ width: "100%" }} src={addimage} alt="add" /> </Box>
                </div>
            </Slider>
      );
    }
  }

export { AddSlider }