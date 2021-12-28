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
const Latex = require('react-latex');
var classNames = require('classnames');

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

export default function HexadecimalCalculators(){
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


    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="General Math" pagename="Hexadecimal Calculators"/>
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
                        
                        <Box sx={{ width:'100%', display: 'flex', }}>
                            <Box sx={{ width:'100%'}}>
                                <Box sx={{ width:'100%'}}
                                    onClick={
                                        ()=>{
                                            setShowMenu(!showMenu)
                                        }
                                    }
                                >
                                    <Typography sx={{ display: 'flex', paddingLeft: 1 }}>
                                        <Box className="form-card-none div-link"> {calcName} </Box>
                                        <KeyboardArrowDownIcon sx={{ color: 'blue' }} />
                                    </Typography>
                                </Box>
                                {
                                    (showMenu)?
                                    <Box sx={{ 
                                        position:'absolute',    
                                        width:'230px',
                                        height: '100px',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                        borderRadius: 5,
                                    }}>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([true, false, false])
                                                    setCalcName("Hexadecimal Calculator")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card-1': index[0],
                                                'form-card-none': !index[0],
                                                'div-link': true
                                            })}
                                            sx={{ 
                                                    width:'100%',
                                                    fontSize: 16,
                                                    paddingTop: 0.1, 
                                                    marginBottom:0.5
                                                }}>
                                            <Box>
                                                Hexadecimal Calculator
                                            </Box>
                                        </Typography >
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, true, false])
                                                    setCalcName("Hexadecimal to decimal")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card-2': index[1],
                                                'form-card-none': !index[1],
                                                'div-link': true
                                            })}
                                            sx={{ width:'100%' }}>
                                            <Box
                                                sx={{ 
                                                    width:'100%',
                                                    fontSize: 16,
                                                    paddingTop: 0.1, 
                                                    marginBottom:0.5
                                                }}>
                                                Hexadecimal to decimal
                                            </Box>
                                        </Typography>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, false, true])
                                                    setCalcName("Decimal to hexadecimal")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card-3': index[2],
                                                'form-card-none': !index[2],
                                                'div-link': true
                                            })}
                                            sx={{ width:'100%' }}>
                                            <Box
                                                sx={{ 
                                                    width:'100%',
                                                    fontSize: 16,
                                                    paddingTop: 0.1, 
                                                    marginBottom:0.5
                                                }}
                                            >Decimal to hexadecimal</Box>
                                        </Typography>
                                    </Box>
                                    :<Box></Box>
                                }
                            </Box>
                            <Box sx={{...formCardStyle}}></Box>
                        </Box>
                        {
                            (index[0])?
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
                            :<Box></Box>
                        }
                        {
                            (index[1])?
                            <Formik
                            initialValues={{ 
                                value:"",
                                method: "HexadecimalToDecimalCalculator"
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
                                        setValue([responseData.message.valueInDecimal])
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
                                                <Box sx={{...labelStyle}}>Hexadecimal value</Box></Grid>
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
                        {
                            (index[2])?
                            <Formik
                        initialValues={{ 
                            value:"",
                            method: "DecimalToHexadecimalCalculator"
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
                                    setValue([responseData.message.valueInHexadecimal])
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

                                        <Grid item={true} xs={5} >
                                            <Box sx={{...labelStyle}}>Deciaml value</Box></Grid>
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
                                <Box sx={{marginLeft: 5}}>
                                    <p>Answer</p>
                                    <p>{value}</p>
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