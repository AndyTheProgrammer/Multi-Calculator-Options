

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


const Latex = require('react-latex');
var classNames = require('classnames');


function BinaryOperators(props:any){
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
              <option value="Subtraction">Subtraction</option>
            </select>
          </Box>
    );
}


export default function BinaryCalculators(){
    const [index, setIndex] = useState([true,false,false])
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
    const [tab_1, setTab_1] = useState([false,false,true, false])
    const [tab_2, setTab_2] = useState([true, false, false])
    const [tab_3, setTab_3] = useState([true, false, false])

    const tabstyles_1 = classNames({
        'form-card-1': tab_1[0],
        'form-card-1-b': tab_1[1],
        'form-card-none': tab_1[2],
        'form-card-1-c': tab_1[3],
        'div-link': true
    })

    const tabstyles_2 = classNames({
        'form-card-2': tab_2[0],
        'form-card-2-b': tab_2[1],
        'form-card-none': tab_2[2],
        'div-link': true
    })

    const tabstyles_3 = classNames({
        'form-card-3': tab_3[0],
        'form-card-3-b': tab_3[1],
        'form-card-none': tab_3[2],
        'div-link': true
    })
    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="General Math" pagename="Binary Calculators"/>
        <AddLayout categorykey='general' searchname='General Calculators' searchimage={geometry_icon}>
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
                        
                        <Box sx={{ width:'100%',  }}>
                            <Box sx={{ width:'100%',display: 'flex',}}>
                                <Typography
                                    onClick={
                                        ()=>{
                                            setTab_1([false,false,true, false])
                                            setTab_2([true, false, false])
                                            setTab_3([true, false, false])
                                            setIndex([true, false, false])
                                            setCalcName("Binary Calculator")
                                            
                                        }
                                    }
                                    className={tabstyles_1 }
                                    sx={{ 
                                            width:'100%',
                                            fontSize: 14,
                                            paddingTop: 0.1, 
                                            marginBottom:0.5,
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}>
                                    <Box>
                                        Binary Calculator
                                    </Box>
                                </Typography >
                                <Typography
                                    onClick={
                                        ()=>{
                                            setTab_1([false, true, false])
                                            setTab_2([false, false, true])
                                            setTab_3([false, true, false])
                                            setIndex([false, true, false])
                                            setCalcName("Binary to decimal")
                                            
                                        }
                                    }
                                    className={tabstyles_2}
                                    sx={{ width:'100%' }}>
                                    <Box
                                        sx={{ 
                                            width:'100%',
                                            fontSize: 14,
                                            paddingTop: 0.1, 
                                            marginBottom:0.5,
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}>
                                        Binary to decimal
                                    </Box>
                                </Typography>
                                <Typography
                                    onClick={
                                        ()=>{
                                            setTab_1([false, false, false, true])
                                            setTab_2([false, true, false])
                                            setTab_3([false, false, true])
                                            setIndex([false, false, true])
                                            setCalcName("Decimal to binary")
                                            
                                        }
                                    }
                                    className={tabstyles_3}
                                    sx={{ width:'100%' }}>
                                    <Box
                                        sx={{ 
                                            width:'100%',
                                            fontSize: 14,
                                            paddingTop: 0.1, 
                                            marginBottom:0.5,
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}
                                    >Decimal to binary</Box>
                                </Typography>   
                            </Box>
                        </Box>
                        {
                            (index[0])?
                            <Formik
                                initialValues={{ 
                                    first_value:"",
                                    second_value:"",
                                    operation:"Subtraction",
                                    method: "BinaryCalculator"
                                }}
                                validate={
                                    (values)=>{
                                        interface Errors{
                                            first_value: string,
                                            second_value: string
                                        }
                                        const errors = {} as Errors
                                        if(!values.first_value){
                                            errors.first_value = 'Required'
                                        }
                                    
                                        if(!values.second_value){
                                            errors.second_value = 'Required'
                                        }
                                    
                                        return errors
                                    }
                                }
                                onSubmit = {(values)=>{
                                
                                    const data = {
                                        first_value: values.first_value,
                                        second_value: values.second_value,
                                        operation: values.operation,
                                        method: "BinaryCalculator"
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([
                                                responseData.message.firstValueInDecimal,
                                                responseData.message.secondValueInDecimal,
                                                responseData.message.answerInDecimal,
                                                responseData.message.answerInBinary,
                                                responseData.message.firstValueInBinary,
                                                responseData.message.secondValueInBinary,
                                            ])
                                        
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form>
                                        <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                                <Grid item={true} xs={6} >
                                                    <Box sx={{ ...labelStyle }}>First number</Box>
                                                </Grid>
                                                <Grid item={true} xs={6}>
                                                    <Field
                                                            type="text"
                                                            name="first_value"
                                                            component={CustomFormikForm}
                                                        />
                                                    <Typography>
                                                        <Box 
                                                            sx={{
                                                                ...errorText
                                                            }}>{props.errors.first_value}</Box>
                                                    </Typography>
                                                </Grid>

                                                <Grid item={true} xs={6} >
                                                    <Box sx={{ ...labelStyle }}>Second number</Box>
                                                </Grid>
                                                <Grid item={true} xs={6}>
                                                    <Field
                                                            type="text"
                                                            name="second_value"
                                                            component={CustomFormikForm}
                                                        />
                                                    <Typography>
                                                        <Box 
                                                            sx={{
                                                                ...errorText
                                                            }}>{props.errors.second_value}</Box>
                                                    </Typography>
                                                </Grid>

                                                <Grid item={true} xs={6} >
                                                    <Box sx={{ ...labelStyle }}>Operation</Box>
                                                </Grid>

                                                <Grid item={true} xs={6}>
                                                <Field
                                                        as={BinaryOperators}
                                                        name="operation"
                                                    />
                                                </Grid>
                                                                
                                            </Grid>
                                            <Box sx={{ flexGrow: 1}}>
                                                {/* 
                                                    Flex box pushes submit button down
                                                */}
                                            </Box>

                                            {/* button containers */}
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
                        {
                            (index[1])?
                            <Formik
                                initialValues={{ 
                                    value:"",
                                    method: "BinaryToDecimalCalculator"
                                }}

                                onSubmit = {(values)=>{
                                    const data = {
                                        value: values.value,
                                        method: values.method
                                    }
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([
                                                responseData.message.valueInDecimal,
                                                responseData.message.valueInBinary
                                            ])
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
                                                            {/* <Latex displayMode={false}>{`$decimal = d_{0}\\times{}2^0 + d_{1}\\times{}2^1 + d_{2}\\times{}2^2$`}</Latex> */}
                                                        </Box>
                                                        
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Binary number</Box>
                                                </Grid>
                                                <Grid item={true} xs={7}>
                                                    <CustomForm
                                                        type="text"
                                                        name="value"
                                                        onChange={handleChange}
                                                        value={values.value}
                                                        placeholder=""
                                                    />
                                                    <Typography>
                                                        <Box 
                                                            sx={{
                                                                ...errorText
                                                            }}>{errors.value}</Box>
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
                            :<Box></Box>
                        }
                        {
                            (index[2])?
                            <Formik
                                initialValues={{ 
                                    value:"",
                                    method: "DecimalToBinaryCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        value: values.value,
                                        method: values.method
                                    }
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setValue([responseData.message.valueInBinary])
                                            console.log(responseData.message.valueInBinary)
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
                                    <Box sx={{  maxHeight: 250, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
        
                                                <Grid item={true} xs={5} >
                                                    <Box sx={{...labelStyle}}>Decimal value</Box></Grid>
                                                <Grid item={true} xs={7}>
                                                    <CustomForm
                                                        type="text"
                                                        name="value"
                                                        onChange={handleChange}
                                                        value={values.value}
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
                            :<Box></Box>
                        }
                      
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
                                // sx={{ maxWidth: 400, minHeight: 200, paddingBottom: 1 }}
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
                                    <Grid container>
                                        <Grid item xs={9}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={9}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={9}>
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
                                        <Grid item xs={3}>
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
                                        <Grid item xs={9}>
                                            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box
                                                    sx={{
                                                        borderBottom: '0px solid #dbdbdb',
                                                        paddingTop: 1
                                                    }}>
                                                    Answer in binary
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
                                        <Grid item xs={3}>
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
                            {
                                (index[1])?
                                <Box 
                                    // sx={{ maxWidth: 400,paddingBottom: 1 }}
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
                                    <Box sx={{marginTop: 2, marginLeft: 2}}>
                                        <Typography>
                                            <Box sx={{ fontSize: 14, color: '#b0b0b0' }}>
                                                <Latex displayMode={false}>{`$Formula = d_{0}\\times{}2^0 + d_{1}\\times{}2^1 + d_{2}\\times{}2^2$`}</Latex>
                                            </Box>
                                        </Typography>
                                        <Box>
                                            <TextCard leadingtext="decimal number" trailingtext={value[0]}/>
                                        </Box>
                                        <Box>
                                            <TextCard leadingtext="binary number" trailingtext={value[1]}/>
                                        </Box>
                                    </Box>
                                </Box>
                                :<Box></Box>
                            }
                            {
                                (index[2])?
                                <Box 
                                    // sx={{ maxWidth: 400,paddingBottom: 1 }}
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
                                        <p>Answer</p>
                                        {value}
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