import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import TextCard from '../../utilityComponents/TextCard'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import { errorText }  from '../../../styling/textStyle'
const Latex = require('react-latex');

interface Errors{
    sample_size: string,
    sample_mean: string,
    stardard_deviation: string,
    confidence_level: string
 }

function ConfidenceIntervalCalculator(){
    const [value, setValue] = useState<any[]>([])
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
                setValue([]);
                setPlayAnimation(false);
            }
        }
        else{
            setValue([]);
        }
    } 

    useEffect(()=>{
        const mediaQuery = window.matchMedia('(min-width: 1000px)');
        setMediaQueryValue(mediaQuery.matches);
        
        if (mediaQuery.matches) {
            if(value.length){
                play1();
                play2();
                setPlayAnimation(true)
            }
          } 
          
    })

    return(
        <>
        <NavBar2 categoryname="Statistics Calculators" pagename="Confidence interval Calculator"/>
        <AddLayout>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box className='animated-content-center'>
                <Anime
                    className='animated-pos animated-margin'
                    ref={animatedSquaresRef1}
                    config={{
                        translateX: -250,
                        duration: 250,
                        easing: 'easeInOutSine',
                        autoplay: false,
                    }}>
                    <Box 
                        sx={{ maxWidth: 450,paddingBottom: 1 }}
                        className="animated-box" >
                        

                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{height:25, width: '100%' }}></Box>
                            <Box sx={{...formCardStyle}}></Box>
                        </Box>
                        <Formik
                            initialValues={{ 
                                sample_size:"",
                                sample_mean: "",
                                stardard_deviation: "",
                                confidence_level: "",
                                method: "ConfidenceIntervalCalculator"
                            }}
                            validate={
                                (values)=>{
                                    const errors = {} as Errors
                                    if(!values.sample_size){
                                        errors.sample_size = 'Required'
                                    }
                                    else if(!parseInt(values.sample_size)){
                                        errors.sample_size = 'Number is required'
                                    }

                                    if(!values.sample_mean){
                                        errors.sample_mean = 'Required'
                                    }
                                    else if(!parseInt(values.sample_mean)){
                                        errors.sample_mean = 'Number is required'
                                    }

                                    if(!values.stardard_deviation){
                                        errors.stardard_deviation = 'Required'
                                    }
                                    else if(!parseInt(values.stardard_deviation)){
                                        errors.stardard_deviation = 'Number is required'
                                    }

                                    if(!values.confidence_level){
                                        errors.confidence_level = 'Required'
                                    }
                                    else if(!parseInt(values.confidence_level)){
                                        errors.confidence_level = 'Number is required'
                                    }

                                    return errors
                                }
                            }
                            onSubmit = {(values)=>{
                                const data = {
                                    sample_size: values.sample_size,
                                    sample_mean: values.sample_mean,
                                    stardard_deviation: values.stardard_deviation,
                                    confidence_level: values.confidence_level,
                                    method: values.method
                                }
                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        console.log("Monkey")
                                        console.log(responseData.message.count)
                                        setValue([
                                            responseData.message.positiveAnswer,
                                            responseData.message.negativeAnswer,
                                            responseData.message.amountAddedOrSubtructed,
                                            responseData.message.zValue
                                        ]);
                                        
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
                                    <Box sx={{ minHeight: 250, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                            <Grid xs={12}>
                                                <Typography>    
                                                    <Box
                                                    sx={{
                                                            fontWeight: 100,
                                                            fontStyle: 'italic',
                                                            fontSize: 14,
                                                            color: '#b0b0b0'
                                                        }}>
                                                    </Box>
                                                    
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={7} >
                                                <Box sx={{ ...labelStyle }}>Sample Size</Box></Grid>
                                            <Grid item={true} xs={5}>
                                                <CustomForm
                                                    type="text"
                                                    name="sample_size"
                                                    onChange={handleChange}
                                                    value={values.sample_size}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.sample_size}</Box>
                                                </Typography>
                                            </Grid>
                    
                                            <Grid item xs={7}>
                                                <Box sx={{ ...labelStyle }}>Sample Mean</Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <CustomForm
                                                    type="text"
                                                    name="sample_mean"
                                                    onChange={handleChange}
                                                    value={values.sample_mean}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.sample_mean}</Box>
                                                </Typography>
                                            </Grid>
                                        
                                            <Grid item xs={7}>
                                                <Box sx={{ ...labelStyle }}>
                                                    Stardard Deviation
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <CustomForm
                                                    type="text"
                                                    name="stardard_deviation"
                                                    onChange={handleChange}
                                                    value={values.stardard_deviation}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.stardard_deviation}</Box>
                                                </Typography>
                                            
                                            </Grid>      

                                            <Grid item xs={7}>
                                                <Box sx={{ ...labelStyle }}>
                                                    Confidence Level
                                                </Box>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <CustomForm
                                                    type="text"
                                                    name="confidence_level"
                                                    onChange={handleChange}
                                                    value={values.confidence_level}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.confidence_level}</Box>
                                                </Typography>
                                            
                                            </Grid>                
                                        </Grid>
                                        <Box sx={{ flexGrow: 1}}>
                                            {/* 
                                                Flex box pushes submit button down
                                            */}
                                        </Box>

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
                    className='animated-pos animated-margin'
                    style={{
                        zIndex: -5
                    }}
                    ref={animatedSquaresRef2}
                    config={{
                        translateX: 200,
                        duration: 250,
                        easing: 'easeInOutSine',
                        autoplay: false,
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
                                <Box sx={{marginLeft: 5}}>
                                    <Box>
                                        <TextCard leadingtext="Standard Deviation" trailingtext={value[0]}/>
                                    </Box>
                                    <Box>
                                        <TextCard leadingtext="Sum" trailingtext={value[1]}/>
                                    </Box>
                                    <Box>
                                        <TextCard leadingtext="Mean" trailingtext={value[2]}/>
                                    </Box>
                                    <Box>
                                        <TextCard leadingtext="Variance" trailingtext={value[3]}/>
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

export default ConfidenceIntervalCalculator