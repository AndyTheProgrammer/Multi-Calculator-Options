import React, { useState } from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm';
import { useHistory } from 'react-router-dom'


function NavBar2(props: any) {

    const history = useHistory()
    return (
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
                    sx={{

                    }}
                    position="static">

                    <Box
                        sx={{
                            display: 'flex',
                            m: 1
                        }}>
                        <Box>
                            <Link sx={{ color: "white" }} href="#" underline="none">
                                <Typography variant="h6" component="div" >
                                    <Box
                                        sx={{
                                            color: '#8591B0'
                                        }}>
                                        CalculatorMap
                                    </Box>

                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <button onClick={() => { history.push("/financepage") }} className="search-button-2" type="button">Financial</button>
                        <button onClick={() => { history.push("/mathcategories") }} className="search-button-2" type="button">Mathematics</button>
                        <button onClick={() => { history.push("/fitness&healthpage") }} className="search-button-2" type="button">Fitness and Health</button>
                        <button onClick={() => { history.push("/otherpage") }} className="search-button-2" type="button">Other</button>
                        <button onClick={() => { history.push('/home') }} className="search-button-2" type="button">Home</button>
                    </Box>
                </AppBar>
            </div>
            <Box>
                <Typography component="div">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <SearchForm />
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
}

export { NavBar2 }