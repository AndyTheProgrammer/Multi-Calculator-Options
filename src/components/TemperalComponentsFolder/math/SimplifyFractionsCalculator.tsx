import React, { useRef, useState, useEffect }from 'react';
import { NavBar2 } from '../../navbar/navbar2';
import CustomForm from '../../forms/CustomForm';
import { Field, Form, Formik, FormikProps } from 'formik';
import { mathMainService } from '../../../services/mathService/mathMainService';
import Anime from 'react-animejs-wrapper';
import AddLayout from '../../layouts/AddLayout';
import { Box, Grid, Typography } from '@mui/material';
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles';
import { CustomFormikFormFraction2, CustomFormikOptions } from '../../forms/CustomForm';
import TextCard from '../../utilityComponents/TextCard';
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn';
import fractions from '../../../common/assets/fractions_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import SimplifyFraction from '../wigets/fractions/SimplifyFraction'
import validateNumbers from '../../../utilities/validators/validateNumbers'
var classNames = require('classnames');
var Latex = require('react-latex');

function SimplifyFractionsCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [inputValue, setInputValue] = useState(['2','10','4'])
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
        <NavBar2 pageimage={math_icon} categoryname="Fraction Calculator" pagename="Simplify Fractions Calculator"/>
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
                            valueA: inputValue[0],
                            valuea: inputValue[1],
                            valueb: inputValue[2],
                            method: "SimplifyFractionsCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                valueA: values.valueA,
                                valuea: values.valuea,
                                valueb: values.valueb,
                                method: values.method
                            }
                            setInputValue([
                                values.valueA,
                                values.valuea,
                                values.valueb
                            ])

                            var validate = validateNumbers([
                                values.valueA,
                                values.valuea,
                                values.valueb
                            ])
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setControlAnimation(true)
                                    setValue([responseData.message.answer])
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
                            
                        {(props: FormikProps<any>) => (
                            <Form>
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
                                                        marginBottom:3,
                                                        display:'flex', justifyContent:'center'
                                                    }}>
                                                    <Latex displayMode={true}>{`$ {a}\\frac{b}{c} = \\frac{ac + b}{c}$`}</Latex>
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box 
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center'}}>
                                                    <Box 
                                                        sx={{ 
                                                            width: 100,
                                                            paddingLeft: '5px',
                                                            paddingRight: '5px',
                                                            marginTop: 2.5,
                                                            border:'0px solid red'
                                                        }}>
                                                        <Field
                                                            type="text"
                                                            name="valueA"
                                                            component={CustomFormikFormFraction2}
                                                        />
                                                    </Box>
                                                    <Box sx={{ 
                                                            width: 100,
                                                            paddingLeft: '5px',
                                                            paddingRight: '5px'
                                                        }}>
                                                        <Box sx={{ width: '100%'}}>
                                                            <Field
                                                                    type="text"
                                                                    name="valuea"
                                                                    component={CustomFormikFormFraction2}
                                                                />
                                                        </Box>
                                                        <Box sx={{ 
                                                                width: '100%',
                                                                paddingLeft: '0px',
                                                                paddingRight: '0px'
                                                                }}>
                                                            <Box 
                                                                sx={{
                                                                    backgroundColor: '#b5b5b5',
                                                                    width: '100%',
                                                                    borderRadius: 1,
                                                                    height: 2,
                                                                    marginTop: 0.5,
                                                                    marginBottom: 0.5,
                                                                    color: '#3023AE'
                                                                }}></Box>
                                                        </Box>
                                                        <Box sx={{ width: '100%'}}>
                                                            <Field
                                                                    type="text"
                                                                    name="valueb"
                                                                    component={CustomFormikFormFraction2}
                                                                />
                                                        </Box>
                                                </Box>
                                                <Typography sx={{fontSize: 18}}>
                                                    <Latex displayMode={true}>{`$\\hspace{.1cm}=\\hspace{.1cm}?$`}</Latex>
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
                        <Box 
                            sx={{ 
                                    display: 'flex',
                                    borderRadius: 20,
                                    marginBottom: 2,  
                                    backgroundColor:'#4072B5',
                                    justifyContent: 'center'
                                }}>
                                <Box sx={{height:25, width: '100%' }}>
                                    <Typography>
                                        <Box
                                            sx={{
                                                color:'white',
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
                            <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                <Box sx={{marginBottom: 0}}>
                                    <Latex displayMode={true}>{`$ {a}\\frac{b}{c} = \\frac{ac + b}{c}$`}</Latex>
                                </Box>
                            </Typography>
                            <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                <Box sx={{marginBottom: 0}}>
                                    <Latex displayMode={true}>{`$={${inputValue[0]}}\\frac{${inputValue[1]}}{${inputValue[2]}} $`}</Latex>
                                </Box>
                            </Typography>
                            <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                <Box sx={{marginBottom: 0}}>
                                    <Latex displayMode={true}>{`$=\\frac{(${inputValue[2]} \\times ${inputValue[0]}) + ${inputValue[1]}}{${inputValue[2]}} $`}</Latex>
                                </Box>
                            </Typography>
                            <SimplifyFraction data={inputValue}/>
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

export default SimplifyFractionsCalculator