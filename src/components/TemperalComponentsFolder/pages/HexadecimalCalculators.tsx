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
import { CustomFormikForm, CustomFormikOptions,CustomFormikFormPlain } from '../../forms/CustomForm'
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
var classNames = require('classnames');
var Latex = require('react-latex');

const menubutton = {
    width:'100%',
    fontSize: 16,
    paddingTop: 0.1, 
    marginBottom:0.5,
    boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.2)',
}

function HexadecimalOperations({
    field,
    changeStateValue,
    //value,
    //onChange,
    statevalue, // { name, value, onChange, onBlur }
    ...props
  }:any){
    const[value, setValue] = useState(statevalue)
    const handleChange = (e:any) => {
      setValue(e.target.value)
      // changeStateValue(e.target.value)
    }

    return(
        <Box sx={{
            display: 'flex',
            paddingLeft: '5px',
            paddingRight: '5px',
            width:'100%'
          }}>
            <select 
            style={{
                width:'100%',
                backgroundColor:'#EEEEEE',
                border: 'solid',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 3,
                height: 28
            }}
            value={value}
            onChange={handleChange}
            {...props} >
                <option value="Addition">+</option>
                <option value="Subtraction">-</option>
                <option value="Multiply">*</option>
                <option value="Divide">/</option>
            </select>
          </Box>
    );
}


