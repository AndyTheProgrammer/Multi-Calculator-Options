import React, { useState, useEffect, useRef } from 'react'// requires a loader
import Slider from "react-slick"
import addimage from '../../common/assets/add.svg'
import add_1 from '../../common/assets/add_1.svg';
import add_2 from '../../common/assets/add_2.svg';
import add_3 from '../../common/assets/add_3.svg';

import { Button, Paper, Box } from '@mui/material'

const boxstyle = {
    height: 150,
    width: '100%',
    border:'0px solid black',
    display: 'flex',
    justifyContent: 'center'
}

class SingleSlider extends React.Component {
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };
      return (
            <Box sx={{ 
                border:'0px solid red', 
                width: '100%', 
            }}>
                <Slider className="container" {...settings}>
                    <div style={{ border:'0px solid yellow', width: '100%', height: '100%', }} >
                        <Box sx={{
                            ...boxstyle
                        }}> <img style={{ height: '100%' }} src={add_1} alt="add"  /></Box>
                    </div>
                    <Box >
                        <Box sx={{
                            ...boxstyle
                        }}> <img style={{ height: '100%' }} src={add_2} alt="add"  /> </Box>
                    </Box>
                    <div>
                    <Box >
                        <Box sx={{
                            ...boxstyle
                        }}> <img style={{ height: '100%' }} src={add_3} alt="add"  /> </Box>
                    </Box>
                    </div>
                </Slider>
            </Box>
      );
    }
  }

export { SingleSlider }