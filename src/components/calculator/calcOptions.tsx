import React from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'
import { Slide } from '../slider/slider'
import { useHistory } from "react-router-dom";
import fincance_icon from '../../common/assets/finance_icon.svg';
import math_icon from '../../common/assets/math_icon.svg';
import other_icon from '../../common/assets/other_icon.svg';
import iconLine from '../../common/assets/line.svg';

function CalcOptions(){
    const localStorageData = JSON.parse(localStorage.webdata)
    const history = useHistory();

    const boxStyle = {
        backgroundColor: 'white',
        width: 280,
        borderRadius: 3,
        paddingTop: 1,
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 0.5,
        boxShadow: ' 0px 0px 30px 5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'flex-start',
        
    }

    const centerBoxStyle = {
        display: 'flex',
        justifyContent: 'center',
    
    }
    

    return(
        <Container className="container mt-4">
            
            <Box className="d-flex justify-content-center">
                <Grid container spacing={4}>
                    <Grid sx={{ ...centerBoxStyle, }} item xs={12} sm={12} md={6} lg={4}>
                            <Box 
                                onClick={() =>  { history.push('/financepage') }} 
                                className="div-link" sx={{ ...boxStyle,flexDirection: 'column', }}>

                                {/* image and button name */}

                                <Box 
                                    sx={{ 
                                        height: 50, 
                                        fontSize: 22,
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}>
                                    <Box>
                                        <img style={{ marginRight: 4, width: 40, }} alt="icon" src={fincance_icon} />
                                    </Box>
                                    <Typography>
                                        <Box
                                            sx={{
                                                marginTop: 1,
                                                verticalAlign: 'bottom',
                                                marginLeft: 1,
                                                fontSize: 20
                                            }}>
                                                Financial
                                        </Box>
                                    </Typography>
                                    
                                </Box>


                               <Box sx={{ height: 180, overflow: 'hidden'}}>
                                    <Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 230,
                                                    color: '#8591B0',
                                                    fontSize: 15,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                Loan Calculators
                                            </Box>
                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Investment and Saving Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Money, Pay & Tax Calculators </Box>
                                                <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Investment and Saving Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Money, Pay & Tax Calculators </Box>

                                        </Typography>
                                    </Box>

                               </Box>
                               <Box sx={{flexGrow:1}}>

                                </Box>
                                <Box>
                                    <Typography>
                                        <Box sx={{ 
                                                color: '#8591B0', 
                                                paddingBottom: 1,  
                                                fontSize: 15,overflow: 'hidden', 
                                                whiteSpace: 'nowrap', 
                                            }}> More.. </Box>
                                    </Typography>
                                </Box>
                            </Box>
                    </Grid>
                    <Grid sx={{ ...centerBoxStyle }} item xs={12} sm={12} md={6} lg={4}>
                        <Box 
                            onClick ={ ()=> { history.push('/mathcategories') }} 
                            className="div-link" 
                            sx={{ ...boxStyle, flexDirection: 'column', }}>

                            {/* image and button name */}
                            <Box 
                                    sx={{ 
                                        height: 50, 
                                        fontSize: 22,
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}>
                                    <Box>
                                        <img style={{ marginRight: 4, width: 40, }} alt="icon" src={math_icon} />
                                    </Box>
                                    <Typography>
                                        <Box
                                            sx={{
                                                marginTop: 1,
                                                verticalAlign: 'bottom',
                                                marginLeft: 1,
                                                fontSize: 20
                                            }}>
                                                Mathematics
                                        </Box>
                                    </Typography>
                                    
                                </Box>


                               <Box sx={{ height: 180, overflow: 'hidden'}}>
                                    <Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 230,
                                                    color: '#8591B0',
                                                    fontSize: 15,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                Fractions Calculators
                                            </Box>
                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> General Math Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Algebra Calculators </Box>
                                                <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Statistics Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Geometry Calculators </Box>
                                            
                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Measurements Calculators</Box>

                                        </Typography>
                                    </Box>

                               </Box>
                               <Box sx={{flexGrow:1}}>

                                </Box>
                                <Box>
                                    <Typography>
                                        <Box sx={{ 
                                                color: '#8591B0', 
                                                paddingBottom: 1,  
                                                fontSize: 15,overflow: 'hidden', 
                                                whiteSpace: 'nowrap', 
                                            }}> More.. </Box>
                                    </Typography>
                                </Box>
                        </Box>
                    </Grid>
                    <Grid sx={{ ...centerBoxStyle }} item xs={12} sm={12} md={6} lg={4}>
                        <Box 
                            onClick ={ ()=> { history.push('/otherpage') }} 
                            className="div-link" 
                            sx={{ ...boxStyle,flexDirection: 'column', }}>

                             {/* image and button name */}
                             <Box 
                                    sx={{ 
                                        height: 50, 
                                        fontSize: 22,
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}>
                                    <Box>
                                        <img style={{ marginRight: 4, width: 40, }} alt="icon" src={other_icon} />
                                    </Box>
                                    <Typography>
                                        <Box
                                            sx={{
                                                marginTop: 1,
                                                verticalAlign: 'bottom',
                                                marginLeft: 1,
                                                fontSize: 20
                                            }}>
                                                Others
                                        </Box>
                                    </Typography>
                                    
                                </Box>


                               <Box sx={{  height: 180, overflow: 'hidden'}}>
                                    <Box>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    width: 230,
                                                    color: '#8591B0',
                                                    fontSize: 15,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden', 
                                                }}>
                                                Fitness Calculators
                                            </Box>
                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,
                                                    overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Health Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Time and Date Calculators </Box>
                                                <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Investment and Saving Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Technology Calculators </Box>

                                            <Box sx={{ 
                                                    width: 230, 
                                                    color: '#8591B0', 
                                                    marginBottom: 0.2,  
                                                    fontSize: 15,overflow: 'hidden', 
                                                    whiteSpace: 'nowrap', 
                                                }}> Unit Conversion Calculators </Box>

                                        </Typography>
                                    </Box>

                               </Box>
                               <Box sx={{flexGrow:1}}>

                                </Box>
                                <Box>
                                    <Typography>
                                        <Box sx={{ 
                                                color: '#8591B0', 
                                                paddingBottom: 1,  
                                                fontSize: 15,overflow: 'hidden', 
                                                whiteSpace: 'nowrap', 
                                            }}> More.. </Box>
                                    </Typography>
                                </Box>
                        </Box>
                    </Grid>
                    <Grid className="container" item xs={12} md={12} >
                        <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
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
                    </Grid>
                </Grid>
            </Box>
            <Slide/>
            
        </Container>
    );
}

export { CalcOptions }