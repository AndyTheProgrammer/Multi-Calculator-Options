import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
export default function TextCard(props:any){
    return(
        <Grid container>
            <Grid item xs={8}>
                <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            // color:'#4072B5', 
                            borderBottom: '0px solid #dbdbdb',
                            paddingTop: 1
                        }}>
                        { props.leadingtext } 
                    </Box>
                    <Box
                        sx={{
                            // color:'#4072B5', 
                            borderBottom: '0px solid #dbdbdb',
                            paddingTop: 1,
                            paddingRight: 5
                        }}>
                        :
                    </Box>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>
                    <Box sx={{
                        paddingTop: 1,
                        textAlign: 'end',
                        paddingRight: 5
                    }}>
                        { props.trailingtext}
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    );
}