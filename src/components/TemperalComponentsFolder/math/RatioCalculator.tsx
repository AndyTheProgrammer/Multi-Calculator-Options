import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikForm, CustomFormikFormRatio, CustomFormikOptions } from '../../forms/CustomForm'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
const Latex = require('react-latex');

function RatioCalculator(){
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
        <NavBar2 categoryname="General Calculators" pagename="Ratio Calculator"/>
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
                        <Box sx={{height:30, width: '100%' }}></Box>
                        <Box sx={{...formCardStyle }}></Box>
                    </Box>
                    <Formik
                        initialValues={{ 
                            a:"",
                            b: "",
                            c:"",
                            d:"",
                            method: "RatioCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                a: values.a,
                                b: values.b,
                                c: values.c,
                                d: values.d,
                                method: values.method
                            }
                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setValue([
                                        responseData.message.a,
                                        responseData.message.b,
                                        responseData.message.c,
                                        responseData.message.d
                                    ])
                                }
                            }
                            postData()
                        }}>
                            
                        {(props: FormikProps<any>) => (
                            <Form >
                                <Box sx={{  display:'flex', flexDirection:'column' }}>
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
                                                    provide any three values below to calculate the fourth in the ratio A:B = C:D.
                                                </Box>
                                               
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>A </Box></Grid>
                                        <Grid item xs={3}>
                                            <Box sx={{...labelStyle, textAlign:'center'}}>B </Box></Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>C</Box></Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>D</Box></Grid>

                                        <Grid item={true} xs={3}>
                                            <Field
                                                type="text"
                                                name="a"
                                                component={CustomFormikFormRatio}
                                            />
                                        </Grid>
                
                                        <Grid item xs={3}>
                                        <Field
                                            type="text"
                                            name="b"
                                            component={CustomFormikFormRatio}
                                        />
                                        </Grid>
                                        <Grid item={true} xs={3}>
                                            <Field
                                                type="text"
                                                name="c"
                                                component={CustomFormikFormRatio}
                                            />
                                        </Grid>      
                                        <Grid item={true} xs={3}>
                                            <Field
                                                type="text"
                                                name="d"
                                                component={CustomFormikFormRatio}
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
                        sx={{ maxWidth: 450,paddingBottom: 1 }}
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
                        <Box >
                            <Typography sx={{ fontSize: 18}}>
                                <Box >
                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>A </Box></Grid>
                                        <Grid item xs={3}>
                                            <Box sx={{...labelStyle, textAlign:'center'}}>B </Box></Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>C</Box></Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>D</Box></Grid>

                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>{value[0]} </Box></Grid>
                                        <Grid item xs={3}>
                                            <Box sx={{...labelStyle, textAlign:'center'}}>{value[1]} </Box></Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>{value[2]} </Box></Grid>
                                        <Grid item xs={3} >
                                            <Box sx={{...labelStyle, textAlign:'center'}}>{value[3]} </Box></Grid>
                                    </Grid>
                                </Box>
                            </Typography>
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

export default RatioCalculator