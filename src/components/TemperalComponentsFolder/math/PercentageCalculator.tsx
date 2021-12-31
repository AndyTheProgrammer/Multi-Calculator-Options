

import React, { useRef, useState, useEffect } from 'react'
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
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm'
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

var classNames = require('classnames');

const menubutton = {
    width:'100%',
    fontSize: 16,
    paddingTop: 0.1, 
    marginBottom:0.5,
    boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.2)',
}

export default function PercentageCalculators(){
    const [index, setIndex] = useState([true,false,false,false])
    const [calcName, setCalcName] = useState("Percentage Change")
    const [showMenu, setShowMenu] = useState(false)
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
        <NavBar2 pageimage={math_icon} categoryname="General Math" pagename="Percentage Calculators"/>
        <AddLayout categorykey='general' searchname='General Calculators' searchimage={geometry_icon}>
            <Typography 
                sx={{
                    paddingLeft: 1.5, 
                    marginBottom: 2,
                    fontFamily: 'Roboto, Helvetica',
                    fontSize: 16
                }}>
                <Box>
                    In mathematics, a percentage is a number or ratio that represents a fraction of 100. 
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
                        sx={{ maxWidth: 500, minHeight: 200, paddingBottom: 1 }}
                            className="animated-box" >
                        <Box sx={{ width:'100%', display: 'flex', }}>
                            <Box sx={{ width:'100%'}}>
                                <Box sx={{ width:'100%'}}
                                    onClick={
                                        ()=>{
                                            setShowMenu(!showMenu)
                                        }
                                    }>
                                    <Typography 
                                        sx={{ 
                                            // textAlign:'center',
                                            justifyContent: 'space-between',
                                            display: 'flex', 
                                            paddingLeft: 2, 
                                            paddingRight: 1,}}>
                                        <Box className="form-card-none div-link"> 
                                            {calcName} 
                                            {/* {
                                                (showMenu)?
                                                    <KeyboardArrowDownIcon sx={{ color: 'blue' }} />
                                                :   <KeyboardArrowUpIcon sx={{ color: 'blue' }} />
                                            } */}
                                        </Box>
                                        {
                                            (showMenu)?
                                                <KeyboardArrowDownIcon sx={{ color: 'blue' }} />
                                            :   <KeyboardArrowUpIcon sx={{ color: 'blue' }} />
                                        }
                                    </Typography>
                                </Box>
                                {
                                    (showMenu)?
                                    <Box sx={{ 
                                        position:'absolute',    
                                        width:'210px',
                                        height: '140px',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                        borderRadius: 2.5,
                                        marginLeft: 1,
                                        paddingLeft: 1,
                                        paddingRight: 1,
                                        paddingTop: 1,
                                    }}>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([true, false, false, false])
                                                    setCalcName("Percentage Change")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                               ...menubutton
                                            }}>
                                            <Box>
                                                Percentage Change 
                                            </Box>
                                        </Typography >
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, true, false, false])
                                                    setCalcName("Percentage difference")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                                ...menubutton
                                            }}>
                                            <Box>
                                                Percentage difference
                                            </Box>
                                        </Typography>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, false, true, false])
                                                    setCalcName("Percentage error")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                                ...menubutton
                                            }}>
                                            <Box> Percentage error</Box>
                                        </Typography>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, false, false, true])
                                                    setCalcName("Percentage Calculator")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                                ...menubutton
                                            }}>
                                            <Box> Percentage Calculator</Box>
                                        </Typography>
                                    </Box>
                                    :<Box></Box>
                                }
                            </Box>
                        </Box>

                        {/* CALCULATOR COMPONENT  1 START */}

                        {
                            (index[0])?
                            <Formik
                                initialValues={{ 
                                    percentage:"",
                                    value: "",
                                    type: "decrease",
                                    method: "PercentageChangeCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        percentage: values.percentage,
                                        value: values.value,
                                        type: values.type,
                                        method: values.method
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([responseData.message.result])
                                            console.log(responseData)
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{ width:'100%', minHeight: 250, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Percentage</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                    <Field
                                                        type="text"
                                                        name="percentage"
                                                        component={CustomFormikForm}
                                                    />
                                                </Grid>
                        
                                                <Grid item xs={5}>
                                                    <Box sx={{...labelStyle}}>Value</Box></Grid>
                                                <Grid item xs={7}>
                                                <Field
                                                    type="text"
                                                    name="value"
                                                    component={CustomFormikForm}
                                                />
                                                </Grid>

                                                
                                                <Grid item xs={5}>
                                                    <Box sx={{...labelStyle}}>Type</Box></Grid>
                                                <Grid item xs={7}>
                                                    <Field
                                                        name="type"
                                                        as={CustomFormikOptions}
                                                        
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
                            :<Box></Box>
                        }
                        {/* CALCYLATOR COMPONENT  1 END */}


                        {/* CALCYLATOR COMPONENT  2 START */}
                        {
                            (index[1])?
                            <Formik
                                initialValues={{ 
                                    value2:"",
                                    value1: "",
                                    method: "PercentageDifferenceCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        value2: values.value2,
                                        value1: values.value1,
                                        method: values.method
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([responseData.message.percentageDifference])
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
        
                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>First %</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                    <Field
                                                        type="text"
                                                        name="value2"
                                                        component={CustomFormikForm}
                                                    />
                                                </Grid>
                        
                                                <Grid item xs={5}>
                                                    <Box sx={{ ...labelStyle }}>Second %</Box></Grid>
                                                <Grid item xs={7}>
                                                <Field
                                                    type="text"
                                                    name="value1"
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
                            :<Box></Box>
                        }

                        {/* CALCYLATOR COMPONENT  2 END */}

                        {/* CALCYLATOR COMPONENT  3 START */}
                        {
                            (index[2])?
                            <Formik
                                initialValues={{ 
                                    observed_value:"",
                                    true_value: "",
                                    method: "PercentErrorCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        observed_value: values.observed_value,
                                        true_value: values.true_value,
                                        method: values.method
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([responseData.message.absoluteError])
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Observed value</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                    <Field
                                                        type="text"
                                                        name="observed_value"
                                                        component={CustomFormikForm}
                                                    />
                                                </Grid>
                        
                                                <Grid item xs={5}>
                                                    <Box sx={{...labelStyle}}>True value</Box></Grid>
                                                <Grid item xs={7}>
                                                <Field
                                                    type="text"
                                                    name="true_value"
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
                            :<Box></Box>
                        }
                        {/* CALCYLATOR COMPONENT  3 END */}

                        {/* CALCYLATOR COMPONENT  4 START */}

                        {
                            (index[3])?
                            <Formik
                                initialValues={{ 
                                    percentage:"",
                                    value: "",
                                    confidence_level: "",
                                    method: "PercentageCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        percentage: values.percentage,
                                        value: values.value,
                                        confidence_level: values.confidence_level,
                                        method: values.method
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([responseData.message.result])
                                            console.log(responseData)
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{ width:'100%', minHeight: 250, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Percentage</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                    <Field
                                                        type="text"
                                                        name="percentage"
                                                        component={CustomFormikForm}
                                                    />
                                                </Grid>
                        
                                                <Grid item xs={5}>
                                                    <Box sx={{...labelStyle}}>Value</Box></Grid>
                                                <Grid item xs={7}>
                                                <Field
                                                    type="text"
                                                    name="value"
                                                    component={CustomFormikForm}
                                                />
                                                </Grid>

                                                
                                                <Grid item xs={5}>
                                                    <Box sx={{...labelStyle}}>Confidence level</Box></Grid>
                                                <Grid item xs={7}>
                                                    <Field
                                                        type="text"
                                                        name="confidence_level"
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
                            :<Box></Box>
                        }

                        {/* CALCYLATOR COMPONENT  4 START */}
                      
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
                        {
                            (index[0])?
                            <Box 
                                // sx={{ maxWidth: 450,paddingBottom: 1 }}
                                // className="animated-box" 
                                >
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
                                    <p>Percante Change</p>
                                    <p>{value[0]}</p>
                                </Box>
                            </Box>
                            :<Box></Box>
                            }
                            {
                                (index[1])?
                                <Box 
                                    // sx={{ maxWidth: 450,paddingBottom: 1 }}
                                    // className="animated-box" 
                                    >
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
                                        <p>Percentage difference</p>
                                        <p>{value}</p>
                                    </Box>
                                </Box>
                                :<Box></Box>
                            }
                            {
                                (index[2])?
                                <Box 
                                    // sx={{ maxWidth: 450,paddingBottom: 1 }}
                                    // className="animated-box" 
                                    >
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
                                        <p>Percante error</p>
                                        <p>{value}</p>
                                    </Box>
                                </Box>
                                :<Box></Box>
                            }
                            {
                                (index[3])?
                                <Box 
                                    // sx={{ maxWidth: 450,paddingBottom: 1 }}
                                    // className="animated-box" 
                                    >
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
                                        <p>Percante value</p>
                                        <p>{value}</p>
                                    </Box>
                                </Box>
                                :<Box></Box>
                            }
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