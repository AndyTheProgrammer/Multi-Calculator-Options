import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
var Latex = require('react-latex');

function squareNumbers(num_1:any, num_2:any){
    var a = parseFloat(num_1)
    var b = parseFloat(num_2)

    var x = Math.pow(a,b)
    return x
}

function squareRoot(num_1:any){
    var a = parseFloat(num_1)

    var x = Math.sqrt(a)
    return x
}


function find2ac(num_1:any, num_2:any, num_3:any){
    var a = parseFloat(num_1)
    var b = parseFloat(num_2)
    var c = parseFloat(num_3)

    var x = a * b * c
    return x
}

function multiply(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a * b)
}


export default function Quadratic(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    const a = inputValue[0]
    const b = inputValue[1]
    const c = inputValue[2]

    var bsquared = squareNumbers(b,2)
    var fourAC = find2ac(4,a,c)
    var twoA = multiply(2,a)
    var difference = bsquared - fourAC
    var check = difference
    var squarerootD = squareRoot(difference)
    var isquarerootD  = ""

    if(difference < 0){
        difference = Math.abs(difference)
        console.log(difference)
        squarerootD = squareRoot(difference)
        console.log(squarerootD )
        isquarerootD = squarerootD.toFixed(4)
        difference = difference * -1
    }
    var minusB = parseFloat(b) * -1
    var v1 = (minusB-squarerootD)
    var v2 = (minusB+squarerootD)
    var i = "i"
    console.log(check)
    console.log(squarerootD)
    console.log(twoA)

    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])

    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{{2}{a}}$`}</Latex>
                <Latex displayMode={true}>{`$x=\\frac{-${b}\\pm\\sqrt{${b}^2-4 \\times ${a} \\times ${c}}}{${twoA}}$`}</Latex>
                <Latex displayMode={true}>{`$x=\\frac{-${b}\\pm\\sqrt{${difference}}}{${twoA}}$`}</Latex>
                {
                    (check < 0)?
                    <Box>
                        <Latex displayMode={true}>{`$x=\\frac{-${b}\\pm ${isquarerootD} {${i}}}{${twoA}}$`}</Latex>
                        {/* <Latex displayMode={true}>{`$\\textrm{Answer}= ${v1} \\; or \\; ${v2}$`}</Latex> */}
                    </Box>
                    :
                    <Box>
                        <Latex displayMode={true}>{`$x=\\frac{-${b}\\pm ${squarerootD}}{${twoA}}$`}</Latex>
                        <Latex displayMode={true}>{`$\\textrm{Answer}= ${v1} \\; or \\; ${v2}$`}</Latex>
                    </Box>
                }
                
            </Box>
        </Typography>
    );
}