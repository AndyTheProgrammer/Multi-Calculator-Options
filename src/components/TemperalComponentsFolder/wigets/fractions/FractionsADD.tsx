import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SimplifyFraction from './SimplifyFraction'
import findGreatest from '../../../../utilities/findGreatest';

var Latex = require('react-latex');

export default function FractionsADD(props:any){
    const[arr, setArr] = useState<any[]>([])
    console.log("From add fractions", arr.toString())
    var a = parseFloat(arr[0])
    var b = parseFloat(arr[1])

    var c = parseFloat(arr[2])
    var d = parseFloat(arr[3])

    useEffect(()=>{
        setArr([...props.data])
        console.log("From add fractions", arr.toString())
    },[props.data])

    if((a % 1 === 0) && (b % 1 === 0) && (c % 1 === 0) && (d % 1 === 0)){
        if(b === d){
            var numerator = a+c
            var denominator = b
            console.log(`${numerator} / ${denominator}`)
    
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                     <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} + ${c}}{${denominator}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator}}{${denominator}}$`}</Latex>
                    </Box>
                    <SimplifyFraction data={[numerator, denominator]}/>
                </Typography>
            );
        }
    
        // b > d 
        if(Math.abs(b) > Math.abs(d) && (Math.abs(b) % Math.abs(d) === 0)){
            console.log("b > d ehre")
            var multiplyer = b/d
            var numerator_1 = c * multiplyer
            var denominator_1 = d * multiplyer
            var value_1 = a + numerator_1
            var value_2 = denominator_1
    
            console.log(`${value_1} / ${value_2}`)
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c} \\times ${multiplyer}}{${d} \\times ${multiplyer}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${numerator_1}}{${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} + ${numerator_1}} {${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${value_1}} {${value_2}}$`}</Latex>
                    </Box>
                    <SimplifyFraction data={[value_1, value_2]}/>
                </Typography>
            );
        }
    
        if((Math.abs(b) > Math.abs(d) && (Math.abs(b) % Math.abs(d) > 0)) || (Math.abs(d) > Math.abs(b) && (Math.abs(d) % Math.abs(b) > 0))){
            console.log("NO MODE")
            var numerator_1 = a * d
            var denominator_1 = b * d
    
            var numerator_2 = c * b
            var denominator_2 = d * b
    
            var value_1 = numerator_1 + numerator_2
            var value_2 = denominator_1
    
            console.log(`${value_1} / ${value_2}`)
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} \\times ${d}}{${b} \\times ${d}} + \\frac{${c} \\times ${b}}{${d} \\times ${b}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1}}{${denominator_1}} + \\frac{${numerator_2}}{${denominator_2}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1} + ${numerator_2}}{${denominator_1}} $`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${value_1}}{${value_2}} $`}</Latex>
                    </Box>
                    <SimplifyFraction data={[value_1, value_2]}/>
                </Typography>
            );
        }
    
        // d > b
        if(Math.abs(d) > Math.abs(b) && (Math.abs(d)%Math.abs(b) === 0)){
            console.log("d > b")
            var multiplyer = d/b
            var numerator_1 = a * multiplyer
            var denominator_1 = b * multiplyer
    
            var value_1 = numerator_1 + c
            var value_2 = denominator_1
    
            console.log(`${value_1} / ${value_2}`)
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                   <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} \\times ${multiplyer}}{${b} \\times ${multiplyer}} + \\frac{${c} }{${d} }$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1}}{${denominator_1}} + \\frac{${c} }{${d} }$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1} + ${c}} {${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${value_1}} {${value_2}}$`}</Latex>
                    </Box>
                    <SimplifyFraction data={[value_1, value_2]}/>
                </Typography>
            );
        }
    
    }
    else{
        //here fraction contains decimal
        var decimal_count_a = decimalCount(a)
        var decimal_count_b = decimalCount(b)
        var decimal_count_c = decimalCount(c)
        var decimal_count_d = decimalCount(d)

        var largest:number = findLargest(
            decimal_count_a,
            decimal_count_b,
            decimal_count_c,
            decimal_count_d
        )

        var multiplyer = Math.pow(10,largest)
        var value1 = a * multiplyer
        var value2 = b * multiplyer
        var value3 = c * multiplyer
        var value4 = d * multiplyer
        
        a = parseInt(`${value1}`)
        b = parseInt(`${value2}`)
        c = parseInt(`${value3}`)
        d = parseInt(`${value4}`)

        if(b === d){
            var numerator = a+c
            var denominator = b
            console.log(`${numerator} / ${denominator}`)
    
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                     <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} + ${c}}{${denominator}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator}}{${denominator}}$`}</Latex>
                    </Box>
                    <SimplifyFraction data={[numerator, denominator]}/>
                </Typography>
            );
        }
    
        // b > d 
        if(Math.abs(b) > Math.abs(d) && (Math.abs(b) % Math.abs(d) === 0)){
            console.log("b > d ehre")
            var multiplyer = b/d
            var numerator_1 = c * multiplyer
            var denominator_1 = d * multiplyer
            var value_1 = a + numerator_1
            var value_2 = denominator_1
    
            console.log(`${value_1} / ${value_2}`)
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c} \\times ${multiplyer}}{${d} \\times ${multiplyer}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${numerator_1}}{${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} + ${numerator_1}} {${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${value_1}} {${value_2}}$`}</Latex>
                    </Box>
                    <SimplifyFraction data={[value_1, value_2]}/>
                </Typography>
            );
        }
    
        if((Math.abs(b) > Math.abs(d) && (Math.abs(b) % Math.abs(d) > 0)) || (Math.abs(d) > Math.abs(b) && (Math.abs(d) % Math.abs(b) > 0))){
            console.log("NO MODE")
            var numerator_1 = a * d
            var denominator_1 = b * d
    
            var numerator_2 = c * b
            var denominator_2 = d * b
    
            var value_1 = numerator_1 + numerator_2
            var value_2 = denominator_1
    
            console.log(`${value_1} / ${value_2}`)
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} \\times ${d}}{${b} \\times ${d}} + \\frac{${c} \\times ${b}}{${d} \\times ${b}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1}}{${denominator_1}} + \\frac{${numerator_2}}{${denominator_2}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1} + ${numerator_2}}{${denominator_1}} $`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${value_1}}{${value_2}} $`}</Latex>
                    </Box>
                    <SimplifyFraction data={[value_1, value_2]}/>
                </Typography>
            );
        }
    
        // d > b
        if(Math.abs(d) > Math.abs(b) && (Math.abs(d)%Math.abs(b) === 0)){
            console.log("d > b")
            var multiplyer = d/b
            var numerator_1 = a * multiplyer
            var denominator_1 = b * multiplyer
    
            var value_1 = numerator_1 + c
            var value_2 = denominator_1
    
            console.log(`${value_1} / ${value_2}`)
            return(
                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                   <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${a} \\times ${multiplyer}}{${b} \\times ${multiplyer}} + \\frac{${c} }{${d} }$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1}}{${denominator_1}} + \\frac{${c} }{${d} }$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${numerator_1} + ${c}} {${denominator_1}}$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={true}>{`$=\\frac{${value_1}} {${value_2}}$`}</Latex>
                    </Box>
                    <SimplifyFraction data={[value_1, value_2]}/>
                </Typography>
            );
        }
    }
    return(
        <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
           
        </Typography>
    );

}

//

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

 function findLargest(one:number, two:number, three:number, four:number){
    var largest = 0;
    var a = 0;
    var b = 0;
    if(one>two){
        a = one;
    }
    else{
        a = two;
    }
   
    if(three>four){
        b = three;
    }
    else{
        b = four;
    }
   
   if(a>b){
        largest = a
    }
   else if(b>a){
        largest = b
    }

    return largest
}
