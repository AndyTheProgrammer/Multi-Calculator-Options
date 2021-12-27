import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikForm } from '../../forms/CustomForm'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
const Latex = require('react-latex');

export default function ZscoreCalculator(){
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
        <NavBar2 categoryname="Statistics Calculators" pagename="Zscore Calculator"/>
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
                            <Box sx={{...formCardStyle }}></Box>
                        </Box>
                        <Formik
                            initialValues={{ 
                                raw_score:"",
                                population_mean:"",
                                standard_deviation:"",
                                method: "ZscoreCalculator"
                            }}
                            onSubmit = {(values)=>{
                               
                                const data = {
                                    raw_score: values.raw_score,
                                    population_mean: values.population_mean,
                                    standard_deviation: values.standard_deviation,
                                    method: values.method
                                }
                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        console.log("Hacking is beautiful")
                                        setValue([
                                            responseData.message.answer,
                                            responseData.message.zsccore,
                                            responseData.message.raw_score,
                                            responseData.message.population_mean,
                                            responseData.message.standard_deviation
                                        ])
                                    }
                                }
                                postData()
                            }}>
                                
                            {(props: FormikProps<any>) => (
                                <Form>
                                    <Box sx={{  height: 250, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>raw_score</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="raw_score"
                                                    placeholder=""
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>population_mean</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="population_mean"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>standard_deviation</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="standard_deviation"
                                                    component={CustomFormikForm}
                                                />
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
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Anime>

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
                                    <Box 
                                        sx={{ 
                                            display:'flex', }}>
                                        <Typography
                                            sx={{ 
                                                display:'flex',
                                                justifyContent:  'space-between',
                                                marginRight: 1 ,
                                                fontSize: 14
                                            }}>
                                            <Box sx={{ width: 120 }}>
                                                Answer   
                                            </Box>
                                            <Box>
                                                :
                                            </Box>

                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }}>
                                            <Box>
                                                {value[0]}   
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box 
                                        sx={{ 
                                        display:'flex', }}>
                                        <Typography
                                            sx={{ 
                                                display:'flex',
                                                justifyContent:  'space-between',
                                                marginRight: 1 ,
                                                fontSize: 14
                                            }}>
                                            <Box sx={{ width: 120 }}>
                                                Z Score   
                                            </Box>
                                            <Box>
                                                :
                                            </Box>

                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }}>
                                            <Box>
                                                {value[1]}   
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box 
                                        sx={{ 
                                        display:'flex', }}>
                                        <Typography
                                            sx={{ 
                                                display:'flex',
                                                justifyContent:  'space-between',
                                                marginRight: 1 ,
                                                fontSize: 14
                                            }}>
                                            <Box sx={{ width: 120 }}>
                                                Raw Score   
                                            </Box>
                                            <Box>
                                                :
                                            </Box>

                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }}>
                                            <Box>
                                                {value[2]}   
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box 
                                        sx={{ 
                                        display:'flex', }}>
                                        <Typography
                                            sx={{ 
                                                display:'flex',
                                                justifyContent:  'space-between',
                                                marginRight: 1 ,
                                                fontSize: 14
                                            }}>
                                            <Box sx={{ width: 120 }}>
                                                Population mean   
                                            </Box>
                                            <Box>
                                                :
                                            </Box>

                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }}>
                                            <Box>
                                                {value[3]}   
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box 
                                        sx={{ 
                                        display:'flex', }}>
                                        <Typography
                                            sx={{ 
                                                display:'flex',
                                                justifyContent:  'space-between',
                                                marginRight: 1 ,
                                                fontSize: 14
                                            }}>
                                            <Box sx={{ width: 120 }}>
                                                Standard deviation   
                                            </Box>
                                            <Box>
                                                :
                                            </Box>

                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }}>
                                            <Box>
                                                {value[4]}   
                                            </Box>
                                        </Typography>
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