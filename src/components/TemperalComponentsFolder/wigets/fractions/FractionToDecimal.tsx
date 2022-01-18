import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SimplifyFraction from './SimplifyFraction'
var Latex = require('react-latex');

export default function FractionToDecimal(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    // const [arr, setArr] = useState([...props.data])

    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])

    var answer = parseInt(inputValue[0]) / parseInt(inputValue[1])
    var ans = answer.toFixed(8)
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${inputValue[0]}}{${inputValue[1]}}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${ans}$`}</Latex>
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