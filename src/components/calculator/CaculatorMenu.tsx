

import React, {useState} from 'react'
import { Grid, Typography, Box, Container, Link } from '@mui/material'

//COMPONENTS IMPORT
import AddLayout2 from '../layouts/AddLayout2'
import { MathMenu } from './MathMenu'

var classNames = require('classnames');

const linktexts = {
    width: '100%', 
    paddingBottom: 0.5,  
    fontSize: 16, 
    color: '#8591B0',
    textAlign:'start'
}
function CalculatorMenu(){

    return(
        <AddLayout2>
            <Typography>
                <Box sx={{
                    paddingLeft: 1,
                    marginBottom: 3
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Box>
            </Typography>
            <MathMenu/>
        </AddLayout2>
    );
}

export { CalculatorMenu }