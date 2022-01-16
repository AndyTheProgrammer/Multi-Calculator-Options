import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SimplifyFraction from './SimplifyFraction'
var Latex = require('react-latex');

export default function PercentToFraction(props:any){
    const [inputValue, setInputValue] = useState(props.data)
    var multiplyer = Math.pow(10,decimalCount(inputValue))
    var common_divisor = gcd(inputValue, 100);
    var numerator = parseInt(`${multdec(inputValue, multiplyer)}`)
    var denominator = multdec(100, multiplyer)

    useEffect(()=>{
        setInputValue(props.data)
    },[props.data])

    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$A \\% = \\frac{b}{c} $`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$ {${inputValue}}\\%$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${inputValue}\\% \\times \\frac{1}{100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${inputValue}}{100}$`}</Latex>
            </Box>
            <SimplifyFraction data={[numerator,denominator]}/>
        </Typography>
    );
}


function decimalCount(num:any){
    // Convert to String
    const numStr = String(num);
    // String Contains Decimal
    if (numStr.includes('.')) {
       return numStr.split('.')[1].length;
    };
    // String Does Not Contain Decimal
    return 0;
 }

function gcd(a:number, b:number):number {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
}

function multdec ( val1:number, val2:number ) {
    return ( (val1 * 10) * (val2 * 10) ) / 100;
}
