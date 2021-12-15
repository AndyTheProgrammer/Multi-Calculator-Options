import React from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'

import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import iconImage from '../../common/assets/icon.svg';
import iconLine from '../../common/assets/line.svg';

import invest_and_saving_icon from '../../common/assets/invest_and_savings_icon.svg';
import money_tax_icon from '../../common/assets/money_tax_icon.svg';
import mortage_icon from '../../common/assets/mortage_icon.svg';
import retirement_calc_icon from '../../common/assets/retirement_calc_icon.svg';
import sales from '../../common/assets/sales.svg';


import Slider from "react-slick";
import { financialRoutes } from '../../routes/routes'

function FinanceOptions(){
    const localStorageData = JSON.parse(localStorage.webdata)
    const history = useHistory()

    const financialCategoriesData = localStorageData[0].sub_categories
    
    console.log("Finance Data")
    console.log(financialCategoriesData)

      const boxStyle = {
        marginBottom: 2,
        backgroundColor: 'transparent',
        maxWidth: {
            lg: 280,
            md: 280,
            sm: 280,
            xs: "100%"
        },
        height: 250,
        borderRadius: 3,
        paddingTop: 1,
        paddingBottom: 0.5,
        // boxShadow: ' 0 10px 8px 0px rgba(0, 0, 0, 0.2)'
      }

      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
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

    return(
        <div style={{ height: 300, }} className="container mt-4">
        <Slider  {...settings}>
            <Box sx={{...boxStyle }}>
                {/* <Box sx={{ 
                    paddingLeft: 2,
                    width: '100',
                    backgroundColor: 'white',
                    borderRadius: 5, 
                    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
                    }} >  
                    <p style={{ marginTop: 5 }}>Investment and Saving Calculators</p>
                </Box> */}
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.1)',
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
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
                                Investment & Saving Calculators
                        </Box>
                    </Typography>
                    
                </Box>
                <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
                    {
                        financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
                            return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
                        })
                    }
                </Box>
            </Box>
           
            <Box sx={{...boxStyle }}>
                {/* <Box sx={{ 
                    paddingLeft: 2,
                    width: '100',
                    backgroundColor: 'white',
                    borderRadius: 5, 
                    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
                    }} >  
                    <p style={{ marginTop: 5 }}>Money, Pay, & Tax Calculators</p>
                </Box> */}
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.1)',
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={money_tax_icon} />
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
                                Money, Pay, & Tax Calculators
                        </Box>
                    </Typography>
                    
                </Box>


            </Box>
            <Box sx={{...boxStyle }}>
                {/* <Box sx={{ 
                    paddingLeft: 2,
                    width: '100',
                    backgroundColor: 'white',
                    borderRadius: 5, 
                    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
                    }} >  
                    <p style={{ marginTop: 5 }}>Loan Calculators</p>
                </Box> */}
                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.1)',
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={mortage_icon} />
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
                                Loan Calculators
                        </Box>
                    </Typography>
                    
                </Box>
            </Box>
            <Box sx={{...boxStyle }}>
                {/* <Box sx={{ 
                    paddingLeft: 2,
                    width: '100',
                    backgroundColor: 'white',
                    borderRadius: 5, 
                    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
                    }} >  
                    <p style={{ marginTop: 5 }}>Retirement Calculators</p>
                </Box> */}

                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.1)',
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={retirement_calc_icon} />
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
                                Retirement Calculators
                        </Box>
                    </Typography>
                    
                </Box>

            </Box>
            <Box sx={{...boxStyle }}>
                {/* <Box sx={{ 
                    paddingLeft: 2,
                    width: '100',
                    backgroundColor: 'white',
                    borderRadius: 5, 
                    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
                    }} >  
                    <p style={{ marginTop: 5 }}>Sales and Retail Calculators</p>
                </Box> */}

                <Box 
                    sx={{ 
                        width:'100%',
                        height: 30, 
                        fontSize: 22,
                        display: 'flex',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.1)',
                    }}>
                    <Box sx={{ height: 30, }}>
                        <img style={{ height: '100%', }} alt="icon" src={sales} />
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
                                Sales and Retail Calculators
                        </Box>
                    </Typography>
                    
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
            <Box sx={{
                        width: '100%',
                        borderRadius: 3,
                        color: "black",
                        paddingBottom: 0.5,
                    }}>
            </Box>
        </Box>
        </div>
    );
}

export { FinanceOptions }