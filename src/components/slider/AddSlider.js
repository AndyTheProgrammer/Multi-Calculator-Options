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
                        height: 200,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        justifyContent: 'start',
                        backgroundImage: `url(${addimage})`,
                        paddingTop: 3,
                    }}> 
                        <Typography>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 32
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
                        <Box 
                            sx={{ 
                                color: 'white',
                                marginTop: '1px',
                                marginLeft: '25px',
                            }}>
                                <button
                                    style={{
                                        border:'none',
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                        fontSize: 24
                                    }} 
                                    type="button"
                                    >Subscribe Now</button>
                            </Box>
                    </Box>
                </div>
                <Box sx={{
                        width: "100%",
                        height: 200,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        justifyContent: 'start',
                        backgroundImage: `url(${addimage})`,
                        paddingTop: 3,
                    }}> 
                        <Typography>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 32
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
                        <Box 
                            sx={{ 
                                color: 'white',
                                marginTop: '1px',
                                marginLeft: '25px',
                            }}>
                                <button
                                    style={{
                                        border:'none',
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                        fontSize: 24
                                    }} 
                                    type="button"
                                    >Subscribe Now</button>
                            </Box>
                    </Box>
                <div>
                <Box sx={{
                        width: "100%",
                        height: 200,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        justifyContent: 'start',
                        backgroundImage: `url(${addimage})`,
                        paddingTop: 3,
                    }}> 
                        <Typography>
                            <Box sx={{ 
                                    color: 'white',
                                    marginLeft: '25px',
                                    fontSize: 32
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
                        <Box 
                            sx={{ 
                                color: 'white',
                                marginTop: '1px',
                                marginLeft: '25px',
                            }}>
                                <button
                                    style={{
                                        border:'none',
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                        fontSize: 24
                                    }} 
                                    type="button"
                                    >Subscribe Now</button>
                            </Box>
                    </Box>
                </div>
            </Slider>
      );
    }
  }

export { AddSlider }