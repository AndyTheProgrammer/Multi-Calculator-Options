import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SimplifyFraction from './SimplifyFraction'
var Latex = require('react-latex');

export default function FractionToPercent(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    // const [arr, setArr] = useState([...props.data])
    
    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])

    var common_divisor = gcd(inputValue[0], inputValue[1]);
    var percentage = (parseFloat(inputValue[0]) / parseFloat(inputValue[1])) * 100
    var answer = percentage.toFixed(8).toString()
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${inputValue[0]}}{${inputValue[1]}}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${inputValue[0]}}{${inputValue[1]}} \\times 100\\%$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$\\textrm{Answer} = ${answer}\\%$`}</Latex>
            </Box>
        </Typography>
    );
}

function gcd(a:number, b:number):number {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
}