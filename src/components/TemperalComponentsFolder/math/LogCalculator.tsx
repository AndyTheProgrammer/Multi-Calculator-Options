import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm, {CustomFormFraction} from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import algebra_icon from '../../../common/assets/algebra_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
var classNames = require('classnames');
var Latex = require('react-latex');

function LogCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [inputValue, setInputValue] = useState(['15','3'])
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue(['',''])
        setErrorMSG(false)
        console.log(inputValue)
    }


    return(
        <>
        <NavBar2 pageimage={math_icon} pagename="Log Calculator"/>
        <AddLayout categorykey='algebra' searchname='Algebra Calculators' searchimage={algebra_icon}>
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
                            <Box sx={{height:2, width: '100%' }}></Box>
                        </Box>
                        <Formik
                            enableReinitialize
                            initialValues={{ 
                                base: inputValue[0],
                                number: inputValue[1],
                                method: "LogCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    base: values.base,
                                    number: values.number,
                                    method: values.method
                                }
                                setInputValue([
                                    values.base,
                                    values.number
                                ])
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    console.log(responseData.message.answer);
                                    if(msg === "success"){
                                        setControlAnimation(true)
                                        setValue([responseData.message.answer]);
                                    }
                                }
                                postData()
                            }}>
                                
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                        <Box 
                                            sx={{
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                            }}>
                                            <Typography sx={{marginBottom: 1}}>    
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        display:'flex',
                                                        justifyContent:'center'
                                                    }}>
                                                    <Latex displayMode={true}>{`$\\textrm{Log}_${"n"}^{${"x"}}= ${"y"} $`}</Latex>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        fontStyle: 'bold',
                                                        fontSize: 14,
                                                        color: '#b0b0b0',
                                                        marginBottom:1,
                                                        marginLeft:0,
                                                        textAlign:'center'
                                                    }}>
                                                    <i>Provide any two of the three values in the equation</i> 
                                                </Box>
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginTop: 3, display:'flex', justifyContent:'center' }}>
                                            <Typography>
                                                <Box 
                                                    sx={{
                                                            ...labelStyle,
                                                            marginTop: 2
                                                        }}>
                                                    Log
                                                </Box>
                                            </Typography>
                                            <Box sx={{width:70}}>
                                                <Box 
                                                    sx={{ 
                                                            width: 70,
                                                            marginBottom: 0.5
                                                        }}>
                                                    <CustomFormFraction
                                                        type="text"
                                                        name="base"
                                                        onChange={handleChange}
                                                        value={values.base}
                                                        placeholder="b"
                                                    />
                                                </Box>
                                                <Box sx={{ width: 70}}>
                                                    <CustomFormFraction
                                                        type="text"
                                                        name="number"
                                                        onChange={handleChange}
                                                        value={values.number}
                                                        placeholder="X"
                                                    />
                                                </Box>
                                            </Box>
                                            <Typography sx={{width:10}}>
                                                <Box 
                                                    sx={{ 
                                                            width: '100%',
                                                            marginTop: 2
                                                        }}>
                                                        =
                                                </Box>
                                            </Typography>
                                            <Box sx={{width:70}}>
                                                <Box 
                                                    sx={{ 
                                                            width: 70,
                                                            marginTop: 2
                                                        }}>
                                                    <CustomFormFraction
                                                        type="text"
                                                        name="base"
                                                        onChange={handleChange}
                                                        value={values.base}
                                                        placeholder="b"
                                                    />
                                                </Box>
                                            </Box>
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
                                            marginTop: 4,
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
                            sx={{ maxWidth: 400,paddingBottom: 1 }}
                            className="animated-box" >
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Box sx={{height:25, width: '100%' }}>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    color:'#4072B5',
                                                    fontWeight:'bold', 
                                                    textAlign:'center'
                                                }}>Result</Box>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ...formCardStyle }}></Box>
                                </Box>
                                <Box sx={{paddingLeft: 3}}>
                                    <Typography sx={{ fontSize: 16, border:'none' }}>
                                        <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                            Calculation Steps:
                                        </Box>
                                    </Typography>
                                    <Box sx={{width:'100%'}}>
                                        <Latex displayMode={true}>{`$\\textrm{Log}_{${inputValue[0]}} {${inputValue[1]}}= ${value} $`}</Latex>
                                    </Box>
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

export default LogCalculator