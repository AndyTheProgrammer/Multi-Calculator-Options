import React from 'react'
import { Box, Grid, Container } from '@mui/material'
import SpecifiedSearchForm from '../forms/SpecifiedSearchForm'
import { SingleSlider } from '../slider/SingleSlider'
import { NavBar2 } from '../navbar/navbar2'
import useStyles from '../../styling/CustomStyles'


export default function AddLayout({ children }: any) {
    const { container, root } = useStyles()
    return (
        <>
            {/* <Box
                className="container">
                <Grid sx={{ width: '100%' }} container rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={9} >
                        <Box sx={{ minHeight: 350 }}>
                            {children}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Box>
                            <Box sx={{ border: 0, borderColor: 'blue', width: 150, height: 200 }}>
                                <SingleSlider />
                            </Box>
                            <Box>
                                <SpecifiedSearchForm />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box> */}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container sx={{ margin: 'auto' }}>
                    <Grid
                        container
                        xs={12}
                        sm={10}
                        justifyContent="center"
                        alignItems="center"

                    >
                        {children}

                    </Grid>

                    <Grid item xs={12} sm>
                        <Box >
                            <Box
                                sx={{
                                    border: 'none',
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    width: 150,
                                    height: 200,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <SingleSlider />
                            </Box>
                            <Box>
                                <SpecifiedSearchForm />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}