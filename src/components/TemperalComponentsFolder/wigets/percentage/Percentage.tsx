import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SimplifyFraction from '../fractions/SimplifyFraction'
var Latex = require('react-latex');

function subtractNumbers(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a - b)
}

function divideNumbers(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)
    var ans = a /b
    return parseFloat(ans.toFixed(4));
}

function findProductFloat(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)
    var ans = a * b
    return parseFloat(ans.toFixed(4));
}

function addNumbers(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a + b)
}

export function PercentageChange(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    var difference = subtractNumbers(inputValue[1], inputValue[0])
    var qoutient = divideNumbers(difference, inputValue[0])
    var product =findProductFloat(qoutient, 100)

    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])
    
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$\\frac{\\left(V_2 - V_1\\right)}{|V_1|} \\times ${100} = ?$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{\\left(${inputValue[1]} - ${inputValue[0]}\\right)}{|${inputValue[0]} |} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${difference}}{${inputValue[0]}} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${qoutient} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${product}\\% \\; \\textrm{change}$`}</Latex>
            </Box>
            {
                (difference>=0)?
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}=${product}\\% \\; \\textrm{increase}$`}</Latex>
                </Box>
                :
                <Box sx={{marginBottom: 2}}>
                    <Latex displayMode={true}>{`$\\textrm{Answer}=${product} \\% \\; \\textrm{decrease}$`}</Latex>
                </Box>
            }
        </Typography>
    );
}

export function PercentageDifference(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    var difference = Math.abs(subtractNumbers(inputValue[0], inputValue[1]))
    var sum = addNumbers(inputValue[0], inputValue[1])
    var qoutient = divideNumbers(difference, inputValue[0])
    var product =findProductFloat(qoutient, 100)

    var equation_qoutient_1 = divideNumbers(sum, 2)
    var equation_qoutient_2 = divideNumbers(difference, equation_qoutient_1)
    var answer = findProductFloat(equation_qoutient_2, 100)

    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{|V_1 - V_2|}{\\begin{bmatrix} \\frac{V_1 + V_2}{2}\\end{bmatrix}} \\times ${100} = ?$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{|${inputValue[0]} - ${inputValue[1]}|}{[\\frac{${inputValue[0]} + ${inputValue[1]}}{2}]} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{|${difference}|}{[\\frac{${sum}}{2}]} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${difference}}{${equation_qoutient_1}} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${equation_qoutient_2} \\times ${100}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${answer} \\% \\; \\textrm{difference}$`}</Latex>
            </Box>
        </Typography>
    );
}

export function PercentageError(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    var a = inputValue[0];
    var b = inputValue[1];
    var difference = Math.abs(subtractNumbers(a,b))
    var qoutient = divideNumbers(difference, b)
    var product = findProductFloat(qoutient, 100)

    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$\\frac{|\\textrm{V}_{observed} - \\textrm{V}_{true}|}{|\\textrm{V}_{true}|}\\times 100 = ?$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${a}- ${b}}{${b}} \\times 100$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${difference}}{|${b}|} \\times 100$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${qoutient} \\times 100$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=${product}$`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$\\textrm{Answer}=${product}\\% \\; error$`}</Latex>
            </Box>
        </Typography>
    );
}


export function PercentageCalc(props:any){
    const [inputValue, setInputValue] = useState([...props.data])
    var v1 = inputValue[0]
    var v2 = inputValue[1]

    var v3 = v1 / 100
    var v4 = v3 * v2;
    var answer = v4.toFixed(8)

    useEffect(()=>{
        setInputValue([...props.data])
    },[props.data])
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>    
            <Box sx={{marginBottom: 2}}>
                {v1} % of {v2} = ?
            </Box>                            
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$=\\frac{${v1}}{100} \\times {${v2}}\% $`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$={${v3}} \\times {${v2}}\% $`}</Latex>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$\\textrm{Answer}={${answer}}\% $`}</Latex>
            </Box>
        </Typography>
    );
}