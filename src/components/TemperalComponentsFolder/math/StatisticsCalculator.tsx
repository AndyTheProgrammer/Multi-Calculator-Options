import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid,Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
const Latex = require('react-latex');

function StatisticsCalculator(){
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
        <NavBar2 categoryname="Statistics Calculators" pagename="Statistics Calculator"/>
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
                            observations:"",
                            method: "StatisticsCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                observations: values.observations,
                                method: values.method
                            }
                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setValue([
                                        responseData.message.mean,
                                        responseData.message.sum,
                                        responseData.message.median,
                                        responseData.message.mode[0],
                                        responseData.message.geometric_mean,
                                        responseData.message.standardeviation,
                                        responseData.message.variance,
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
                                                    Provide numbers seperated by a coma
                                                </Box>
                                                <Box
                                                  sx={{
                                                        fontWeight: 100,
                                                        fontStyle: 'italic',
                                                        fontSize: 14,
                                                        color: '#b0b0b0'
                                                    }}>
                                                    e.g 12,4,5,64,87
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={5} >
                                            <Box sx={{...labelStyle}}>observations</Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <CustomForm
                                                type="text"
                                                name="observations"
                                                onChange={handleChange}
                                                value={values.observations}
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
                                        Mean   
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
                                            Sum   
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
                                            Median   
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
                                            Mode   
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
                                            Geometric mean   
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

export default StatisticsCalculator