import React, { useState } from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm';
import { useHistory } from 'react-router-dom'

import { Font, FontProvider } from '../font'


function NavBar2(props: any) {
    const history = useHistory()
    return (
        <Box
            sx={{
                width: '100%',
                paddingTop: 2,
                marginBottom: 2
            }}>
            <Container>
                <AppBar
                    color="transparent"
                    elevation={0}
                    position="static"
                    style={{ backgroundColor: 'transparent' }}
                >
                    <FontProvider fonts={[{ font: 'Fira Sans' }]}>
                        <Box
                            sx={{
                                display: 'flex',
                                m: 1
                            }}>
                            <Box>
                                <Link sx={{ color: "white" }} href="#" underline="none">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                    >
                                        <Box
                                            sx={{
                                                color: '#8591B0'
                                            }}>
                                            <Font>CalculatorMap</Font>
                                        </Box>

                                    </Typography>
                                </Link>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <button
                                onClick={() => { history.push("/testpage") }}
                                className="search-button-2"
                                type="button"
                            >
                                <Font>Test Page</Font>
                            </button>
                            <button
                                onClick={() => { history.push("/financepage") }}
                                className="search-button-2"
                                type="button"
                            >
                                <Font>Financial</Font>
                            </button>
                            <button
                                onClick={() => { history.push("/mathcategories") }}
                                className="search-button-2"
                                type="button"
                            >
                                <Font>Mathematics</Font>
                            </button>
                            <button
                                onClick={() => { history.push("/fitness&healthpage") }}
                                className="search-button-2"
                                type="button"
                            >
                                <Font>Fitness and Health</Font>
                            </button>
                            <button
                                onClick={() => { history.push("/otherpage") }}
                                className="search-button-2"
                                type="button"
                            >
                                <Font>Other</Font>
                            </button>
                            <button
                                onClick={() => { history.push('/home') }}
                                className="search-button-2"
                                type="button"
                            >
                                <Font>Home</Font>
                            </button>
                        </Box>
                    </FontProvider>
                </AppBar>
            </Container>
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