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

const Latex = require('react-latex');


function FractionToPercentageCalculator(){
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
                        <Box sx={{height:25, width: '100%' }}>
                            <Typography>
                                <Box
                                    sx={{
                                        color:'#4072B5',
                                        fontWeight:'bold', 
                                        paddingLeft:2
                                    }}>Calculator</Box>
                            </Typography>
                        </Box>
                        {/* <Box sx={{...formCardStyle}}></Box> */}
                    </Box>
                    <Formik
                        initialValues={{ 
                            
                            top: "",
                            bottom: "",
                            method: "FractionToPercentageCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                top: values.top,
                                bottom: values.bottom,
                                method: values.method
                            }

                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setValue([
                                        responseData.message.decimal,
                                        responseData.message.answer
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
                                  <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:2, paddingLeft:5, paddingRight:5}}>
                                        <Grid item xs={12}>
                                            <Box sx={{display: 'flex', justifyContent:'center'}}>
                                                <Box>
                                                    <Box sx={{
                                                        width: '100%',
                                                        display:'flex', 
                                                        justifyContent: 'center' 
                                                    }}>
                                                    <Box sx={{ width: '50px' }}>
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
                                                        justifyContent: 'center' 
                                                    }}>
                                                    <Box 
                                                        sx={{
                                                            backgroundColor: '#b5b5b5',
                                                            width: '60px',
                                                            borderRadius: 1,
                                                            height: 2,
                                                            marginTop: 0.5,
                                                            marginBottom: 0.5,
                                                            color: '#3023AE'
                                                        }}></Box>
                                                </Box>
                                                <Box sx={{
                                                    display:'flex', 
                                                    justifyContent: 'center' 
                                                    }}>
                                                    <Box sx={{ width: '50px' }}>
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
                                                <Typography>
                                                    <Latex displayMode={true}>{`$\\hspace{.1cm}=\\hspace{.1cm}\\frac{?}{?}$`}</Latex>
                                                </Typography>
                                            </Box>
                                            
                                        </Grid>
                                                            
                                    </Grid>
                                    <Box sx={{ flexGrow: 1}}>
                                        {/* 
                                            Flex box pushes submit button down
                                        */}
                                    </Box>

                                    <Box 
                                        // className="toggle-box-primary"
                                        sx={{
                                            paddingLeft: 2, paddingRight: 2, 
                                            minWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                            <Box sx={{display:"flex", justifyContent:"start"}}>
                                                <CustomFormBtn 
                                                type="button" 
                                                handleClick={()=>{ 
                                                    controlAnimation();

                                                    }} 
                                                name="Clear"/>
                                            </Box>
                                        <Box sx={{display:"flex", flexGrow:1, justifyContent:"start"}}>
                                        
                                        </Box>
                                        <Box sx={{display:"flex", justifyContent:"end"}}>
                                            <CustomFormImageBtn type="submit" name="Calculate"/>   
                                        </Box>
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
                                            paddingLeft:2
                                        }}>Result</Box>
                                </Typography>
                            </Box>
                            {/* <Box sx={{ ...formCardStyle }}></Box> */}
                        </Box>
                        <Box >
                            <Box sx={{marginLeft: 5}}>
                                <Typography sx={{marginBottom: 1}}>
                                    <Box>
                                        Decimal value
                                    </Box>
                                    <Box>
                                        { value[0] }
                                    </Box>
                                </Typography>
                                <Typography>
                                    <Box>
                                        Percentage
                                    </Box>
                                    <Box>
                                        { value[1] } %
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

export default FractionToPercentageCalculator