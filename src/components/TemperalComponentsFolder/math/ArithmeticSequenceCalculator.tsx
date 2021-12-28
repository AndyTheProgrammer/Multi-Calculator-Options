/**
 * THIS MAKES THE Arithmetic Sequence Calculator FORM
 */
import stats_icon from '../../../common/assets/stats_icon.svg';

import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps,  useFormik } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { errorText }  from '../../../styling/textStyle'
import math_icon from '../../../common/assets/math_icon.svg';
import stats from '../../../common/assets/stats_icon.svg';
const Latex = require('react-latex');

 interface Errors{
    first_term: string,
    common_difference: string,
    number_of_observation: string
 }

export default function ArithmeticSequenceCalculator(){
    const [value, setValue] = useState("")
    const [playAnimation, setPlayAnimation] = useState(false)
    const [mediaQueryValue, setMediaQueryValue] = useState(false)
    const animatedSquaresRef1 = useRef(null)
    const animatedSquaresRef2= useRef(null)
  
    // @ts-ignore: Object is possibly 'null'.
    const play1 = () => animatedSquaresRef1.current.play();
    // @ts-ignore: Object is possibly 'null'.
    const play2 = () => animatedSquaresRef2.current.play();
    // @ts-ignore: Object is possibly 'null'.
    const reverse1 = () => animatedSquaresRef1.current.reverse();
    // @ts-ignore: Object is possibly 'null'.
    const reverse2 = () => animatedSquaresRef2.current.reverse();

    
    const controlAnimation = () => {
        if(mediaQueryValue){
            if(playAnimation){
                // console.log("Monkey")
                play1();
                play2();
                reverse1();
                reverse2();
                setValue("");
                setPlayAnimation(false);
            }
        }
        else{
            setValue("");
        }
    } 

    useEffect(()=>{
        const mediaQuery = window.matchMedia('(min-width: 1000px)');
        setMediaQueryValue(mediaQuery.matches);
        console.log(mediaQuery);
        if (mediaQuery.matches) {
            if(value){
                play1();
                play2();
                setPlayAnimation(true)
            }
          } 
    })

    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="Statistics Calculators"  pagename="Arithmetic Sequence Calculator" />
        <AddLayout categorykey='statistics' searchname='Statistics Calculators' searchimage={stats}>
            <Box sx={{ display: 'flex', justifyContent:'center'}}>
            <Box className='animated-content-center'>
                
                <Anime
                    className='animated-pos animated-margin'
                    ref={animatedSquaresRef1}
                    config={{
                        translateX: -250,
                        easing: 'easeInOutSine',
                        autoplay: false,
                        duration: 250
                    }}>
                    <Box 
                        sx={{ maxWidth: 450,paddingBottom: 1 }}
                        className="animated-box" >
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{height:25, width: '100%' }}>
                                <Typography>
                                    <Box sx={{ fontSize: 12, paddingTop: 0.5, paddingLeft: 2, width: '100%', ...labelStyle }}>
                                        <Latex displayMode={false}>{`$Formula = a+(n-1)d$`}</Latex>
                                    </Box>
                                </Typography>
                            </Box>
                            <Box sx={{ ...formCardStyle }}></Box>
                        </Box>
                        <Formik
                            initialValues={{ 
                                first_term:"",
                                common_difference: "",
                                number_of_observation: "",
                                method: "ArithmeticSequenceCalculator"
                            }}
                            validate={
                                (values)=>{
                                    const errors = {} as Errors
                                    if(!values.first_term){
                                        errors.first_term = 'Required'
                                    }
                                    else if(!parseInt(values.first_term)){
                                        errors.first_term = 'Number is required'
                                    }

                                    if(!values.common_difference){
                                        errors.common_difference = 'Required'
                                    }
                                    else if(!parseInt(values.common_difference)){
                                        errors.common_difference = 'Number is required'
                                    }

                                    if(!values.number_of_observation){
                                        errors.number_of_observation = 'Required'
                                    }
                                    else if(!parseInt(values.number_of_observation)){
                                        errors.number_of_observation = 'Number is required'
                                    }

                                    return errors
                                }
                            }
                            onSubmit = {(values, actions)=>{
                                const data = {
                                    first_term: values.first_term,
                                    common_difference: values.common_difference,
                                    number_of_observation: values.number_of_observation,
                                    method: values.method
                                }
    
                                const postData = async () => {
                                    console.log(data)
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setValue(responseData.message.answer)
                                    }
                                }
                                postData()
                                
                            }}>
                                
                            {({
                                errors,
                                values,
                                handleChange,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box sx={{minHeight: 250, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                            <Grid item={true} xs={7}>
                                                <Box sx={{ ...labelStyle }}>First Term</Box>
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <CustomForm
                                                    type="text"
                                                    name="first_term"
                                                    onChange={handleChange}
                                                    value={values.first_term}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.first_term}</Box>
                                                </Typography>
                                            </Grid>
                    
                                            <Grid item xs={7}>
                                                <Box sx={{ ...labelStyle }}>Common Difference</Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <CustomForm
                                                    type="text"
                                                    name="common_difference"
                                                    onChange={handleChange}
                                                    value={values.common_difference}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.common_difference}</Box>
                                                </Typography>
                                            </Grid>
                                        
                                            <Grid item xs={7}>
                                                <Box sx={{ ...labelStyle }}>No# of Observations</Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <CustomForm
                                                    type="text"
                                                    name="number_of_observation"
                                                    onChange={handleChange}
                                                    value={values.number_of_observation}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.number_of_observation}</Box>
                                                </Typography>
                                            </Grid>                    
                                        </Grid>
                                        
                                        <Box sx={{flexGrow: 1}}>
                                            {/* 
                                                Flex box pushes submit button down
                                            */}
                                        </Box>

                                        {/* button containers */}
                                        <Box 
                                            // className="toggle-box-primary"
                                            sx={{ width: '100%' }}
                                            >
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                            <Grid item xs={4}>
                                                    <Box sx={{display:"flex", justifyContent:"start"}}>
                                                        <CustomFormBtn 
                                                        type="button" 
                                                        handleClick={()=>{ 
                                                            controlAnimation();
                                                         }} 
                                                        name="Clear"/>
                                                    </Box>
                                            </Grid>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={4}>
                                                    <Box sx={{display:"flex", justifyContent:"end"}}>
                                                        <CustomFormImageBtn type="submit" name="Calculate"/>
                                                    </Box>
                                            </Grid>
                                            </Grid>
                                        </Box>                   
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Anime>
    
    
                {/*
                    Component displays the results 
                
                */}
    
                <Anime
                    className='animated-pos'
                    style={{
                        zIndex: -5
                    }}
                    ref={animatedSquaresRef2}
                    config={{
                        translateX: 200,
                        easing: 'easeInOutSine',
                        autoplay: false,
                        duration: 250
                    }}>
                     {
                         (value)?
                         <Box 
                            sx={{ maxWidth:400,paddingBottom: 1 }}
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
        
                            <Box sx={{marginLeft: 5}}>
                                <Box sx={{marginBottom: 2}}>
                                    <Latex displayMode={false}>{`$a_{n} = a+(n-1)d$`}</Latex>
                                </Box>
                                <Box sx={{marginBottom: 2}}>
                                    <Latex displayMode={false}>{`$S_{n} = \\displaystyle \\sum_{i=1}^N t_i$`}</Latex>
                                </Box>
                                <Box sx={{marginBottom: 2}}>
                                    <Latex displayMode={false}>{`$answer = ${value}$`}</Latex>
                                </Box>
                            </Box>
                        </Box>
                        :<Box></Box>
                     }
                </Anime>
                </Box>
            </Box>
        </AddLayout>
        </>
    );
}