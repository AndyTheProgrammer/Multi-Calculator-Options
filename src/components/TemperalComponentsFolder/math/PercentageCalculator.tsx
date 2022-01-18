

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
import { CustomFormikForm, CustomFormikFormFraction, CustomFormikFormPercentage,PercentageOptions } from '../../forms/CustomForm'
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PercentageChange, PercentageDifference, PercentageError, PercentageCalc} from '../wigets/percentage/Percentage'
var classNames = require('classnames');
var Latex = require('react-latex');

const menubutton = {
    width:'100%',
    fontSize: 16,
    paddingTop: 0.1, 
    marginBottom:0.5,
    boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.2)',
    zIndex: 0
}

export default function PercentageCalculators(){
    const [index, setIndex] = useState([true,false,false,false])
    const [calcName, setCalcName] = useState("Percentage Change")
    const [inputValue, setInputValue] = useState(["9", "10"])
    const [showMenu, setShowMenu] = useState(false)
    const [value, setValue] = useState<any[]>([])
    const [controlAnimation, setControlAnimation] = useState(false)


    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue(['','','',''])
        console.log(inputValue)
    }
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
                <Box className='animated-content-center' >
                {/* ANIMTION STARTS HERE */}
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
                        sx={{ maxWidth: 500, minHeight: 100, paddingBottom: 1 }}
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
                                        sx={{ width: '50%'}}>
                                                <Box
                                                sx={{
                                                    justifyContent: 'space-between',
                                                    display: 'flex', }} 
                                                    className="form-card div-link"> 
                                                    {calcName} 
                                                
                                                    {
                                                        (showMenu)?
                                                            <KeyboardArrowUpIcon sx={{ color: 'white' }} />
                                                        :   <KeyboardArrowDownIcon sx={{ color: 'white' }} />
                                                    }
                                                </Box>
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
                                        zIndex: 50
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
                                enableReinitialize
                                initialValues={{ 
                                    percentage:inputValue[0],
                                    value: inputValue[1],
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
                                    setInputValue([
                                        values.percentage,
                                        values.value
                                    ])
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setControlAnimation(true)
                                            setValue([responseData.message.result])
                                            console.log(responseData)
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{ width:'100%', minHeight: 150, display:'flex', flexDirection:'column' }}>
                                        <Grid 
                                            container={true} 
                                            rowSpacing={1} 
                                            sx={{
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                                marginBottom:4
                                            }}>
                                              
                                                <Grid item xs={12} sx={{ width: '100%' }}>
                                                    <Typography sx={{marginBottom: 0}}>    
                                                        <Box sx={{marginBottom: 2, display:'flex', justifyContent:'center'}}>
                                                            <Latex displayMode={true}>{`$\\frac{\\left(V_2 - V_1\\right)}{|V_1|} \\times ${100} = ?$`}</Latex>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                fontWeight: 100,
                                                                fontStyle: 'bold',
                                                                fontSize: 14,
                                                                color: '#b0b0b0',
                                                                marginBottom:1,
                                                                marginLeft:3.5,
                                                                textAlign:'center'
                                                            }}>
                                                            change from V<sub>1</sub> to V<sub>2</sub>
                                                        </Box>
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display:"flex",
                                                            justifyContent: 'center'
                                                        }} >
                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    marginBottom: 1,
                                                                    width: '100%',
                                                                    display:"flex",
                                                                    justifyContent: 'center' }}>
                                                                        <Typography>
                                                                            <Box>V<sub>1</sub>=</Box>
                                                                        </Typography>
                                                                        <Box sx={{width:'150px'}}>
                                                                            <Field
                                                                                    type="text"
                                                                                    name="percentage"
                                                                                    component={CustomFormikFormFraction}
                                                                                />
                                                                        </Box>
                                                                
                                                            </Box>
                                                            <Box 
                                                                sx={{
                                                                    width: '100%',
                                                                    display:"flex",
                                                                    justifyContent: 'center' }}>
                                                                        <Typography>
                                                                            <Box>V<sub>2</sub>=</Box>
                                                                        </Typography>
                                                                        <Box sx={{width:'150px'}}>
                                                                            <Field
                                                                                    type="text"
                                                                                    name="value"
                                                                                    component={CustomFormikFormFraction}
                                                                                />
                                                                        </Box>
                                                                
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

                                            <Box 
                                            // className="toggle-box-primary"
                                                sx={{
                                                    paddingLeft: 2, paddingRight: 2, 
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
                                                    <CustomFormImageBtn type="submit" name="Calculate"/>   
                                                </Box>
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
                            enableReinitialize
                                initialValues={{ 
                                    value2: inputValue[0],
                                    value1: inputValue[1],
                                    method: "PercentageDifferenceCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        value2: values.value2,
                                        value1: values.value1,
                                        method: values.method
                                    }
                                    console.log(data)
                                    setInputValue([
                                        values.value2,
                                        values.value1
                                    ])
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setControlAnimation(true)
                                            setValue([responseData.message.percentageDifference])
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                            <Grid 
                                                container={true} 
                                                rowSpacing={1} 
                                                sx={{
                                                    minWidth:'350px', 
                                                    paddingTop:2, 
                                                    paddingLeft:2, 
                                                    paddingRight:2,
                                                    marginBottom:1,
                                                    border:'0px solid red'
                                                }}>
                                                <Grid item xs={12}>
                                                    <Box sx={{
                                                        marginBottom: 1,
                                                        display:'flex',
                                                        justifyContent:'center'
                                                        }}>
                                                        <Latex displayMode={true}>{`$\\frac{|V_1 - V_2|}{\\begin{bmatrix} \\frac{V_1 + V_2}{2}\\end{bmatrix}} \\times ${100} = ?$`}</Latex>
                                                    </Box>
                                                </Grid>
                                               
                                                <Grid item xs={12} sx={{ width: '100%' }}>
                                                    <Box
                                                        sx={{
                                                            display:"flex",
                                                            justifyContent: 'center'
                                                        }} >
                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    marginBottom: 1,
                                                                    width: '100%',
                                                                    display:"flex",
                                                                    justifyContent: 'center' }}>
                                                                        <Typography>
                                                                            <Box>V<sub>1</sub> =</Box>
                                                                        </Typography>
                                                                        <Box sx={{width:'150px'}}>
                                                                            <Field
                                                                                    type="text"
                                                                                    name="value2"
                                                                                    component={CustomFormikFormFraction}
                                                                                />
                                                                        </Box>
                                                                
                                                            </Box>
                                                            <Box 
                                                                sx={{
                                                                    width: '100%',
                                                                    display:"flex",
                                                                    justifyContent: 'center' }}>
                                                                        <Typography>
                                                                            <Box>V<sub>2</sub> =</Box>
                                                                        </Typography>
                                                                        <Box sx={{width:'150px'}}>
                                                                            <Field
                                                                                    type="text"
                                                                                    name="value1"
                                                                                    component={CustomFormikFormFraction}
                                                                                />
                                                                        </Box>
                                                                
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
        
                                            <Box 
                                                    // className="toggle-box-primary"
                                                    sx={{ width: '100%' }}
                                                    >
                                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:3, paddingLeft:5, paddingRight:5}}>
                                                    <Grid item xs={4}>
                                                            <Box sx={{display:"flex", justifyContent:"start"}}>
                                                                <CustomFormBtn 
                                                                type="button" 
                                                                handleClick={()=>{ 
                                                                        clear()
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
                            enableReinitialize
                                initialValues={{ 
                                    observed_value: inputValue[0],
                                    true_value: inputValue[1],
                                    method: "PercentErrorCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        observed_value: values.observed_value,
                                        true_value: values.true_value,
                                        method: values.method
                                    }
                                    console.log(data)
                                    setInputValue([
                                        values.observed_value,
                                        values.true_value
                                    ])
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setControlAnimation(true)
                                            setValue([responseData.message.absoluteError])
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
                                        <Grid 
                                            container={true} 
                                            rowSpacing={1} 
                                            sx={{
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                                marginBottom:1,
                                                border:'0px solid red'
                                            }}>
                                            <Grid item xs={12}>
                                                <Box sx={{
                                                    marginBottom: 1,
                                                    display:'flex',
                                                    justifyContent:'center'
                                                    }}>
                                                    <Latex displayMode={true}>{`$\\frac{|\\textrm{V}_{observed} - \\textrm{V}_{true}|}{|\\textrm{V}_{true}|}\\times 100 = ?$`}</Latex>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sx={{ width: '100%' }}>
                                                   
                                                   <Box
                                                       sx={{
                                                           display:"flex",
                                                           justifyContent: 'center'
                                                       }} >
                                                       <Box>
                                                           <Box 
                                                               sx={{
                                                                   marginBottom: 1,
                                                                   width: '100%',
                                                                   display:"flex",
                                                                   justifyContent: 'center' }}>
                                                                       <Typography sx={{width:'150px'}}>
                                                                           <Box>Observed Value:</Box>
                                                                       </Typography>
                                                                       <Box sx={{width:'100px',}}>
                                                                           <Field
                                                                                   type="text"
                                                                                   name="observed_value"
                                                                                   component={CustomFormikFormFraction}
                                                                               />
                                                                       </Box>
                                                               
                                                           </Box>
                                                           <Box 
                                                               sx={{
                                                                   width: '100%',
                                                                   display:"flex",
                                                                   justifyContent: 'center' }}>
                                                                       <Typography sx={{width:'150px'}}>
                                                                           <Box>True Value:</Box>
                                                                       </Typography>
                                                                       <Box sx={{width:'100px'}}>
                                                                           <Field
                                                                                   type="text"
                                                                                   name="true_value"
                                                                                   component={CustomFormikFormFraction}
                                                                               />
                                                                       </Box>
                                                               
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
                                                                        clear();
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
                            enableReinitialize
                                initialValues={{ 
                                    percentage: inputValue[0],
                                    value: inputValue[1],
                                    method: "PercentageCalculator"
                                }}
                                onSubmit = {(values)=>{
                                    const data = {
                                        percentage: values.percentage,
                                        value: values.value,
                                        test: '',
                                        method: values.method
                                    }
                                    setInputValue([
                                        values.percentage,
                                        values.value,
                                    ])
                                    console.log(data)
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg:any = responseData.statusDescription;
                                        if(msg === "success"){
                                            setControlAnimation(true)
                                            setValue([responseData.message.result])
                                            console.log(responseData)
                                        }
                                    }
                                    postData()
                                }}>
                                    
                                {(props: FormikProps<any>) => (
                                    <Form >
                                        <Box sx={{ width:'100%', minHeight: 150, display:'flex', flexDirection:'column' }}>
                                            <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                                <Grid item xs={12}>
                                                    <Typography sx={{marginBottom: 1}}>    
                                                        <Box
                                                            sx={{
                                                                fontWeight: 100,
                                                                fontStyle: 'bold',
                                                                fontSize: 14,
                                                                color: '#b0b0b0',
                                                                marginBottom:3
                                                            }}>
                                                            amet aliquam id diam maecenas ultricies mi eget mauris pharetra
                                                        </Box>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box 
                                                        sx={{
                                                            width:'100%',
                                                            display:'flex',
                                                            justifyContent:'center'
                                                        }}>
                                                            <Box sx={{width:'100px'}}>
                                                                <Field
                                                                    type="text"
                                                                    name="percentage"
                                                                    component={CustomFormikFormPercentage}
                                                                />
                                                            </Box>
                                                            <Typography 
                                                                sx={{
                                                                    width:'10px',
                                                                    marginRight: 1
                                                                    }}>
                                                                <Box
                                                                    sx={{fontSize: 16}}
                                                                >
                                                                    Of
                                                                </Box>
                                                            </Typography>
                                                            <Box sx={{width:'100px'}}>
                                                                <Field
                                                                    type="text"
                                                                    name="value"
                                                                    component={CustomFormikForm}
                                                                />
                                                            </Box>
                                                            <Typography sx={{width:'10px'}}>
                                                                <Box
                                                                    sx={{fontSize: 16}}
                                                                >
                                                                    =
                                                                </Box>
                                                            </Typography>
                                                            <Box sx={{width:'100px'}}>
                                                            <Field
                                                                    type="text"
                                                                    name="test"
                                                                    component={CustomFormikForm}
                                                                />
                                                            </Box>
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
                                                sx={{ width: '100%' }}
                                                >
                                                <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                                <Grid item xs={4}>
                                                        <Box sx={{display:"flex", justifyContent:"start"}}>
                                                            <CustomFormBtn 
                                                            type="button" 
                                                            handleClick={()=>{ 
                                                                clear()
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
                </Box>


                {/*
                    Component displays the results 
                
                */}

                {/* ANIMTION STARTS HERE */}
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
                        {
                            (index[0])?
                            <Box 
                                // sx={{ maxWidth: 450,paddingBottom: 1 }}
                                // className="animated-box" 
                                >
                                <Box 
                                    sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'center',
                                            borderRadius: 20,
                                            marginBottom: 2,  
                                            backgroundColor:'#4072B5'
                                        }}>
                                    <Box sx={{height:25, width: '100%' }}>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    color:'white',
                                                    fontWeight:'bold', 
                                                    textAlign:'center'
                                                }}>Result</Box>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{paddingLeft: 3}}>
                                    <Typography sx={{ fontSize: 16, border:'none' }}>
                                        <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                            Calculation Steps:
                                        </Box>
                                    </Typography>
                                    <PercentageChange data={inputValue}/>
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
                                        <Box 
                                            sx={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'center',
                                                    borderRadius: 20,
                                                    marginBottom: 2,  
                                                    backgroundColor:'#4072B5'
                                                }}>
                                            <Box sx={{height:25, width: '100%' }}>
                                                <Typography>
                                                    <Box
                                                        sx={{
                                                            color:'white',
                                                            fontWeight:'bold', 
                                                            textAlign:'center'
                                                        }}>Result</Box>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{paddingLeft: 3}}>
                                            <Typography sx={{ fontSize: 16, border:'none' }}>
                                                <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                    Calculation Steps:
                                                </Box>
                                            </Typography>
                                            <PercentageDifference data={inputValue}/>
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
                                    <Box 
                                        sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'center',
                                                borderRadius: 20,
                                                marginBottom: 2,  
                                                backgroundColor:'#4072B5'
                                            }}>
                                            <Box sx={{height:25, width: '100%' }}>
                                                <Typography>
                                                    <Box
                                                        sx={{
                                                            color:'white',
                                                            fontWeight:'bold', 
                                                            textAlign:'center'
                                                        }}>Result</Box>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{paddingLeft: 3}}>
                                            <Typography sx={{ fontSize: 16, border:'none' }}>
                                                <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                    Calculation Steps:
                                                </Box>
                                            </Typography>
                                            <PercentageError data={inputValue}/>
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
                                        </Box>
                                        <Box sx={{paddingLeft: 3}}>
                                            <Typography sx={{ fontSize: 16, border:'none' }}>
                                                <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                    Calculation Steps:
                                                </Box>
                                            </Typography>
                                            <PercentageCalc data={inputValue}/>
                                        </Box>
                                </Box>
                                :<Box></Box>
                            }
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

