import React from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'
import { Slide } from '../slider/slider'
import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import iconImage from '../../common/assets/icon.svg';
import iconLine from '../../common/assets/line.svg';
import Slider from "react-slick";
import { mathRoutes } from '../../routes/routes'

import fractions from '../../common/assets/fractions_icon.svg';
import general_math from '../../common/assets/general_math.svg';
import algebra_icon from '../../common/assets/algebra_icon.svg';
import stats from '../../common/assets/stats_icon.svg';
import geometry_icon from '../../common/assets/geometry_icon.svg';

function MathOptions(){
    const localStorageData = JSON.parse(localStorage.webdata)
    const history = useHistory()

    const boxStyle = {
        marginBottom: 2,
        backgroundColor: 'transparent',
        maxWidth: 270,
        height: 250,
        borderRadius: 3,
        paddingTop: 1,
        paddingBottom: 0.5,
        // boxShadow: ' 0 10px 8px 0px rgba(0, 0, 0, 0.2)'
      }

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };

    return(
        <div style={{ height: 300, }} className="container mt-4">
        <Slider  {...settings}>
            <Box sx={{...boxStyle }}>
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={fractions} />
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
                                Fraction Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        mathRoutes.subCategories[0].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
            <Box sx={{...boxStyle }}>
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={general_math} />
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
                                General Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        mathRoutes.subCategories[1].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
            <Box sx={{...boxStyle }}>
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={algebra_icon} />
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
                                Algebra Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        mathRoutes.subCategories[2].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
            <Box sx={{...boxStyle }}>
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={stats} />
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
                                Statistics Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        mathRoutes.subCategories[3].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
            <Box sx={{...boxStyle }}>
            <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={geometry_icon} />
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
                                Geometry Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        mathRoutes.subCategories[4].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
            <Box sx={{...boxStyle }}>
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={geometry_icon} />
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
                                Measurement Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        mathRoutes.subCategories[5].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
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
        </Box>
        <Box >
        </Box>
        </div>
    );
}

export { MathOptions }