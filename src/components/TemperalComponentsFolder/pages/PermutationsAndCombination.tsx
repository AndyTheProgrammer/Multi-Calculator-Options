
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
import stats from '../../../common/assets/stats_icon.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Latex = require('react-latex');
var classNames = require('classnames');

export default function PermutationsAndCombination(){
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
        <NavBar2 pageimage={math_icon} categoryname="General Math" pagename="Permutations and Combinations Calculators"/>
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
                        sx={{ maxWidth: 500, minHeight: 200, paddingBottom: 1 }}
                        className="animated-box" >
                        
                        <Box sx={{ width:'100%', display: 'flex', }}>      
                            <Typography
                                onClick={
                                    ()=>{
                                        setIndex([true, false, false])
                                        setCalcName("Permutations Calculator")
                                        setShowMenu(false)
                                    }
                                }
                                className={classNames({
                                    'form-card-1-b': index[0],
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
                                    Permutations Calculator
                                </Box>
                            </Typography >
                            <Typography
                                onClick={
                                    ()=>{
                                        setIndex([false, true, false])
                                        setCalcName("Combinations Calculato")
                                        setShowMenu(false)
                                    }
                                }
                                className={classNames({
                                    'form-card-3-b': index[1],
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
                                    Combinations Calculator
                                </Box>
                            </Typography>
                                       
                                    
                        </Box>
                        {
                            (index[0])?
                            <Formik
                        initialValues={{ 
                            total_number:"",
                            amount_in_each_subset: "",
                            method: "PermutationCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                total_number: values.total_number,
                                amount_in_each_subset: values.amount_in_each_subset,
                                method: values.method
                            }
                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setValue([responseData.message.nfactorial])
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
                                            <Box sx={{...labelStyle}}>Total Number</Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <CustomForm
                                                type="text"
                                                name="total_number"
                                                onChange={handleChange}
                                                value={values.total_number}
                                                placeholder=""
                                            />
                                        </Grid>
                
                                        <Grid item xs={5}>
                                            <Box sx={{...labelStyle}}>Amount</Box></Grid>
                                        <Grid item xs={7}>
                                        <CustomForm
                                            type="text"
                                            name="amount_in_each_subset"
                                            onChange={handleChange}
                                            value={values.amount_in_each_subset}
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
                            (index[1])?
                            <Formik
                            initialValues={{ 
                                total_number:"",
                                amount_in_each_subset: "",
                                method: "CombinationsCalculator"
                            }}
                            validate={
                                (values)=>{
                                    interface Errors{
                                        total_number: string,
                                        amount_in_each_subset: string
                                    }
                                    const errors = {} as Errors
                                    if(!values.total_number){
                                        errors.total_number = 'Required'
                                    }
                                    else if(!parseInt(values.total_number)){
                                        errors.total_number = 'Number is required'
                                    }

                                    if(!values.amount_in_each_subset){
                                        errors.amount_in_each_subset = 'Required'
                                    }
                                    else if(!parseInt(values.amount_in_each_subset)){
                                        errors.amount_in_each_subset = 'Number is required'
                                    }
                                   
                                    return errors
                                }
                            }
                            onSubmit = {(values)=>{
                                const data = {
                                    total_number: values.total_number,
                                    amount_in_each_subset: values.amount_in_each_subset,
                                    method: values.method
                                }
                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setValue([
                                            responseData.message.unitType,
                                            responseData.message.nfactorial,
                                            responseData.message.dividerfactorial,
                                            responseData.message.rFactorial,
                                            responseData.message.Combinations
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
                                    <Box sx={{  minHeight: 200, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                            <Grid xs={12}>
                                                <Typography>    
                                                    <Box
                                                    sx={{
                                                            fontWeight: 100,
                                                            fontStyle: 'italic',
                                                            fontSize: 18,
                                                            color: '#b0b0b0',
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}>
                                                        <Latex displayMode={false}>{`$ {n+1\\choose r}= {n\\choose r} + {n \\choose r-1}$`}</Latex>
                                                    </Box>
                                                    
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <Box sx={labelStyle}>n (objects)</Box>
                                            </Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="total_number"
                                                    onChange={handleChange}
                                                    value={values.total_number}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.total_number}</Box>
                                                </Typography>
                                                
                                            </Grid>
                    
                                            <Grid item xs={5}>
                                                <Box sx={labelStyle}>r (samples)</Box>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="amount_in_each_subset"
                                                    onChange={handleChange}
                                                    value={values.amount_in_each_subset}
                                                    placeholder=""
                                                />
                                                <Typography>
                                                    <Box 
                                                        sx={{
                                                            ...errorText
                                                        }}>{errors.amount_in_each_subset}</Box>
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
                                    <p>Answer</p>
                                    <p>{value}</p>
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
                                    <Typography>
                                        <Box
                                            sx={{
                                                // ...labelStyle,
                                                fontSize: 18,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {/* <Latex displayMode={false}>{`$ {n+1\\choose r}= {n\\choose r} + {n \\choose r-1}$`}</Latex> */}
                                        </Box>
                                        <Box>
                                            <TextCard leadingtext="n factorial" trailingtext={value[1]}/>
                                        </Box>
                                        <Box>
                                            <TextCard leadingtext="Combinations" trailingtext={value[4]}/>
                                        </Box>
                                        <Box>
                                            <TextCard leadingtext="Divider factorial" trailingtext={value[2]}/>
                                        </Box>
                                    </Typography>
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