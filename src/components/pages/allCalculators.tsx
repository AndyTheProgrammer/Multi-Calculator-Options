import React, { useEffect } from "react"
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm'
import { useHistory } from "react-router-dom";
import { Box, Grid } from '@mui/material'
import Slider from "react-slick";
import AddLayout from '../layouts/AddLayout';
import site_map_icon from '../../common/assets/site_map_icon.svg';
import fincance_icon from '../../common/assets/finance.svg';
import other_icon from '../../common/assets/other.svg';
import math_icon from '../../common/assets/math.svg';
import { dataInit } from '../../services/dataInit';
import { financialRoutes, othersRoutes, mathRoutes } from '../../routes/routes'

const calculatorNamesStyles = {
    paddingLeft:4, 
    marginBottom: 0.8,
    fontSize: 14
}

const calculatorCategorynamesStyles = {
    paddingTop: 0.5,
    paddingLeft: 0.7,
    color: '#8591B0',
    fontSize: 15,
}

const catergoryBoxStyle = {
    width:30, 
    height:30, 
    borderRadius: 10, 
    objectFit:'contain'
}

const boxStyle = {
    backgroundColor: 'white',
    width: 250,
    height: 30, 
    borderRadius: 10, 
    boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 1.5
}

function NavBar(){
        const history = useHistory();
        return(
            <Box
                sx={{
                    width: '100%',
                    paddingTop: 2,
                    marginBottom: 2,
                }}>
                <div className="container">
                    <AppBar 
                        color="transparent"
                        elevation={0} 
                        position="static">

                    <Box sx={{ display: 'flex', m: 1 }}>
                            <Box sx={{ height: 40, }}>
                                <img style={{ width: '100%', height: '100%'}} alt="icon" src={site_map_icon} />
                            </Box>
                        <Box>
                            <Link sx={{color: "white" }} href="#" underline="none">
                                <Typography variant="h6" component="div" >
                                    <Box 
                                        sx={{
                                            color: '#8591B0',
                                            paddingTop: 1,
                                            marginLeft: 1
                                        }}>
                                            Site Map
                                        </Box>
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <SearchForm />
                        <button id="search-button" type="button" onClick={()=>{ history.push("/home") }}>Home</button>
                    </Box>
                    </AppBar>
                </div>
            </Box>
        );
    }



function AllCalculators(){

    const financialCalculators = [
        ...financialRoutes.subCategories[0].sub_calculator,
        ...financialRoutes.subCategories[1].sub_calculator
    ]
    const mathCalculatorsData = [
        ...mathRoutes.subCategories[0].sub_calculator,
        ...mathRoutes.subCategories[1].sub_calculator,
        ...mathRoutes.subCategories[2].sub_calculator
    ]
    const otherCalculatorsData = [
        ...othersRoutes.subCategories[0].sub_calculator,
        ...othersRoutes.subCategories[1].sub_calculator,
        ...othersRoutes.subCategories[2].sub_calculator
    ]



    
    return(
        <>
        <Box sx={{ marginBottom: 5 }}>
            <NavBar />
        </Box>
        <AddLayout>
        <Box >
            <Grid sx={{display: 'flex', justifyContent: 'center', paddingRight: 2 }}  container spacing={3}>
                <Grid sx={{ display: 'flex',justifyContent: 'center'}} item xs={12} md={4}>
                    <Box sx={{ backgroundColor: 'transparent', width: '100%' }}>
                  
                        <Box sx={{...boxStyle }}>
                            
                            <Box sx={{  width:30, height:30, borderRadius: 10, objectFit:'contain'}}>
                                <img style={{ width: '100%',height:'100%',  }} alt="icon" src={fincance_icon} />
                            </Box>
        
                            <Typography component="div">
                                <Box sx={{ ...calculatorCategorynamesStyles }}> 
                                    Financial Calculator
                                </Box>
                            </Typography>
                        </Box>
                    {
                        financialCalculators.map((data:any) => {
                            return (
                                <Typography>
                                    <Box sx={{ ...calculatorNamesStyles }}> { data.name } </Box>
                                </Typography>
                            );
                        })
                    }
                </Box>
                  
                </Grid>
                <Grid sx={{ display: 'flex',justifyContent: 'center'}} item xs={12} md={4}>
                        <Box sx={{ backgroundColor: 'transparent', width: '100%'}}>
                        <Box >
                            <Box sx={{...boxStyle }}>
                                <Box sx={{  width:30, height:30, borderRadius: 10, objectFit:'contain'}}>
                                    <img style={{ width: '100%',height:'100%',  }} alt="icon" src={math_icon} />
                                </Box>
            
                                <Typography component="div">
                                    <Box sx={{ ...calculatorCategorynamesStyles }}>  
                                         Mathematics Calculator
                                    </Box>
                                </Typography>
                            </Box>
                           
                            {
                                mathCalculatorsData.map((data:any) => {
                                    return (
                                        <Typography>
                                            <Box sx={{ ...calculatorNamesStyles }}> { data.name } </Box>
                                        </Typography>
                                    );
                                })
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid 
                    sx={{ display: 'flex',justifyContent: 'center'}} item xs={12} md={4}>
                        <Box sx={{ backgroundColor: 'transparent', width: '100%' }}>
                        <Box >
                            <Box sx={{...boxStyle }}>
                                <Box sx={{  width:30, height:30, borderRadius: 10, objectFit:'contain'}}>
                                    <img style={{ width: '100%',height:'100%',  }} alt="icon" src={other_icon} />
                                </Box>
            
                                <Typography component="div">
                                    <Box sx={{ ...calculatorCategorynamesStyles }}> 
                                        Other Calculator
                                    </Box>
                                </Typography>
                            </Box>
                           
                            {
                                otherCalculatorsData.map((data:any) => {
                                    return (
                                        <Typography>
                                            <Box sx={{ ...calculatorNamesStyles }}> { data.name } </Box>
                                        </Typography>
                                    );
                                })
                            }
                        </Box>
                    </Box>
                </Grid>
               
            </Grid>
        </Box>
        </AddLayout>
        </>
    );
   
}

export { AllCalculators }