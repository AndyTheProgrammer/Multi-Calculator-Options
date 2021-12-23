import React, { useState, useEffect, useRef } from 'react'// requires a loader
import Slider from "react-slick"
import addimage from '../../common/assets/add_image.svg'
import { Button, Paper, Box, Typography } from '@mui/material'

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
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // nextArrow: <SampleNextArrow />,
      };
      return (
            <Slider className="container add-slider-height" {...settings}>
                <div>
                    <Box sx={{
                        width: "100%",
                        height:"100%",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'fit',
                        justifyContent: 'start',
                        backgroundImage: `linear-gradient(to right, #3128af, #499fb8)`,
                        paddingTop: 3,
                    }}> 
                        <Typography>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 24
                                 }}>
                                Your Next Power Move
                            </Box>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 16
                                 }}>
                                Here is your chance to win that move
                            </Box>
                        </Typography>
                        
                    </Box>
                </div>
                <Box sx={{
                        width: "100%",
                        height: "100%",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'fit',
                        justifyContent: 'start',
                        backgroundImage: `linear-gradient(to right, #3128af, #499fb8)`,
                        paddingTop: 3,
                    }}> 
                        <Typography>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 24
                                 }}>
                                Your Next Power Move
                            </Box>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 16
                                 }}>
                                Here is your chance to win that move
                            </Box>
                        </Typography>
                    </Box>
                <div>
                <Box sx={{
                        width: "100%",
                        height: "100%",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'fit',
                        justifyContent: 'start',
                        backgroundImage: `linear-gradient(to right, #3128af, #499fb8)`,
                        paddingTop: 3,
                    }}> 
                        <Typography>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 24
                                 }}>
                                Your Next Power Move
                            </Box>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 16
                                 }}>
                                Here is your chance to win that move
                            </Box>
                        </Typography>
                    </Box>
                </div>
            </Slider>
      );
    }
  }

export { AddSlider }