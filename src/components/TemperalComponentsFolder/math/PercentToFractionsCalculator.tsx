/**
 * 
 * THIS MAKES THE AVERAGE CALCULATOR FORM
 */


 import React, { useRef, useState, useEffect } from 'react'
 import CustomForm, {CustomFormPercentage} from '../../forms/CustomForm'
 import { Field, Form, Formik, FormikProps } from 'formik'
 import { mathMainService } from '../../../services/mathService/mathMainService'
 import Anime from 'react-animejs-wrapper'
 import AddLayout from '../../layouts/AddLayout'
 import { Box, Grid, Typography } from '@mui/material'
 import { NavBar2 } from '../../navbar/navbar2'
 import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
 import TextCard from '../../utilityComponents/TextCard'
 import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
 import fractions from '../../../common/assets/fractions_icon.svg';
 import math_icon from '../../../common/assets/math_icon.svg';
 import PercentToFraction from '../wigets/fractions/PercentToFraction'
 import validateNumbers, {decimalValidator} from '../../../utilities/validators/validateNumbers'
 var classNames = require('classnames');
 var Latex = require('react-latex');

 function PercentToFractionsCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [inputValue, setInputValue] = useState("30")
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue("")
        setErrorMSG(false)
        console.log(inputValue)
    }
 
     return(
         <>
         <NavBar2 pageimage={math_icon} categoryname="Fraction Calculator" pagename="Percent To Fractions Calculator"/>
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
                        <Box sx={{height:2, width: '100%' }}>
                           
                        </Box>
                         {/* <Box sx={{...formCardStyle}}></Box> */}
                     </Box>
                     <Formik
                         initialValues={{ 
                            value: inputValue,
                             method: "PercentToFractionsCalculator"
                         }}
                         onSubmit = {(values)=>{
                             const data = {
                                value: values.value,
                                 method: values.method
                             }
                             setInputValue(values.value)

                             var validate = validateNumbers([values.value])

                             const postData = async () => {
                                 const responseData = await mathMainService(data)
                                 var msg:any = responseData.statusDescription;
                                 if(msg === "success"){
                                    setControlAnimation(true)
                                    setValue([responseData.message.answer])
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
                             
                         {({
                             values,
                             handleChange,
                             handleSubmit,
                             isSubmitting
                         }) => (
                             <form onSubmit={handleSubmit}>
                                <Box sx={{  minHeight: 150, display:'flex', flexDirection:'column' }}>
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
                                                            marginBottom:3,
                                                            display:'flex',
                                                            justifyContent:'center'
                                                        }}>
                                                            <Latex displayMode={true}>{`$A \\% = \\frac{b}{c} $`}</Latex>
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{display:'flex', justifyContent:'center'}}>
                                                    <Box sx={{display:'flex'}}>
                                                        <Box sx={{...labelStyle }}>Percenatage : </Box>
                                                        <Box sx={{width: 100, marginLeft:1}}>
                                                            <CustomFormPercentage
                                                                type="text"
                                                                name="value"
                                                                onChange={handleChange}
                                                                value={values.value}
                                                                placeholder=""
                                                            />
                                                        </Box>
                                                        <Typography sx={{ marginTop: 0}}>
                                                            <Latex displayMode={false}>{`$=\\hspace{.1cm}?$`}</Latex>
                                                        </Typography>   
                                                    </Box>
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
                                                        Enter a validate decimal number
                                                    </Box>
                                                </Typography>
                                                :<></>
                                            }
                                        </Box>
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
                             </form>
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
                                    {/* <Box sx={{ ...formCardStyle }}></Box> */}
                                </Box>
                                <Box sx={{paddingLeft: 3}}>
                                    <Typography sx={{ fontSize: 16, border:'none' }}>
                                        <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                            Calculation Steps:
                                        </Box>
                                    </Typography>
                                    <PercentToFraction data={inputValue}/>
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


 
 export default PercentToFractionsCalculator 