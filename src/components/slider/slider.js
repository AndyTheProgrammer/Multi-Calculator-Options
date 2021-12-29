import React, { useState, useEffect, useRef } from 'react'// requires a loader
import Slider from "react-slick"
import addimage from '../../common/assets/add.svg'
import iconLine from '../../common/assets/line.svg';
import add_1 from '../../common/assets/add_1.svg';
import add_2 from '../../common/assets/add_2.svg';
import add_3 from '../../common/assets/add_3.svg';
import { Button, Paper, Box, Typography } from '@mui/material'


class Slide extends React.Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
      return (
            <>
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
                        }}>
                    <Box>
                        <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
                    </Box>
                    <Typography>
                        <Box sx={{
                            marginLeft: 1,
                            marginRight: 1,
                            paddingTop: 1
                        }}>
                            Advertisement
                        </Box>
                    </Typography>
                    <Box>
                        <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
                    </Box>
                </Box>
            </Box>
            <Slider className="container" {...settings}>
                <div>
                    <Box sx={{
                        border: '0px solid red',
                        marginRight: 1,
                        display: 'flex',
                        justifyContent: 'start'
                    }}> <img style={{border: '0px solid red', width: 150 }} src={add_1} alt="add"  /></Box>
                </div>
                <Box >
                    <Box sx={{
                        marginRight: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}> <img style={{ width: 150 }} src={add_2} alt="add"  /> </Box>
                </Box>
                <div>
                <Box sx={{
                        marginRight: 1,
                        textAlign: 'end',
                        display: 'flex',
                        justifyContent: 'end'
                    }}> <img style={{ width: 150 }} src={add_3} alt="add" /> </Box>
                </div>
            </Slider>
            </>
      );
    }
  }

export { Slide }