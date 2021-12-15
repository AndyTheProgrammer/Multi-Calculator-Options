/**
 * 
 * THIS MAKES THE Arithmetic Sequence Calculator FORM
 */

 import React, { useRef, useState, useEffect } from 'react'
 import CustomForm from '../../forms/CustomForm'
 import { Field, Form, Formik, FormikProps } from 'formik'
 import { otherMainService, mathMainService } from '../../../services/mathService/mathMainService'
 import Anime from 'react-animejs-wrapper'
 import AddLayout from '../../layouts/AddLayout'
 import { Box, Grid } from '@mui/material'
 import { CustomFormBtn } from '../../custom/CustomFormBtn'
 import { NavBar2 } from '../../navbar/navbar2'
 import { CustomFormikForm } from '../../forms/CustomForm'
 import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
 
 const Latex = require('react-latex');
 


const DensityUnit = (props:any) => ( 
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
        <option value="Kilogram">Kilogram</option>
      </select>
    </Box>
);

const VolumeUnit = (props:any) => ( 
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
        <option value="CubicInch">CubicInch</option>
      </select>
    </Box>
);

 
 export default function MassCalculator(){
     const [value, setValue] = useState("")
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
         <NavBar2 pagename="Mass Calculator" />
         <AddLayout>
             <Box sx={{ display: "flex", justifyContent: "center" }}>
             <Anime
                 style={{
                     position: 'absolute',
                 }}
                 ref={animatedSquaresRef1}
                 config={{
                     translateX: -250,
                 //   direction: 'alternate',
                     easing: 'easeInOutSine',
                     autoplay: false,
                 }}>
                 <Box sx={{ ...formDisplay }}>
                     <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                         <Box sx={{height:25, width: '100%' }}></Box>
                         <Box sx={{ ...formCardStyle }}></Box>
                     </Box>
                     <Formik
                         initialValues={{ 
                            density:"",
                            volume: "",
                            density_unit_a: "Kilogram",
                            density_unit_b:"KiloMeter",
                            volume_unit: "CubicInch",
                            method: "MassCalculator"
                         }}
                         onSubmit = {(values)=>{
                             const data = {
                                density: values.density,
                                volume: values.volume,
                                density_unit_a: values.density_unit_a,
                                density_unit_b: values.density_unit_b,
                                volume_unit: values.volume_unit,
                                method: values.method
                             }
                             
                             const postData = async () => {
                                 console.log("**** DATA UNIT ****")
                                 const responseData = await mathMainService(data)
                                 console.log(responseData)
                                 var msg:any = responseData.statusDescription;
                                 if(msg === "success"){
                                     //setValue(responseData.message.answer)
                                     console.log(responseData)
                                 }
                             }
                             postData()
                             
                         }}>
                             
                         {(props: FormikProps<any>) => (
                             <Form >
                                 <Box sx={{minHeight: 250, display:'flex', flexDirection:'column' }}>
                                     <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                         <Grid item={true} xs={7}>
                                             <Box sx={{ ...labelStyle }}>Density</Box>
                                         </Grid>
                                         <Grid item={true} xs={5} sx={{
                                             display:'flex'}}>
                                             <Field
                                                 type="text"
                                                 name="density"
                                                 component={CustomFormikForm}
                                             />
                                         </Grid>
                 
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Volume</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="volume"
                                             component={CustomFormikForm}
                                         />
                                         </Grid>
                                     
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Density unit a</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="density_unit_a"
                                                 component={CustomFormikForm}
                                             />
                                         </Grid>  
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Density unit b</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="distance_unit"
                                                 as={DensityUnit}
                                             />
                                         </Grid>  
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Volume unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="volume_unit"
                                                 as={VolumeUnit}
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
                                                 <CustomFormBtn type="submit" name="Calculate"/>
                                             </Box>
                                        </Grid>
                                    </Grid>
                                 </Box>
                             </Form>
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
                 //   direction: 'alternate',
                     easing: 'easeInOutSine',
                     autoplay: false,
                 }}>
                  <Box style={formDisplay} >
                     <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                         <Box sx={{height:30, width: '100%' }}></Box>
                         <Box sx={{
                                 height:30, width: '100%', 
                                 // backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
                                 borderRadius: '0 10px 3px', 
                             }}></Box>
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