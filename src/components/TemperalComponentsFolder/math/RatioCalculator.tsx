import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm, {CustomFormikFormRatio} from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import { Ratio } from '../wigets/ratio/Ratio'
var classNames = require('classnames');
var Latex = require('react-latex');


function RatioCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [playAnimation, setPlayAnimation] = useState(false)
    const [inputValue, setInputValue] = useState(['4.5','6', '', '3'])
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue([])
        setErrorMSG(false)
        console.log(inputValue)
    }

    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="General Calculators" pagename="Ratio Calculator"/>
        <AddLayout categorykey='general' searchname='General Calculators' searchimage={geometry_icon}>
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
                        initialValues={{ 
                            a:inputValue[0],
                            b:inputValue[1],
                            c:inputValue[2],
                            d:inputValue[3],
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

                            setInputValue([
                                values.a,
                                values.b,
                                values.c,
                                values.d
                            ])

                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setControlAnimation(true)
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
                                    <Grid 
                                        container={true} 
                                        rowSpacing={1} 
                                        sx={{
                                            minWidth:'350px', 
                                            paddingTop:3, 
                                            paddingLeft:2, 
                                            paddingRight:2,
                                            marginBottom:4
                                        }}>
                                        {/* <Grid xs={12}>
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
                                        </Grid> */}
                                        {/* <Grid item xs={12}>
                                            <Box 
                                                sx={{ 
                                                    width: '100%',
                                                    display:'flex',
                                                    justifyContent:'center'  }}>

                                                    <Box sx={{
                                                            width:'100px',
                                                        }}>
                                                        <Box sx={{...labelStyle, textAlign:'center'}}>A</Box>
                                                        <Box
                                                            sx={{ width:'100%', border:'none' }}
                                                        >
                                                        <Field
                                                            type="text"
                                                            name="a"
                                                            component={CustomFormikFormRatio}
                                                        />
                                                        </Box>
                                                    </Box>
                                                    <Typography>
                                                        <Box sx={{
                                                            textAlign:'center',
                                                            width:'20px'}}>
                                                            :
                                                        </Box>
                                                    </Typography>
                                                    <Box sx={{width:'100px'}}>
                                                        <Box sx={{...labelStyle, textAlign:'center'}}>B</Box>
                                                        <Field
                                                            type="text"
                                                            name="b"
                                                            component={CustomFormikFormRatio}
                                                        />
                                                    </Box>
                                                    <Typography>
                                                        <Box sx={{
                                                            textAlign:'center',
                                                            width:'20px'}}>
                                                            =
                                                        </Box>
                                                    </Typography>

                                                    <Box sx={{width:'100px'}}>
                                                        <Box sx={{...labelStyle, textAlign:'center'}}>C</Box>
                                                        <Field
                                                            type="text"
                                                            name="c"
                                                            component={CustomFormikFormRatio}
                                                        />
                                                    </Box>
                                                    <Typography>
                                                        <Box sx={{
                                                            textAlign:'center',
                                                            width:'20px'}}>
                                                            :
                                                        </Box>
                                                    </Typography>
                                                    <Box sx={{width:'100px'}}>
                                                        <Box sx={{...labelStyle, textAlign:'center'}}>D</Box>
                                                        <Field
                                                            type="text"
                                                            name="d"
                                                            component={CustomFormikFormRatio}
                                                        />
                                                    </Box>
                                                </Box>
                                        </Grid>    */}
                                        <Grid item xs={12}>
                                            <Box 
                                                sx={{ 
                                                    width: '100%',
                                                    justifyContent:'center'  }}>

                                                    <Box 
                                                        sx={{ 
                                                            width: '100%',
                                                            display:'flex',
                                                            justifyContent:'center'  }}>
                                                        <Box sx={{
                                                                width:'100px',
                                                            }}>
                                                            <Box sx={{...labelStyle, textAlign:'center'}}>A</Box>
                                                            <Box
                                                                sx={{ width:'100%', border:'none' }}
                                                            >
                                                            <Field
                                                                type="text"
                                                                name="a"
                                                                component={CustomFormikFormRatio}
                                                            />
                                                            </Box>
                                                        </Box>
                                                        <Typography sx={{marginTop: 3.4, border:'0px solid red', height: 20}}>
                                                            <Box sx={{
                                                                    textAlign:'center',
                                                                    width:'20px',
                                                                    
                                                                }}>
                                                                :
                                                            </Box>
                                                        </Typography>
                                                        <Box sx={{width:'100px'}}>
                                                            <Box sx={{...labelStyle, textAlign:'center'}}>B</Box>
                                                            <Field
                                                                type="text"
                                                                name="b"
                                                                component={CustomFormikFormRatio}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Typography 
                                                        sx={{
                                                                marginTop: 3.2, 
                                                                border:'0px solid red', 
                                                                height: 20,
                                                                width:'100%',
                                                                display:'flex',
                                                                justifyContent:'center'
                                                            }}>
                                                        <Box sx={{
                                                            textAlign:'center',
                                                            width:'20px'}}>
                                                            =
                                                        </Box>
                                                    </Typography>

                                                    <Box 
                                                        sx={{ 
                                                            width: '100%',
                                                            display:'flex',
                                                            justifyContent:'center'  }}>
                                                        
                                                        <Box sx={{width:'100px'}}>
                                                            <Box sx={{...labelStyle, textAlign:'center'}}>C</Box>
                                                            <Field
                                                                type="text"
                                                                name="c"
                                                                component={CustomFormikFormRatio}
                                                            />
                                                        </Box>
                                                        <Typography sx={{marginTop: 3.4, border:'0px solid red', height: 20}}>
                                                            <Box sx={{
                                                                    textAlign:'center',
                                                                    width:'20px',
                                                                    
                                                                }}>
                                                                :
                                                            </Box>
                                                        </Typography>
                                                        <Box sx={{width:'100px'}}>
                                                            <Box sx={{...labelStyle, textAlign:'center'}}>D</Box>
                                                            <Field
                                                                type="text"
                                                                name="d"
                                                                component={CustomFormikFormRatio}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                        </Grid> 
                                    </Grid>
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
                            </Box>
                            <Box sx={{paddingLeft:3}}>
                                <Ratio data={inputValue}/>
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

export default RatioCalculator