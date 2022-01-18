import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm, { CustomFormFraction } from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper';
import AddLayout from '../../layouts/AddLayout';
import { Box, Grid, Typography } from '@mui/material';
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles';
import TextCard from '../../utilityComponents/TextCard';
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn';
import fractions from '../../../common/assets/fractions_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import FractionToPercent from '../wigets/fractions/FractionToPercent'
import validateNumbers from '../../../utilities/validators/validateNumbers'
var classNames = require('classnames');
var Latex = require('react-latex');


function FractionToPercentageCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [inputValue, setInputValue] = useState(['34','55'])
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue(['','','',''])
        setErrorMSG(false)
        console.log(inputValue)
    }


    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="Fraction Calculator" pagename="Fraction to Percentage Calculator"/>
        <AddLayout categorykey='fractions' searchname='Fractions Calculators' searchimage={fractions}>
            <Typography 
                sx={{
                    paddingLeft: 1.5, 
                    marginBottom: 2,
                    fontFamily: 'Roboto, Helvetica',
                    fontSize: 16
                }}>
                <Box>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.
                </Box>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box className='animated-content-center'>
            {/* ANIMTION STARTS HERE */}
            <Box
                className={
                    classNames({
                        'animated-pos': true,
                        'animated-margin': true,
                        'forward-animation-card-1': controlAnimation,
                        'reverse-animation': !controlAnimation
                    })
                }>
                <Box 
                    sx={{ maxWidth: 450,paddingBottom: 1 }}
                    className="animated-box" >
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{height:2, width: '100%' }}>
                        </Box>
                        {/* <Box sx={{...formCardStyle}}></Box> */}
                    </Box>
                    <Formik
                        enableReinitialize
                        initialValues={{ 
                            top: inputValue[0],
                            bottom: inputValue[1],
                            method: "FractionToPercentageCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                top: values.top,
                                bottom: values.bottom,
                                method: values.method
                            }

                            setInputValue([values.top, values.bottom])
                            var validate = validateNumbers(
                                [values.top, values.bottom]
                            )

                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setControlAnimation(true)
                                    setValue([
                                        responseData.message.decimal,
                                        responseData.message.answer
                                    ])
                                }
                            }
                            if(validate){
                                postData() 
                                setErrorMSG(false)
                                console.log("You can post data")
                            }
                            else{
                                setErrorMSG(true)
                                setControlAnimation(false)
                                setValue([])
                                console.log("You cant post data")
                            }
                        }}>
                            
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                  <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                    <Grid 
                                        container={true} 
                                        rowSpacing={1} 
                                        sx={{ 
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                                marginBottom:4
                                            }}>
                                        <Grid item xs={12}>
                                            <Typography sx={{marginBottom: 1}}>    
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        fontStyle: 'bold',
                                                        fontSize: 14,
                                                        marginBottom:1,
                                                        display:'flex',
                                                        justifyContent:'center'
                                                    }}>
                                                    <Latex displayMode={true}>{`$\\frac{a}{b} \\times 100\\% \\; = C \\% $`}</Latex>
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{display:'flex', justifyContent: 'center'}}>
                                                <Box sx={{
                                                        marginRight: 1,
                                                        width: '100px'
                                                    }}>
                                                    <Box sx={{
                                                        width: '100%',
                                                        display:'flex', 
                                                        justifyContent: 'center' 
                                                        }}>
                                                        <Box sx={{ width: '100%' }}>
                                                            <CustomFormFraction
                                                                type="text"
                                                                name="top"
                                                                onChange={handleChange}
                                                                value={values.top}
                                                                placeholder=""
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display:'flex', 
                                                            justifyContent: 'center', 
                                                            width: '100%',
                                                            paddingLeft: '5px',
                                                            paddingRight: '5px' 
                                                        }}>
                                                        <Box 
                                                            sx={{
                                                                backgroundColor: '#b5b5b5',
                                                                width: '100%',
                                                                borderRadius: 1,
                                                                height: 2,
                                                                marginTop: 0.5,
                                                                marginBottom: 0.5,
                                                                color: '#3023AE',
                                                            }}></Box>
                                                    </Box>
                                                    <Box sx={{
                                                        display:'flex', 
                                                        justifyContent: 'center' 
                                                        }}>
                                                        <Box sx={{ width: '100%' }}>
                                                            <CustomFormFraction
                                                                type="text"
                                                                name="bottom"
                                                                onChange={handleChange}
                                                                value={values.bottom}
                                                                placeholder=""
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Typography sx={{ fontSize: 18, border:'none' }}>
                                                    <Latex displayMode={true}>{`$\\textbf{\\hspace{.1cm}=\\hspace{.1cm}?}$`}</Latex>
                                                </Typography>
                                            </Box>
                                            
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ border:'0px solid red',flexGrow: 1 }}>
                                        {/* 
                                            error message
                                        */}
                                        {
                                            (errorMSG)?
                                            <Typography sx={{width:'100%'}}>
                                                <Box sx={{ color: 'red', textAlign:'center' }}>
                                                    Enter validate non zero numbers
                                                </Box>
                                            </Typography>
                                            :<></>
                                        }
                                    </Box>
                                    <Box sx={{ flexGrow: 1}}>
                                        {/* 
                                            Flex box pushes submit button down
                                        */}
                                    </Box>
                                </Box>
                                <Box 
                                    // className="toggle-box-primary"
                                    sx={{
                                        paddingLeft: 4, paddingRight: 4, 
                                        minWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{display:"flex", justifyContent:"start"}}>
                                            <CustomFormBtn 
                                            type="button" 
                                            handleClick={()=>{
                                                clear()
                                                    
                                                }} 
                                            name="Clear"/>
                                        </Box>
                                    <Box sx={{display:"flex", flexGrow:1, justifyContent:"start"}}>
                                    
                                    </Box>
                                    <Box sx={{display:"flex", justifyContent:"end"}}>
                                        <CustomFormImageBtn 
                                            type="submit" 
                                            name="Calculate"/>   
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>


            {/*
                Component displays the results 
            
            */}

            <Box
                className={
                    classNames({
                        'animated-pos': true,
                        'animated-margin': true,
                        'forward-animation-card-2': controlAnimation,
                        'reverse-animation': !controlAnimation
                    })
                }
                style={{
                    zIndex: -5
                }}>
                {
                    (value.length)?
                    <Box 
                        sx={{ 
                            maxWidth: 400,paddingBottom: 1 }}
                        className="animated-box" >
                        <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                backgroundColor:'#4072B5',
                                borderRadius: 20,
                                marginBottom: 2,  
                            }}>
                            <Box sx={{height:25, width: '100%', }}>
                                <Typography>
                                    <Box
                                        sx={{
                                            color:'white',
                                            fontWeight:'bold', 
                                            paddingLeft:2,
                                            textAlign:'center'
                                        }}>Result</Box>
                                </Typography>
                            </Box>
                            {/* <Box sx={{ ...formCardStyle }}></Box> */}
                        </Box>
                        <Box sx={{paddingLeft: 3}}>
                            <Typography sx={{ fontSize: 16, border:'none' }}>
                                <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                    Calculation Steps:
                                </Box>
                            </Typography>
                            <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                <Box sx={{marginBottom: 0}}>
                                    <Latex displayMode={true}>{`$\\frac{a}{b} \\times 100\\% \\; = C \\% $`}</Latex>
                                </Box>
                            </Typography>
                            <FractionToPercent data={inputValue}/>
                        </Box>
                    </Box>
                    :<Box></Box>
                }
            </Box>
            
            </Box>
            </Box>
            
        </AddLayout>
        </>
    );
}



export default FractionToPercentageCalculator