/**
 * 
 * THIS MAKES THE AVERAGE CALCULATOR FORM
 */


 import React, { useRef, useState, useEffect } from 'react'
 import CustomForm from '../../forms/CustomForm'
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

 const Latex = require('react-latex');

 function PercentToFractionsCalculator(){
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
                Percent to fraction conversion is needed to make use of the value of percentage in a calculation. In any calculation, the percent value has to be changed in a number in fractional form by removing the percent symbol and dividing it by 100. So, x percent to fraction is x/100. For example, 50% is equivalent to 50/100 which can be reduced to 1/2.
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
                    sx={{ maxWidth: 450,paddingBottom: 1 }}
                    className="animated-box" >
                     <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{height:25, width: '100%' }}>
                            <Typography>
                                <Box
                                    sx={{
                                        color:'#4072B5',
                                        fontWeight:'bold', 
                                        paddingLeft:2
                                    }}>Calculator</Box>
                            </Typography>
                        </Box>
                         {/* <Box sx={{...formCardStyle}}></Box> */}
                     </Box>
                     <Formik
                         initialValues={{ 
                            value: "",
                             method: "PercentToFractionsCalculator"
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
                                     setValue([responseData.message.answer])
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
                                             <Box sx={{...labelStyle}}>Percentage</Box></Grid>
                                         <Grid item={true} xs={5}>
                                             <CustomForm
                                                 type="text"
                                                 name="value"
                                                 onChange={handleChange}
                                                 value={values.value}
                                                 placeholder=""
                                             />
                                         </Grid>
                                         <Grid item xs={2}>
                                            <Typography sx={{ marginTop: 0.5}}>
                                                <Latex displayMode={false}>{`$\\hspace{.1cm}=\\hspace{.1cm}?$`}</Latex>
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
                                            sx={{
                                                paddingLeft: 2, paddingRight: 2, 
                                                minWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                                <Box sx={{display:"flex", justifyContent:"start"}}>
                                                    <CustomFormBtn 
                                                    type="button" 
                                                    handleClick={()=>{ 
                                                        controlAnimation();

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
                             </form>
                         )}
                     </Formik>
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
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Box sx={{height:25, width: '100%' }}>
                                        <Typography>
                                            <Box
                                                sx={{
                                                    color:'#4072B5',
                                                    fontWeight:'bold', 
                                                    paddingLeft:2
                                                }}>Result</Box>
                                        </Typography>
                                    </Box>
                                    {/* <Box sx={{ ...formCardStyle }}></Box> */}
                                </Box>
                            <Box sx={{marginLeft: 5}}>
                                <p>Fraction</p>
                                <p>{value}</p>
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
 
 export default PercentToFractionsCalculator 