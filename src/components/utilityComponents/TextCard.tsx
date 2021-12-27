import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
export default function TextCard(props:any){
    return(
            <Box sx={{ display: 'flex', }}>
                <Typography sx={{ display: 'flex', }}>
                    <Box
                        sx={{
                            // color:'#4072B5', 
                            borderBottom: '0px solid #dbdbdb',
                            paddingTop: 1,
                            width: 150
                        }}>
                        { props.leadingtext } 
                    </Box>
                    <Box
                        sx={{
                            // color:'#4072B5', 
                            borderBottom: '0px solid #dbdbdb',
                            paddingTop: 1,
                        }}>
                        :
                    </Box>
                </Typography>
                <Typography>
                    <Box sx={{
                        paddingTop: 1,
                    }}>
                        { props.trailingtext}
                    </Box>
                </Typography>
            </Box>
    );
}