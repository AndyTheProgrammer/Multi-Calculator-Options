import * as React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm'
import { useHistory } from "react-router-dom";
import iconImage from '../../common/assets/calc_map.svg'
import all_calc_icon from '../../common/assets/all_calc_icon.svg'

/**
 * Hides corresponding componenets when screen size reduced 
 */

const generalHideStyle = {
    display: {
        lg: 'block',
        md: 'block',
        sm: 'none',
        xs: 'none'
    }
}

/**
 * Reveals corresponding componenets when screen size reduced 
 * 
 * 
 */

 const generalRevealStyle = {
    display: {
        lg: 'none',
        md: 'none',
        sm: 'block',
        xs: 'block'
    }
}



function NavBar(props:any){
        const history = useHistory();
        return(
            <Box
                sx={{
                    width: '100%',
                    paddingTop: 2,
                    marginBottom: 2
                }}>
                <div className="container">
                    <AppBar 
                        color="transparent"
                        elevation={0} 
                        position="static">
                    <Box 
                        sx={{
                            display: 'flex',
                            m: 1
                        }}>
                        <Box>
                            <Link sx={{color: "white" }} href="#" underline="none">
                                <Box sx={{ display: 'flex' }}>

                                    {/* Navbar Image */}
                                    <Box
                                        sx={{
                                            width: 40
                                        }}>
                                        <img style={{ width: '100%'}} alt="icon" src={iconImage} />

                                    </Box>

                                    {/* Name in navbavr */}

                                    <Box sx={{ ...generalHideStyle }}>
                                        <Typography 
                                            variant="h6" 
                                            component="div" 
                                        >
                                            <Box sx={{ color: '#8591B0', marginLeft: 1,paddingTop: 0.8 }}>
                                                CalculatorMap!
                                            </Box>
                                        </Typography>
                                    </Box>

                                    {/* ***************** */}


                                </Box>
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <SearchForm />

                        <Box
                            sx={{ ...generalHideStyle }}
                        >
                            {/* <button id="search-button" type="button" onClick={()=>{ history.push("/allcalculators") }}>
                                <img style={{width: '100%'}} alt="icon" src={all_calc_icon}/>
                            </button> */}
                            <button 
                                style={{
                                    border: 'none',
                                    backgroundColor:'transparent',
                                    // backgroundImage: `url(${all_calc_icon})`,
                                    padding: 0,
                                    margin: 0,
                                    height: 40
                    
                                }}
                                id="" 
                                type="button" 
                                onClick={()=>{ history.push("/allcalculators") }}>

                                <img style={{width: '100%', height:'100%'}} alt="icon" src={all_calc_icon}/>
                            </button>
                        </Box>

                        <Box sx={{ ...generalRevealStyle}}>

                        </Box>

                    </Box>
                    </AppBar>
                </div>
            </Box>
        );
    }

export { NavBar }