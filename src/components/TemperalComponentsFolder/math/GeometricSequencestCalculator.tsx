import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import math_icon from '../../../common/assets/math_icon.svg';
import stats from '../../../common/assets/stats_icon.svg';
const Latex = require('react-latex');

function GeometricSequencestCalculator(){
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
        <NavBar2 pageimage={math_icon} categoryname="Statistics Calculators" pagename="Geometric Sequencest Calculator"/>
        <AddLayout categorykey='statistics' searchname='Statistics Calculators' searchimage={stats}>
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
                                
                                common_ratio: "",
                                first_term: "",
                                nth_term:"",
                                method: "GeometricSequencestCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    common_ratio: values.common_ratio,
                                    first_term: values.first_term,
                                    nth_term: values.nth_term,
                                    method: values.method
                                }

                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setValue([
                                            responseData.message.answer,
                                            responseData.message.sumOfInfinite,
                                            responseData.message.sum,
                                            responseData.message.common_ratio,
                                            responseData.message.nth_term
                                        ])
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
                                    <Box sx={{  height: 250, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Common Ratio</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="common_ratio"
                                                    onChange={handleChange}
                                                    value={values.common_ratio}
                                                    placeholder=""
                                                />
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>First Term</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="first_term"
                                                    onChange={handleChange}
                                                    value={values.first_term}
                                                    placeholder=""
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Nth tTerm</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="nth_term"
                                                    onChange={handleChange}
                                                    value={values.nth_term}
                                                    placeholder=""
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
                                        <Box sx={{ width: 100 }}>
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
                                        <Box sx={{ width: 100 }}>
                                            Sum of infinite 
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
                                        <Box sx={{ width: 100 }}>
                                            Sum   
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
                                        <Box sx={{ width: 100 }}>
                                            Common ratio   
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
                                        <Box sx={{ width: 100 }}>
                                            nth term  
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

export default GeometricSequencestCalculator