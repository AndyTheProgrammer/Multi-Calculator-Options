import React, { useState, useEffect, useRef } from 'react'// requires a loader
import Slider from "react-slick"
import addimage from '../../common/assets/add.svg'


import { Button, Paper, Box } from '@mui/material'


class SingleSlider extends React.Component {
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };
      return (
            <Slider className="container" {...settings}>
                <div>
                    <Box sx={{
                        padding: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}> <img style={{ width: '100%' }} src={addimage} alt="add"  /></Box>
                </div>
                <Box >
                    <Box sx={{
                        padding: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}> <img style={{ width: '100%' }} src={addimage} alt="add"  /> </Box>
                </Box>
                <div>
                <Box >
                    <Box sx={{
                        padding: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}> <img style={{ width: '100%' }} src={addimage} alt="add"  /> </Box>
                </Box>
                </div>
            </Slider>
      );
    }
  }

export { SingleSlider }