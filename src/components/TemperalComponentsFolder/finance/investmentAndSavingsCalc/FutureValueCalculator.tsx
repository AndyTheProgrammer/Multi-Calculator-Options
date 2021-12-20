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
 import { CustomFormBtn, CustomFormImageBtn } from '../../../custom/CustomFormBtn'
 import { NavBar2 } from '../../../navbar/navbar2'
 
 import { labelStyle, formCardStyle, formDisplay } from '../../../../styling/CustomStyles'
 
 
  const Latex = require('react-latex');
  const innerBoxStyle = {
     border:'solid',
     width: 400,
     height: 300,
     borderRadius: '20px',
     boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
     backgroundColor: 'white'
  }
 
 export default function FutureValueCalculator(){
     const [value, setValue] = useState("")
     const [inputValue, setInputValue] = useState([""])
 
     const animatedSquaresRef1 = useRef(null)
     const animatedSquaresRef2= useRef(null)
   
     // @ts-ignore: Object is possibly 'null'.
     const play1 = () => animatedSquaresRef1.current.play();
     // @ts-ignore: Object is possibly 'null'.
     const play2 = () => animatedSquaresRef2.current.play();
 
     useEffect(()=>{
 
         if(value){
             play1();
             play2();
         }
     })
 
     return(
         <>
         <NavBar2 pagename="Future Value Calculator" />
         <AddLayout>
             <Box sx={{ display: "flex", justifyContent: "center" }}>
                 
             <Anime
                 style={{
                     position: 'absolute',
                 }}
                 ref={animatedSquaresRef1}
                 config={{
                     translateX: -250,
                     easing: 'easeInOutSine',
                     autoplay: false,
                     duration: 250
                 }}>
                 <Box sx={{ ...formDisplay }}>
                     <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                         <Box sx={{height:25, width: '100%' }}></Box>
                         <Box sx={{ ...formCardStyle }}></Box>
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
                                     <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                        <Grid item xs={4}>
                                             <Box sx={{display:"flex", justifyContent:"start"}}>
                                                 <CustomFormBtn 
                                                 type="button" 
                                                 handleClick={()=>{ console.log("Clear button clicked") }} 
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
                 </Box>
             </Anime>
 
 
             {/*
                 Component displays the results 
             
             */}
 
             <Anime
                 style={{
                     position: 'absolute',
                     zIndex: -5
                 }}
                 ref={animatedSquaresRef2}
                 config={{
                     translateX: 200,
                     easing: 'easeInOutSine',
                     autoplay: false,
                     duration: 250
                 }}>
                  <Box style={formDisplay} >
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
                         <Box sx={{marginBottom: 2}}>
                             <Latex displayMode={false}>{`$a_{n} = a+(n-1)d$`}</Latex>
                         </Box>
                         <Box sx={{marginBottom: 2}}>
                             <Latex displayMode={false}>{`$S_{n} = \\displaystyle \\sum_{i=1}^{10} t_i$`}</Latex>
                         </Box>
                         <Box sx={{marginBottom: 2}}>
                             <Latex displayMode={false}>{`$answer = ${value}$`}</Latex>
                         </Box>
                     </Box>
                 </Box>
             </Anime>
             </Box>
         </AddLayout>
         </>
     );
 }