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
const Latex = require('react-latex');

function HexadecimalOperations(props:any){
    return(
         
  <Box sx={{
    display: 'flex',
  }}>
    <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box>
    <select 
    style={{
      width:'100%',
      backgroundColor:'#F0F3F6',
      border: 'none',
      borderColor: 'red',
      borderRadius: 7,
      outline: 'none',
      color:'black' 
    }}
    {...props} >
      <option value="Multiply">Multiply</option>
    </select>
  </Box>
    );
}

export default function HexadecimalCalculator(){
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
        <NavBar2 categoryname="General Calculators" pagename="Hexadecimal Calculator"/>
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
                                    first_value:"",
                                    second_value:"",
                                    operation:"Multiply",
                                    method: "HexadecimalCalculator"
                                }}
                                onSubmit = {(values)=>{
                                
                                    const data = {
                                        first_value: values.first_value,
                                        second_value: values.second_value,
                                        operation: values.operation,
                                        method: "HexadecimalCalculator"
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            console.log("Hacking is beautiful")
                                            setValue([
                                                responseData.message.firstValueInDecimal,
                                                responseData.message.secondValueInDecimal,
                                                responseData.message.answerInDecimal,
                                                responseData.message.answerInHexadecimal,
                                                responseData.message.firstValueInBinary,
                                                responseData.message.secondValueInBinary,
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
                                                    <Box sx={{...labelStyle}}>First Value</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                <Field
                                                        type="text"
                                                        name="first_value"
                                                        component={CustomFormikForm}
                                                    />
                                                </Grid>

                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Second Value</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                <Field
                                                        type="text"
                                                        name="second_value"
                                                        component={CustomFormikForm}
                                                    />
                                                </Grid>

                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Operation</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                <Field
                                                        as={HexadecimalOperations}
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
                                    <Grid container>
                                        <Grid item xs={8}>
                                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box
                                                    sx={{
                                                        // color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1
                                                    }}>
                                                    First number decimal 
                                                </Box>
                                                <Box
                                                    sx={{
                                                        // color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1,
                                                        paddingRight: 5
                                                    }}>
                                                    :
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <Box sx={{
                                                    paddingTop: 1,
                                                    textAlign: 'end',
                                                    paddingRight: 5
                                                }}>
                                                    {value[0]}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box
                                                    sx={{
                                                        // color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1
                                                    }}>
                                                    Second number decimal 
                                                </Box>
                                                <Box
                                                    sx={{
                                                        // color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1,
                                                        paddingRight: 5
                                                    }}>
                                                    :
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <Box sx={{
                                                    paddingTop: 1,
                                                    textAlign: 'end',
                                                    paddingRight: 5
                                                }}>
                                                    {value[1]}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box
                                                    sx={{
                                                        // color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1
                                                    }}>
                                                    Answer in decimal
                                                </Box>
                                                <Box
                                                    sx={{
                                                        // color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1,
                                                        paddingRight: 5
                                                    }}>
                                                    :
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <Box sx={{
                                                    paddingTop: 1,
                                                    textAlign: 'end',
                                                    paddingRight: 5
                                                }}>
                                                    {value[2]}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box
                                                    sx={{
                                                        border: 'none',
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1,
                                                    }}>
                                                    Answer in hexadecimal
                                                </Box>
                                                <Box
                                                    sx={{
                                                        color:'#4072B5', 
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1,
                                                        paddingRight: 5
                                                    }}>
                                                    :
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <Box sx={{
                                                    paddingTop: 1,
                                                    textAlign: 'end',
                                                    paddingRight: 5
                                                }}>
                                                    {value[3]}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    
                                    </Grid>
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