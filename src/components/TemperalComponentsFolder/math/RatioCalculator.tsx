import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { CustomFormBtn } from '../../custom/CustomFormBtn'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm'

const innerBoxStyle = {
    width: 400,
    borderRadius: 10,
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white'
 }


function RatioCalculator(){
    const [value, setValue] = useState("")
    const animatedSquaresRef1 = useRef(null)
    const animatedSquaresRef2= useRef(null)
  
    // @ts-ignore: Object is possibly 'null'.
    const play1 = () => animatedSquaresRef1.current.play();
    // @ts-ignore: Object is possibly 'null'.
    const play2 = () => animatedSquaresRef2.current.play();
    useEffect(()=>{
        if(value){
            play1();
            play2();
        }
    })

    return(
        <>
        <NavBar2 pagename="Ratio Calculator"/>
        <AddLayout>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Anime
                style={{
                    position: 'absolute',
                }}
                ref={animatedSquaresRef1}
                config={{
                    translateX: -250,
                    duration: 250,
                    easing: 'easeInOutSine',
                    autoplay: false,
                }}>
                <Box sx={{...formDisplay}}>
                    

                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{height:30, width: '100%' }}></Box>
                        <Box sx={{
                                height:30, width: '100%', 
                                backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
                                borderRadius: '0 10px 3px', 
                            }}></Box>
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
                                    setValue(responseData.message.percentage)
                                    console.log(responseData.message.percentage)
                                }
                            }
                            postData()
                        }}>
                            
                        {(props: FormikProps<any>) => (
                            <Form >
                                <Box sx={{  display:'flex', flexDirection:'column' }}>
                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                        <Grid item={true} xs={5} >
                                            <Box sx={{...labelStyle}}>a </Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <Field
                                                type="text"
                                                name="a"
                                                component={CustomFormikForm}
                                            />
                                        </Grid>
                
                                        <Grid item xs={5}>
                                            <Box sx={{...labelStyle}}>b</Box></Grid>
                                        <Grid item xs={7}>
                                        <Field
                                            type="text"
                                            name="b"
                                            component={CustomFormikForm}
                                        />
                                        </Grid>

                                        <Grid item={true} xs={5} >
                                            <Box sx={{...labelStyle}}>c</Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <Field
                                                type="text"
                                                name="c"
                                                component={CustomFormikForm}
                                            />
                                        </Grid>

                                        
                                        <Grid item={true} xs={5} >
                                            <Box sx={{...labelStyle}}>d</Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <Field
                                                type="text"
                                                name="d"
                                                component={CustomFormikForm}
                                            />
                                        </Grid>
                
                
                                        
                                                         
                                    </Grid>
                                    <Box sx={{ flexGrow: 1}}>
                                        {/* 
                                            Flex box pushes submit button down
                                        */}
                                    </Box>

                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>   
                                       <Grid item xs={4}>
                                            <Box sx={{display:"flex", justifyContent:"start"}}>
                                                <CustomFormBtn 
                                                type="button" 
                                                handleClick={()=>{ 
                                                    play1();
                                                    play2();
                                                 }} 
                                                name="Clear"/>
                                            </Box>
                                       </Grid>
                                       <Grid item xs={4}></Grid>
                                       <Grid item xs={4}>
                                            <Box sx={{display:"flex", justifyContent:"end"}}>
                                                <CustomFormBtn type="submit" name="Calculate"/>
                                            </Box>
                                       </Grid>
                                   </Grid>
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
                style={{
                    position: 'absolute',
                    zIndex: -5
                }}
                ref={animatedSquaresRef2}
                config={{
                    translateX: 200,
                    duration: 250,
                    easing: 'easeInOutSine',
                    autoplay: false,
                }}>
                <Box sx={formDisplay}>
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
                        <p>Answer</p>
                        <p>{value}</p>
                    </Box>
                </Box>
            </Anime>
            
            </Box>
            
        </AddLayout>
        </>
    );
}

export default RatioCalculator