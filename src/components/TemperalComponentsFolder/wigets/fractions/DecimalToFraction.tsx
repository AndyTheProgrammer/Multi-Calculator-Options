import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SimplifyFraction from './SimplifyFraction'
var Latex = require('react-latex');

export default function DecimalToFraction(props:any){
    const [inputValue, setInputValue] = useState(props.data)
    var d_count = decimalCount(inputValue)
    var multiplyer = Math.pow(10, d_count)
    var nume = parseFloat(inputValue) * multiplyer
    var numerator= parseInt(nume.toFixed(1))

    var common_divisor = gcd(numerator, multiplyer);
    var reduced_numerator = numerator /common_divisor
    var reduced_denominator = multiplyer / common_divisor

    //mixed fraction variables
    var wn = reduced_numerator/reduced_denominator
    var whole_number = parseInt(`${wn}`)
    var mixed_numerator = reduced_numerator % reduced_denominator

    useEffect(()=>{
        setInputValue(props.data)
    },[props.data])

    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$={${inputValue}}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${inputValue} \\times ${ multiplyer} }{${1} \\times ${multiplyer} }$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${numerator}}{${multiplyer}}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${numerator} \\div ${common_divisor}}{${multiplyer} \\div ${common_divisor}}$`}</Latex>
            </Box>
            {
                (common_divisor>1)?
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$=\\frac{${reduced_numerator}}{${reduced_denominator}}$`}</Latex>
                </Box>
                :<></>
            }
            {
                ((reduced_numerator>reduced_denominator) && reduced_denominator!=1 )?
                <>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$\\textrm{Answer}=${whole_number}\\frac{${mixed_numerator}}{${reduced_denominator}}$`}</Latex>
                    </Box>
                </>
                :<></>   
            }
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
