/**
 * 
 * THIS MAKES THE Arithmetic Sequence Calculator FORM
 */

import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../../forms/CustomForm'
import { Field, Form, Formik, FormikProps,  useFormik } from 'formik'
import { financeService } from '../../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { NavBar2 } from '../../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../../styling/CustomStyles'
import { CustomFormBtn, CustomFormImageBtn } from '../../../custom/CustomFormBtn'
import finance_icon from '../../../../common/assets/finance_icon.svg';
import invest_and_savings_icon from '../../../../common/assets/invest_and_savings_icon.svg';
 
const Latex = require('react-latex');
 
 export default function FutureValueCalculator(){
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
         <NavBar2 pageimage={finance_icon} categoryname="Investment And Savings Calculators" pagename="Future Value Calculator" />
         <AddLayout categorykey='investment' searchname='Investment And Savings Calculators' searchimage={invest_and_savings_icon}>
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
                             <Box sx={{height:25, width: '100%' }}></Box>
                             {/* <Box sx={{ ...formCardStyle }}></Box> */}
                         </Box>
                         <Formik
                             initialValues={{ 
                                interest_rate:"",
                                starting_amount: "",
                                numbe_of_periods: "",
                                periodic_deposit:"",
                                periodic_deposit_made_at: "",
                                method: "FutureValue"
                             }}
                             onSubmit = {(values, actions)=>{
                                 const data = {
                                    interest_rate: values.interest_rate,
                                    starting_amount: values.starting_amount,
                                    numbe_of_periods: values.numbe_of_periods,
                                    periodic_deposit: values.periodic_deposit,
                                    periodic_deposit_made_at: values.periodic_deposit_made_at,
                                     method: values.method
                                 }                            
                                 setValue(['NO DATA FROM END POINT'])
                                 const postData = async () => {
                                     console.log(data)
                                     const responseData = await financeService(data)
                                     var msg:any = responseData.statusDescription;
                                     if(msg === "success"){
                                         // setValue(responseData.message.answer)
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
                                     <Box sx={{minHeight: 250, display:'flex', flexDirection:'column' }}>
                                         <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                             <Grid item={true} xs={7}>
                                                 <Box sx={{ ...labelStyle }}>Interest rate</Box>
                                             </Grid>
                                             <Grid item={true} xs={5} sx={{
                                                 display:'flex'}}>
                                                 <CustomForm
                                                     type="text"
                                                     name="interest_rate"
                                                     onChange={handleChange}
                                                     value={values.interest_rate}
                                                     placeholder=""
                                                 />
                                             </Grid>
                     
                                             <Grid item xs={7}>
                                                 <Box sx={{ ...labelStyle }}>Starting amount</Box>
                                             </Grid>
                                             <Grid item xs={5}>
                                             <CustomForm
                                                 type="text"
                                                 name="starting_amount"
                                                 onChange={handleChange}
                                                 value={values.starting_amount}
                                                 placeholder=""
                                             />
                                             </Grid>
                                         
                                             <Grid item xs={7}>
                                                 <Box sx={{ ...labelStyle }}>number of periods</Box>
                                             </Grid>
                                             <Grid item xs={5}>
                                                 <CustomForm
                                                     type="text"
                                                     name="numbe_of_periods"
                                                     onChange={handleChange}
                                                     value={values.numbe_of_periods}
                                                     placeholder=""
                                                 />
                                             </Grid>    
                                             <Grid item xs={7}>
                                                 <Box sx={{ ...labelStyle }}>Periodic deposit</Box>
                                             </Grid>
                                             <Grid item xs={5}>
                                                 <CustomForm
                                                     type="text"
                                                     name="periodic_deposit"
                                                     onChange={handleChange}
                                                     value={values.periodic_deposit}
                                                     placeholder=""
                                                 />
                                             </Grid> 
                                             <Grid item xs={7}>
                                                 <Box sx={{ ...labelStyle }}>Periodic deposit made</Box>
                                             </Grid>
                                             <Grid item xs={5}>
                                                 <CustomForm
                                                     type="text"
                                                     name="periodic_deposit_made_at"
                                                     onChange={handleChange}
                                                     value={values.periodic_deposit_made_at}
                                                     placeholder=""
                                                 />
                                             </Grid>                 
                                         </Grid>
                                         
                                         <Box sx={{flexGrow: 1}}>
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
                                <Box sx={{height:30, width: '100%' }}></Box>
                                <Box sx={{
                                        height:30, width: '100%', 
                                        // backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
                                        borderRadius: '0 10px 3px', 
                                    }}></Box>
                            </Box>
                            <Box sx={{marginLeft: 5}}>
                               {
                                   value[0]
                               }
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