export default function HexadecimalCalculators(){
    const [index, setIndex] = useState([true,false,false])
    const [calcName, setCalcName] = useState("Hexadecimal Calculator")
    const [showMenu, setShowMenu] = useState(false)
    const [operator, setOperator] = useState("addition")
    const [inputValue, setInputValue] = useState(["323", "A23"])
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
        <NavBar2 pageimage={math_icon} categoryname="General Math" pagename="Hexadecimal Calculators"/>
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
                        className="animated-box"
                        sx={{ 
                            width: {
                                lg:450,
                                md:450,
                                sm:'100%',
                                xs:'100%'
                            }, 
                            minHeight: 100, paddingBottom: 1 }}>
                        
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
                                        zIndex: 20
                                    }}>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([true, false, false, false])
                                                    setCalcName("Hexadecimal Calculator")
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
                                                Hexadecimal Calculator
                                            </Box>
                                        </Typography >
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, true, false, false])
                                                    setCalcName("Hexadeciaml to decimal")
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
                                                Hexadeciaml to decimal
                                            </Box>
                                        </Typography>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, false, true, false])
                                                    setCalcName("Decimal to Hexadecimal")
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
                                            <Box> Decimal to Hexadecimal</Box>
                                        </Typography>
                                       
                                    </Box>
                                    :<Box></Box>
                                }
                            </Box>
                        </Box>
                        {
                            (index[0])?
                            <Formik
                            initialValues={{ 
                                first_value:inputValue[0],
                                second_value:inputValue[1],
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

                                setInputValue([
                                    values.first_value,
                                    values.second_value
                                ])

                                setOperator(values.operation)

                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setControlAnimation(true)
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
                                    <Box sx={{ width: '100%', minHeight: 50, display:'flex', flexDirection:'column' }}>
                                    <   Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>   
                                            {/* <Grid item xs={12}>
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
                                            </Grid> */}
                                            <Grid item xs={12}>
                                            <Box sx={{
                                                width: '100%',
                                                display:"flex",
                                                justifyContent:'center' }}>
                                                <Box sx={{width: '100px' }}>
                                                    <Field
                                                        type="text"
                                                        name="first_value"
                                                        component={CustomFormikFormPlain}
                                                    />
                                                    <Typography>
                                                        <Box 
                                                            sx={{
                                                                ...errorText
                                                            }}>{props.errors.first_value}</Box>
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width: '50px'}}>
                                                    <Field
                                                        as={HexadecimalOperations}
                                                        changeStateValue={setOperator} 
                                                        statevalue={operator}
                                                        name="operation"
                                                    />
                                                </Box>
                                                <Box sx={{width: '100px'}}>
                                                    <Field
                                                        type="text"
                                                        name="second_value"
                                                        component={CustomFormikFormPlain}
                                                    />
                                                    <Typography>
                                                        <Box 
                                                            sx={{
                                                                ...errorText
                                                            }}>{props.errors.second_value}</Box>
                                                    </Typography>
                                                </Box>
                                                <Box sx={{maxWidth: '100%'}}>
                                                    <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>
                                                        <Latex displayMode={false}>{`$\\hspace{.1cm}=\\hspace{.1cm}?$`}</Latex>
                                                    </Typography>
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
                                </Form>
                            )}
                        </Formik>
                            :<Box></Box>
                        }
                        {
                            (index[1])?
                            <Formik
                            enableReinitialize
                            initialValues={{ 
                                value:inputValue[0],
                                method: "HexadecimalToDecimalCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    value: values.value,
                                    method: values.method
                                }

                                setInputValue([
                                    values.value
                                ])

                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setControlAnimation(true)
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
                                <form style={{width:'100%',}} onSubmit={handleSubmit}>
                                   <Box sx={{ width: '100%', minHeight: 50, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                           
                                            <Grid item={true} xs={12} >
                                                <Box sx={{display:'flex', width: '100%', justifyContent: 'center'}}>
                                                    <Box sx={{...labelStyle, width:'150px'}}>Hexadecimal value:</Box>
                                                    <Box sx={{width: '100px'}}>
                                                        <CustomForm
                                                            type="text"
                                                            name="value"
                                                            onChange={handleChange}
                                                            value={values.value}
                                                            placeholder=""
                                                        />
                                                    </Box>
                                                    <Box sx={{width: '50px'}}>
                                                        <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>
                                                            <Latex displayMode={false}>{`$\\hspace{.1cm}=\\hspace{.1cm}?$`}</Latex>
                                                        </Typography>
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
                                </form>
                            )}
                        </Formik>
                            :<Box></Box>
                        }
                        {
                            (index[2])?
                            <Formik
                            enableReinitialize
                            initialValues={{ 
                                value:inputValue[0],
                                method: "DecimalToHexadecimalCalculator"
                            }}

                            onSubmit = {(values)=>{
                            const data = {
                                value: values.value,
                                method: values.method
                            }

                            setInputValue([values.value])

                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setControlAnimation(true)
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
                            <form style={{ width: '100%'}} onSubmit={handleSubmit}>
                               <Box sx={{ width: '100%', minHeight: 50, display:'flex', flexDirection:'column' }}>
                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                        
                                        <Grid item xs={12}>
                                            <Box sx={{display:'flex', width: '100%', justifyContent: 'center'}}>
                                                <Box sx={{...labelStyle, width:'115px'}}>Decimal value:</Box>
                                                <Box sx={{width: '100px'}}>
                                                    <CustomForm
                                                        type="text"
                                                        name="value"
                                                        onChange={handleChange}
                                                        value={values.value}
                                                        placeholder=""
                                                    />
                                                </Box>
                                                <Box sx={{width: '50px'}}>
                                                    <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>
                                                        <Latex displayMode={false}>{`$\\hspace{.1cm}=\\hspace{.1cm}?$`}</Latex>
                                                    </Typography>
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
                            </form>
                        )}
                    </Formik>
                            :<Box></Box>
                        }
                      
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
                                </Box>
                                <Box sx={{paddingLeft: 3}}>
                                    <Typography sx={{ fontSize: 16, border:'none' }}>
                                        <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                            Calculation Steps:
                                        </Box>
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, border:'none' }}>
                                        {
                                            (operator === 'Addition')?
                                            <>
                                                 <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$ {${inputValue[0]}} + {${inputValue[1]}}$`}</Latex>
                                                </Box>
                                                <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$\\textrm{Answer}={${value[3]}}$`}</Latex>
                                                </Box>
                                            </>
                                            :<></>
                                        }
                                        {
                                            (operator === 'Subtraction')?
                                            <>
                                                 <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$ {${inputValue[0]}} - {${inputValue[1]}}$`}</Latex>
                                                </Box>
                                                <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$\\textrm{Answer}={${value[3]}}$`}</Latex>
                                                </Box>
                                            </>
                                            :<></>
                                        }
                                        {
                                            (operator === 'Multiply')?
                                            <>
                                                 <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$ {${inputValue[0]}} * {${inputValue[1]}}$`}</Latex>
                                                </Box>
                                                <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$\\textrm{Answer}={${value[3]}}$`}</Latex>
                                                </Box>
                                            </>
                                            :<></>
                                        }
                                        {
                                            (operator === 'Divide')?
                                            <>
                                                 <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$ {${inputValue[0]}} / {${inputValue[1]}}$`}</Latex>
                                                </Box>
                                                <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$\\textrm{Answer}={${value[3]}}$`}</Latex>
                                                </Box>
                                            </>
                                            :<></>
                                        }
                                    </Typography>
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
                                    </Box>
                                    <Box sx={{paddingLeft: 3}}>
                                        <Typography sx={{ fontSize: 16, border:'none' }}>
                                            <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                Calculation Steps:
                                            </Box>
                                            <Box sx={{marginBottom: 2}}>
                                                <Latex displayMode={true}>{`$ {${inputValue[0]}}$`}</Latex>
                                            </Box>
                                            <Box sx={{marginBottom: 2}}>
                                                <Latex displayMode={true}>{`$\\textrm{Answer}={${value[0]}}$`}</Latex>
                                            </Box>
                                        </Typography>
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
                                    </Box>
                                    <Box sx={{paddingLeft: 3}}>
                                        <Typography sx={{ fontSize: 16, border:'none' }}>
                                            <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                Calculation Steps:
                                            </Box>
                                            <Box sx={{marginBottom: 0.5, border:'solid'}}>
                                                <Latex displayMode={true}>{`$ {${inputValue[0]}}$`}</Latex>
                                            </Box>
                                            <Box sx={{marginBottom: 0.5}}>
                                                <Latex displayMode={true}>{`$\\textrm{Answer}={${value[0]}}$`}</Latex>
                                            </Box>
                                        </Typography>
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