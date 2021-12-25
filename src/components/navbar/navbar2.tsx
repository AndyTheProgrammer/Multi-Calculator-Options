import React, { useState } from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm';
import { useHistory } from 'react-router-dom'

//icons
import SearchIcon from '@mui/icons-material/Search';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const classNames = require('classnames');

function NavBar2(props:any){
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () =>{
        setOpenDrawer(!openDrawer)
    }
    var mathHighLight = props.mathHighLight;
    var financialHighLight = props.financialHighLight;
    var otherHighLight = props.otherHighLight;

    var buttonStylesMath = classNames({
        'search-button-2': true,
        'search-button-math': mathHighLight ? true : false,
    })

    var buttonStylesOther = classNames({
        'search-button-2': true,
        'search-button-other': otherHighLight ? true : false,
    })

    var buttonStylesFinancial = classNames({
        'search-button-2': true,
        'search-button-financial': financialHighLight ? true : false,
    })

    const history = useHistory()
    
        return(
            <>
                <Box
                    className="container"
                    sx={{
                        width: '100%',
                        paddingTop: 2,
                        marginBottom: 2,
                    }}>
                    <div>
                        <AppBar 
                            color="transparent"
                            elevation={0}  
                            position="static">

                            <Box sx={{ display: 'flex', m: 1 }}>
                                {
                                    (props.pageimage)?
                                    <Box
                                    sx={{
                                        height: 40,
                                        
                                    }}>
                                    <img style={{ width: '100%', height: '100%'}} alt="icon" src={props.pageimage} />

                                    </Box>: null
                                }
                                <Button
                                onClick={
                                    ()=>{
                                        history.push(props.backroute)
                                    }
                                } 
                                sx={{
                                    // color: '#353FB0',
                                    display:{
                                        lg: 'none',
                                        md: 'none',
                                        sm: 'block',
                                        xs: 'block'
                                    }
                                }}>
                                    <ArrowBackIcon/>
                                </Button>
                                <Box>
                                    <Link sx={{
                                            color: "white",
                                            display:{
                                                ld: 'block',
                                                md: 'block',
                                                sm: 'none',
                                                xs: 'none'
                                            } 
                                        }} href="#" underline="none">
                                        <Typography variant="h6" component="div" >
                                            <Box 
                                                sx={{
                                                    paddingTop: 1.5,
                                                    fontSize: 16,
                                                    color: '#8591B0',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {props.pagename}
                                                </Box>
                                            
                                        </Typography>
                                    </Link>
                                </Box>
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Box sx={{ 
                                    paddingTop: 1.5,
                                    display: {
                                        ld: 'flex',
                                        md: 'flex',
                                        sm: 'none',
                                        xs: 'none'
                                    } }}>
                                <button onClick={()=>{ history.push("/financepage") }} className={buttonStylesFinancial} type="button">Financial</button>
                                <button onClick={()=>{ history.push("/mathcategories") }} className={buttonStylesMath} type="button">Mathematics</button>
                                <button onClick={()=>{ history.push("/otherpage") }} className={buttonStylesOther} type="button">Other</button>
                                <button onClick={()=>{ history.push('/home') }} className="search-button-1" type="button">Home</button>
                            </Box>
                            <Box sx={{ 
                                    display: {
                                        ld: 'none',
                                        md: 'none',
                                        sm: 'flex',
                                        xs: 'flex'
                                    } 
                                }}>
                                    <Button type="button">
                                        <SearchIcon/>
                                    </Button>
                                    <Button
                                        onClick={()=>{
                                            toggleDrawer();
                                        }} 
                                        type="button">
                                        <DensityMediumIcon/>
                                    </Button>
                            </Box>
                        </Box>
                        </AppBar>
                    </div>
                    <Box>
                    </Box>
                </Box>
                <Box className={
                    classNames({
                        'drawer-close': !openDrawer,
                        'drawer-open' : openDrawer
                    })} 
                    // sx={{ display: 'none' }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'end'
                            }}>
                            <Button
                                onClick={()=>{
                                    toggleDrawer();
                                }} 
                                type="button">
                                <CloseIcon/>
                            </Button>
                        </Box>
                        <Box
                            className="drawer-button" 
                            onClick={()=>{ history.push('/home') }} 
                            >Home</Box>
                        <Box 
                            className="drawer-button"
                            onClick={()=>{ history.push("/financepage") }} 
                            >Financial</Box>
                        <Box 
                            className="drawer-button"
                            onClick={()=>{ history.push("/mathcategories") }}
                            >Mathematics</Box>
                        <Box 
                            className="drawer-button"
                            onClick={()=>{ history.push("/otherpage") }} 
                            >Other</Box>
                        <Box 
                            className="drawer-button" 
                            onClick={()=>{ history.push("/allcalculators") }}
                            >All Calculators</Box>
                </Box>
            </>
        );
    }

export { NavBar2 }