import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
var Latex = require('react-latex');


export function Ratio(props:any){
    const [inputValue, setInputValue] = useState([...props.data])

    useEffect(()=>{
        setInputValue(props.data)
    },[...props.data])

    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
            <Box sx={{marginBottom: 2}}>
                <Latex displayMode={true}>{`$A : B = C : D$`}</Latex>
                
            </Box>
            {/* <Box>
                <Latex displayMode={true}>{`$=A : B = C : D$`}</Latex>
            </Box> */}
            <RatioSteps data={props.data}/>
        </Typography>
    );
}

function RatioSteps(props:any){
    const [inputValue, setInputValue] = useState([...props.data])

    useEffect(()=>{
        setInputValue(props.data)
    },[...props.data])

    if(inputValue[0] === ''){
        return(
            <>
                <Box>
                    <Latex displayMode={true}>{`$${"A"} : ${inputValue[1]} = ${inputValue[2]}  : ${inputValue[3]} $`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"A"} = \\frac{${inputValue[2]}}{${inputValue[3]}} \\div \\frac{1}{${inputValue[1]}} $`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"A"} = \\frac{${inputValue[2]}}{${inputValue[3]}} \\times ${inputValue[1]}$`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"A"} = \\frac{${findProduct(inputValue[2], inputValue[1])}}{${inputValue[3]}}$`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"A"} = ${divideNumbers(findProduct(inputValue[2], inputValue[1]), inputValue[3])}$`}</Latex>
                </Box>
            </>
        );
    }

    if(inputValue[1] === ''){
        return(
            <>
                <Box>
                    <Latex displayMode={true}>{`$${inputValue[0]} : ${"B"} = ${inputValue[2]}  : ${inputValue[3]} $`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"B"} =${inputValue[0]} \\times \\frac{${inputValue[3]}}{${inputValue[2]}} $`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"B"} = \\frac{${findFloatProduct(inputValue[0], inputValue[3])}}{${inputValue[2]}}$`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"B"} = ${divideNumbers(findFloatProduct(inputValue[0], inputValue[3]), inputValue[2])}$`}</Latex>
                </Box>
            </>
        );
    }

    if(inputValue[2] === ''){
        return(
            <>
                <Box>
                    <Latex displayMode={true}>{`$${inputValue[0]} : ${inputValue[1]} = ${"C"}  : ${inputValue[3]} $`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"C"} = \\frac{${inputValue[0]}}{${inputValue[1]}} \\div \\frac{1}{${inputValue[3]}} $`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"C"} = \\frac{${inputValue[0]}}{${inputValue[1]}} \\times ${inputValue[3]}$`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"C"} = \\frac{${findProduct(inputValue[0], inputValue[3])}}{${inputValue[1]}}$`}</Latex>
                </Box>
                <Box>
                    <Latex displayMode={true}>{`$${"C"} = ${divideNumbers(findProduct(inputValue[0], inputValue[3]), inputValue[1])}$`}</Latex>
                </Box>
            </>
        );
    }

    if(inputValue[3] === ''){
        return(
            <>
            <Box>
                <Latex displayMode={true}>{`$${inputValue[0]} : ${inputValue[2]} = ${inputValue[2]}  : ${"D"} $`}</Latex>
            </Box>
            <Box>
                <Latex displayMode={true}>{`$${"D"} =${inputValue[2]} \\times \\frac{${inputValue[1]}}{${inputValue[0]}} $`}</Latex>
            </Box>
            <Box>
                <Latex displayMode={true}>{`$${"D"} = \\frac{${findFloatProduct(inputValue[2], inputValue[1])}}{${inputValue[0]}}$`}</Latex>
            </Box>
            <Box>
                <Latex displayMode={true}>{`$${"D"} = ${divideNumbers(findFloatProduct(inputValue[2], inputValue[1]), inputValue[0])}$`}</Latex>
            </Box>
        </>
        );
    }

    if(
        inputValue[0] !== '' &&  
        inputValue[1] !== '' &&  
        inputValue[2] !== '' &&  
        inputValue[3] !== '' 
        ){
            var value_1 = divideNumbers(inputValue[0],inputValue[1])
            var value_2 = divideNumbers(inputValue[2],inputValue[3])

            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                    {/* <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$Formula=A : B = C : D$`}</Latex>
                        
                    </Box> */}
                    <Box>
                        <Latex displayMode={true}>{`$=${value_1} = ${value_1} $`}</Latex>
                    </Box>

                </Typography>
            );
    }

    return(
        <Box>Error here</Box>
    );
}


function findFloatProduct(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return (a * b)
}

function findProduct(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)

    return ((a * b) *10) / 10
}

function divideNumbers(num_1:any, num_2:any){
    const a = parseFloat(num_1)
    const b = parseFloat(num_2)
    var ans = a /b
    return parseFloat(ans.toFixed(4));
}

