import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
var Latex = require('react-latex');

export default function SimpilfyFraction(props:any){
    const [arr, setArr] = useState([...props.data])
    var a = parseFloat(arr[0])
    var b = parseFloat(arr[1])
    var c = parseFloat(arr[2])

    useEffect(()=>{
        setArr([...props.data])
    },[props.data])


    if(arr.length === 2){

        if((a % 1 === 0) && (b % 1 === 0)){
            return(
                <Steps a={a} b={b}/>
            );
        }
        else{
            console.log("ONE INTEGRS ****************")
            var decimal_count_a = decimalCount(a)
            var decimal_count_b = decimalCount(b)
            
            var largest_decimal_count = (decimal_count_a>decimal_count_b)?decimal_count_a:decimal_count_b
            var top = multdec(a, Math.pow(10, largest_decimal_count)) //top
            var bottom = multdec(b, Math.pow(10, largest_decimal_count)) //bottom
            console.log("ONE DATA **************** ", b)
            return(
                <Steps a={top} b={bottom}/>
            );
        }
    }
    if(arr.length === 3){
        //check if all are integers
        if((Math.abs(a) % 1 === 0) && (Math.abs(b) % 1 === 0) && (Math.abs(c) % 1 === 0)){
            var numerator_1 = (Math.abs(c) * Math.abs(a)) + Math.abs(b)
            console.log(numerator_1)
            var denominator_1 = Math.abs(c)
            var sign = ""
            if((parseInt(`${a}`) * parseInt(`${b}`) * parseInt(`${c}`)) < 0){
                sign = "-"
            }

            return(
                <Steps a={numerator_1} b={denominator_1} sign={sign}/>
            );
        }
        else{
            var value_1 = (((Math.abs(c)*Math.abs(a)) * 10) + (Math.abs(b) * 10)) / 10
            var sign = ""
            if((a * b * c) < 0){
                sign = "-"
            }

            console.log("CALCULATE DECIMAL")
            var value_2 = c
            var decimal_count_a = decimalCount(value_1)
            var decimal_count_c = decimalCount(value_2)
            
            var largest_decimal_count = (decimal_count_a>decimal_count_c)?decimal_count_a:decimal_count_c
            
            numerator_1 = multdec(value_1, Math.pow(10, largest_decimal_count)) //top
            denominator_1 = multdec(value_2, Math.pow(10, largest_decimal_count)) //bottom

            var top = parseInt(`${numerator_1}`)
            var bottom = parseInt( `${denominator_1}`)

            console.log("CALCULATE DECIMAL",Math.pow(10, largest_decimal_count) )
            console.log(`FRAC = ${value_1} / ${value_2}` )
            console.log(`FRAC = ${top} / ${bottom}` )

            return(
                <Steps a={top} b={bottom} sign={sign}/>
            );
        }
    }
    return(
        <Box>
            Error maybe
        </Box>
    );
}



function Steps(props:any){
    var a = props.a //top
    var b = props.b //bottom
    var divisor:any = Math.abs(gcd(a,b))

    if(a === b){
        return(
            <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}=${1}$`}</Latex>
                </Box>
                
            </Typography>
        );
    }
    if(Math.abs(a) > Math.abs(b) && Math.abs(divisor) === 1){
        var numerator_1 = a / divisor
        var denominator_1 = b / divisor
        
        //find mixed fraction
        var calculate = numerator_1/denominator_1
        var wholenumber = parseInt(`${calculate}`)
        var remainder = Math.abs(numerator_1 % denominator_1)
        var denominator_2 = Math.abs(denominator_1)

        

        return(
            <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$=\\frac{${a}}{${b}}$`}</Latex>
                </Box>
                 <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}={${wholenumber}} \\frac{${remainder}}{${denominator_2}}$`}</Latex>
                </Box>
            </Typography>
        );
    }

    if(Math.abs(b) > Math.abs(a) && Math.abs(divisor)  === 1){
        var numerator_1 = a / divisor
        var denominator_1 = b / divisor
        
        //find mixed fraction
        console.log(`${numerator_1}/${denominator_1}`)
       
        return(
            <Typography>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}=\\frac{${a}}{${b}}$`}</Latex>
                </Box>
            </Typography>
        );
    }

    if((Math.abs(divisor)  > 1)  && (Math.abs(a) > Math.abs(b))){
        var numerator_1:number = a / divisor
        var denominator_1:number = b / divisor

        var calculate = numerator_1/denominator_1
        var wholenumber = parseInt(`${calculate}`)

        var remainder = Math.abs(numerator_1 % denominator_1)
        var denominator_2 = Math.abs(denominator_1)
        if(remainder === 0){
            return(
                <Typography>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} \\div ${divisor}}{${b} \\div ${divisor}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$\\textrm{Answer}=\\frac{${numerator_1}}{${denominator_1}}$`}</Latex>
                    </Box>
                    {/* <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$={${wholenumber}} \\frac{${remainder}}{${denominator_2}}$`}</Latex>
                    </Box> */}
                </Typography>
            );
        }
        else{
            return(
                <Typography>
                     <Typography>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} \\div ${divisor}}{${b} \\div ${divisor}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1}}{${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$\\textrm{Answer}={${props.sign} ${wholenumber}} \\frac{${Math.abs(remainder)}}{${Math.abs(denominator_2)}}$`}</Latex>
                    </Box>
                </Typography>
                </Typography>
            );
        }
    }

    if((Math.abs(divisor)  > 1) && (Math.abs(b) > Math.abs(a))){
        var numerator_1 = a / divisor
        var denominator_1 = b / divisor
        
        //find mixed fraction
        console.log(`${numerator_1}/${denominator_1}`)
        return(
            <Typography>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$=\\frac{${a}}{${b}}$`}</Latex>
                </Box>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$=\\frac{${a} \\div ${divisor}}{${b} \\div ${divisor}}$`}</Latex>
                </Box>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}=\\frac{${numerator_1}}{${denominator_1}}$`}</Latex>
                </Box>
            </Typography>
        );
    }

    //if divisor is a decimal
    else{
        return(
            <Typography>
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}=\\frac{${a}}{${b}}$`}</Latex>
                </Box>
            </Typography>
        );
    }
    return(
        <p>Steps has error</p>
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