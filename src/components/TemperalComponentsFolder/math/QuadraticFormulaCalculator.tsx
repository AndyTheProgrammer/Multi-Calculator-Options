import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import algebra_icon from '../../../common/assets/algebra_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import Quadratic from '../wigets/quadratic/Quadratic'
var classNames = require('classnames');
var Latex = require('react-latex');

function QuadraticFormulaCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [playAnimation, setPlayAnimation] = useState(false)
    const [inputValue, setInputValue] = useState(['7','20','43'])
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue(['','',''])
        setErrorMSG(false)
        console.log(inputValue)
    }



    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="Algebra Calculators" pagename="Quadratic Formula Calculator"/>
        <AddLayout categorykey='algebra' searchname='Algebra Calculators' searchimage={algebra_icon}>
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
                            a: inputValue[0],
                            b: inputValue[1],
                            c: inputValue[2],
                            method: "QuadraticFormulaCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                a: values.a,
                                b: values.b,
                                c: values.c,
                                method: values.method
                            }

                            setInputValue([
                                values.a,
                                values.b,
                                values.c
                            ])

                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setControlAnimation(true)
                                    setValue([
                                        responseData.message.partB,
                                        responseData.message.$partA
                                    ])
                                }
                            }
                            postData()
                        }}>
                            
                        {(props: FormikProps<any>) => (
                            <Form >
                                <Box sx={{ width: '100%', marginBottom: 1 }}>
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
                                                    fontStyle: 'bold',
                                                    fontSize: 14,
                                                    fontWeight: 100,
                                                    display:'flex',
                                                    justifyContent:'center'
                                                }}>
                                                <Latex displayMode={true}>{`$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{{2}{a}}$`}</Latex>
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display:'flex', justifyContent: 'center', padding: 1, marginTop: 1 }}>
                                        <Box sx={{ display:'flex', justifyContent: 'center', padding: 1}}>
                                            <Typography>
                                                <Box sx={{...labelStyle}}>
                                                    a =
                                                </Box>
                                            </Typography>
                                            <Box sx={{ width: 100}}>
                                                <Field
                                                    type="text"
                                                    name="a"
                                                    component={CustomFormikForm}
                                                />
                                            </Box>
                                        </Box>
                                        <Box 
                                            sx={{ 
                                                    display:'flex', 
                                                    justifyContent: 'center', 
                                                    padding: 1,
                                                }}>
                                            <Typography>
                                                <Box sx={{...labelStyle}}>
                                                    b =
                                                </Box>
                                            </Typography>
                                            <Box sx={{ width: 100}}>
                                                <Field
                                                    type="text"
                                                    name="b"
                                                    component={CustomFormikForm}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display:'flex', justifyContent: 'center', padding: 1}}>
                                            <Typography>
                                                <Box sx={{...labelStyle}}>
                                                    c =
                                                </Box>
                                            </Typography>
                                            <Box sx={{ width: 100}}>
                                                <Field
                                                    type="text"
                                                    name="c"
                                                    component={CustomFormikForm}
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
                            </Form>
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
                            </Box>
                            <Box sx={{paddingLeft: 3}}>
                                <Typography sx={{ fontSize: 16, border:'none' }}>
                                    <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                        Calculation Steps:
                                    </Box>
                                </Typography>
                                <Quadratic data={inputValue}/>
                                <Box sx={{marginBottom: 2}}>
                                    <Latex displayMode={true}>{`$\\textrm{Answer}= ${value[0].toFixed(8)} \\; or \\; ${value[1].toFixed(8)}$`}</Latex>
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

export default QuadraticFormulaCalculator