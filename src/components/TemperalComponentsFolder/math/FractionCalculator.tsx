
import React, { useRef, useState, useEffect } from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikFormFraction, CustomFormikOptionsFractions } from '../../forms/CustomForm'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import fractions from '../../../common/assets/fractions_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import FractionsADD from '../wigets/fractions/FractionsADD'
import validateNumbers from '../../../utilities/validators/validateNumbers'
import SimpilfyFraction from '../wigets/fractions/SimplifyFraction'
var classNames = require('classnames');
var Latex = require('react-latex');

function FractionCalculator() {
    const [value, setValue] = useState<any[]>([])
    const [inputValue, setInputValue] = useState(['2','10','4','5'])
    const [operator, setOperator] = useState("addition")
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue(['','','',''])
        setErrorMSG(false)
        console.log(inputValue)
    }

    const inChangeOperator = (e:any) =>{
        setOperator(e)
    }

    useEffect(()=>{
        console.log("This is operator ", operator)
    },[operator])
    

    return (
        <>
            <NavBar2 pageimage={math_icon} categoryname="Fraction Calculator" Calculator pagename="Fraction Calculator" />
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
                <Box sx={{ display: 'flex', justifyContent:'center'}}>

               
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
                        sx={{ maxWidth: 450,paddingBottom: 1 }}
                        className="animated-box" >
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{height:2, width: '100%' }}>
                                <Typography>
                                    <Box
                                        sx={{
                                            color:'#4072B5',
                                            fontWeight:'bold', 
                                            paddingLeft:2
                                        }}></Box>
                                </Typography>
                            </Box>
                                {/* <Box sx={{ ...formCardStyle }}></Box> */}
                            </Box>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    valuea: inputValue[0],
                                    valueb: inputValue[1],
                                    valuec: inputValue[2],
                                    valued: inputValue[3],
                                    operation: operator,
                                    method: "FractionCalculator"
                                }}


                                onSubmit={(values:any, actions) => {
                                    
                                    const valuea = values.valuea
                                    const valueb = values.valueb
                                    const valuec = values.valuec
                                    const valued = values.valued
                                    const data = {
                                        valuea: valuea,
                                        valueb: valueb,
                                        valuec: valuec,
                                        valued: valued,
                                        operation: values.operation,
                                        method: values.method
                                    }

                                    setInputValue([
                                        values.valuea,
                                        values.valueb,
                                        values.valuec,
                                        values.valued
                                    ])

                                    setOperator(values.operation)

                                    var validate = validateNumbers([
                                        values.valuea,
                                        values.valueb,
                                        values.valuec,
                                        values.valued
                                    ])
                                    
                                    const postData = async () => {
                                        const responseData = await mathMainService(data)
                                        var msg: any = responseData.statusDescription;
                                        if (msg === "success") {
                                            setControlAnimation(true)
                                            setValue([
                                                responseData.message.numerator,
                                                responseData.message.denominator
                                            ])
                                        }
                                    }

                                    if(validate){
                                        postData() 
                                        setErrorMSG(false)
                                        console.log("You can post data")
                                    }
                                    else{
                                        setErrorMSG(true)
                                        setControlAnimation(false)
                                        setValue([])
                                        console.log("You cant post data")
                                    }
                                  
                                    
                                }}>

                                {(props: FormikProps<any>) => (
                                    <Form>
                                        <Box sx={{ minHeight: 100, border:'0px solid red',}}>
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
                                                <Grid item xs={12}>
                                                    <Typography sx={{marginBottom: 1}}>    
                                                        <Box
                                                            sx={{
                                                                fontWeight: 100,
                                                                fontStyle: 'bold',
                                                                fontSize: 14,
                                                                // color: '#b0b0b0',
                                                                marginBottom:3,
                                                                display:'flex',
                                                                justifyContent:'center'
                                                            }}>
                                                            {
                                                                (operator === 'addition')?
                                                                <Latex displayMode={true}>{`$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$`}</Latex>
                                                                :<></>
                                                            }
                                                            {
                                                                (operator === 'subtraction')?
                                                                <Latex displayMode={true}>{`$\\frac{a}{b} - \\frac{c}{d} = \\frac{ad - bc}{bd}$`}</Latex>
                                                                :<></>
                                                            }
                                                            {
                                                                (operator === 'multiply')?
                                                                <Latex displayMode={true}>{`$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$`}</Latex>
                                                                :<></>
                                                            }
                                                            {
                                                                (operator === 'divide')?
                                                                <Latex displayMode={true}>{`$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$`}</Latex>
                                                                :<></>
                                                            }
                                                        </Box>
                                                      
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                        
                                                        }}>
                                                        <Box sx={{ 
                                                            width: 100,
                                                            paddingLeft: '5px',
                                                            paddingRight: '5px'
                                                        }}>
                                                            <Box sx={{ width: 100,}}>
                                                                <Field
                                                                        type="text"
                                                                        name="valuea"
                                                                        component={CustomFormikFormFraction}
                                                                    />
                                                            </Box>
                                                            <Box sx={{ 
                                                                    width: 100,
                                                                    paddingLeft: '5px',
                                                                    paddingRight: '5px'
                                                                 }}>
                                                                <Box 
                                                                    sx={{
                                                                        backgroundColor: '#b5b5b5',
                                                                        width: '100%',
                                                                        borderRadius: 1,
                                                                        height: 2,
                                                                        marginTop: 0.5,
                                                                        marginBottom: 0.5,
                                                                        color: '#3023AE'
                                                                    }}></Box>
                                                            </Box>
                                                            <Box sx={{ width: 100,}}>
                                                                <Field
                                                                        type="text"
                                                                        name="valueb"
                                                                        component={CustomFormikFormFraction}
                                                                    />
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ width: 50, marginTop: 2.5,marginLeft:1, marginRight:1 }}>
                                                            <Field 
                                                                as={CustomFormikOptionsFractions}
                                                                changeStateValue={setOperator} 
                                                                statevalue={operator} 
                                                                name="operation" />
                                                        </Box>
                                                        <Box sx={{ width: 100}}>
                                                            <Box sx={{ width: '100%'}}>
                                                                <Field
                                                                        type="text"
                                                                        name="valuec"
                                                                        component={CustomFormikFormFraction}
                                                                    />
                                                            </Box>
                                                            <Box 
                                                                sx={{ 
                                                                        width: '100%',
                                                                        paddingLeft: '5px',
                                                                        paddingRight: '5px' 
                                                                    }}>
                                                                <Box 
                                                                    sx={{
                                                                        backgroundColor: '#b5b5b5',
                                                                        width: '100%',
                                                                        borderRadius: 1,
                                                                        height: 2,
                                                                        marginTop: 0.5,
                                                                        marginBottom: 0.5,
                                                                        color: '#3023AE'
                                                                    }}></Box>
                                                            </Box>
                                                            <Box sx={{ width: '100%'}}>
                                                                <Field
                                                                    type="text"
                                                                    name="valued"
                                                                    component={CustomFormikFormFraction}
                                                                />
                                                            </Box>
                                                        </Box>
                                                        <Typography sx={{ fontSize: 18, border:'none' }}>
                                                            <Latex displayMode={true}>{`$\\textbf{\\hspace{.1cm}=\\hspace{.1cm}?}$`}</Latex>
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            
                                            </Grid>
                                            <Box sx={{ border:'0px solid red',flexGrow: 1 }}>
                                                {/* 
                                                    error message
                                                */}
                                                {
                                                    (errorMSG)?
                                                    <Typography sx={{width:'100%'}}>
                                                        <Box sx={{ color: 'red', textAlign:'center' }}>
                                                            Enter validate non zero numbers
                                                        </Box>
                                                    </Typography>
                                                    :<></>
                                                }
                                            </Box>
                                                
                                            <Box sx={{ border:'0px solid red',flexGrow: 1 }}>
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
                                <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'center',
                                        backgroundColor:'#4072B5',
                                        borderRadius: 20,
                                        marginBottom: 2,   
                                    }}>
                                    <Box sx={{ height: 25, width: '100%' }}>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    
                                                }}>Result</Box>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ paddingLeft:5 }}>
                                   <Typography >
                                       <Box sx={{ display: 'flex', justifyContent:'center', fontWeight: 'bold', flexDirection: 'column'}}>
                                            <Typography sx={{ fontSize: 16, border:'none' }}>
                                                <Box sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: 14,}}>
                                                    Calculation Steps:
                                                </Box>
                                            </Typography>
                                            {
                                                (operator === 'addition')?
                                                <Latex displayMode={true}>{`$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$`}</Latex>
                                                :<></>
                                            }
                                            {
                                                (operator === 'subtraction')?
                                                <Latex displayMode={true}>{`$\\frac{a}{b} - \\frac{c}{d} = \\frac{ad - bc}{bd}$`}</Latex>
                                                :<></>
                                            }
                                            {
                                                (operator === 'multiply')?
                                                <Latex displayMode={true}>{`$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$`}</Latex>
                                                :<></>
                                            }
                                            {
                                                (operator === 'divide')?
                                                <Latex displayMode={true}>{`$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$`}</Latex>
                                                :<></>
                                            }
                                            {
                                                (operator === "addition")?
                                                <>
                                                    <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                                        <Box sx={{marginBottom: 0}}>
                                                            <Latex displayMode={true}>{`$=\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$`}</Latex>
                                                        </Box>
                                                    </Typography>
                                                    <FractionsADD data={inputValue} />
                                                </>
                                                :<></>   
                                            }
                                            {
                                                (operator === "subtraction")?
                                                <></>
                                                :<></>
                                        

                                            }
                                            {
                                                (operator === "multiply")?
                                                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                                
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${inputValue[0]}}{${inputValue[1]}} \\times \\frac{${inputValue[2]}}{${inputValue[3]}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${inputValue[0]} \\times ${inputValue[2]}} {${inputValue[1]} \\times  ${inputValue[3]}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${parseFloat(inputValue[0]) * parseFloat(inputValue[2])}} {${parseFloat(inputValue[1]) * parseFloat(inputValue[3])}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                    <Latex displayMode={true}>{`$\\textrm{Answer}=\\frac{${parseFloat(inputValue[0]) * parseFloat(inputValue[2])}} {${parseFloat(inputValue[1]) * parseFloat(inputValue[3])}}$`}</Latex>
                                                    </Box>
                                                    <SimpilfyFraction data={[parseFloat(inputValue[0]) * parseFloat(inputValue[2]), parseFloat(inputValue[1]) * parseFloat(inputValue[3])]}/>
                                                </Typography>
                                                :<Box></Box>
                                            }
                                            {
                                                (operator === "divide")?
                                                <Typography sx={{ fontSize: 16, border:'none', width: 100 }}>
                                                
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${inputValue[0]}}{${inputValue[1]}} \\div \\frac{${inputValue[2]}}{${inputValue[3]}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${inputValue[0]}}{${inputValue[1]}} \\times \\frac{${inputValue[3]}}{${inputValue[2]}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${inputValue[0]} \\times ${inputValue[3]}} {${inputValue[1]} \\times  ${inputValue[2]}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$=\\frac{${parseFloat(inputValue[0]) * parseFloat(inputValue[3])}} {${parseFloat(inputValue[1]) * parseFloat(inputValue[2])}}$`}</Latex>
                                                    </Box>
                                                    <Box sx={{marginBottom: 2}}>
                                                        <Latex displayMode={true}>{`$\\textrm{Answer}=\\frac{${parseFloat(inputValue[0]) * parseFloat(inputValue[3])}} {${parseFloat(inputValue[1]) * parseFloat(inputValue[2])}}$`}</Latex>
                                                    </Box>
                                                </Typography>
                                                :<Box></Box>
                                            }
                                       </Box>
                                   </Typography>
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

export default FractionCalculator