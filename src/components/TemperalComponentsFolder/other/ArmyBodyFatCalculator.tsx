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
 
const HeightUnit = (props:any) => ( 
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
        <option value="CentiMeter">CentiMeter</option>
      </select>
    </Box>
);

const WaistUnit = (props:any) => ( 
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
        <option value="CentiMeter">CentiMeter</option>
      </select>
    </Box>
);

const NeckUnit = (props:any) => ( 
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
        <option value="CentiMeter">CentiMeter</option>
      </select>
    </Box>
);

const HipUnit = (props:any) => ( 
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
        <option value="CentiMeter">CentiMeter</option>
      </select>
    </Box>
);

 
 export default function ArmyBodyFatCalculator(){
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
         <NavBar2 pagename="Army Body Fat Calculator" />
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
                 }}>
                 <Box sx={{ ...formDisplay }}>
                     <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                         <Box sx={{height:25, width: '100%' }}></Box>
                         <Box sx={{ ...formCardStyle }}></Box>
                     </Box>
                     <Formik
                         initialValues={{ 
                            height:"",
                            height_unit: "CentiMeter",
                            waist: "",
                            waist_unit:"CentiMeter",
                            neck: "",
                            neck_unit: "CentiMeter",
                            hip: "",
                            hip_unit: "CentiMeter",
                            gender: "",
                            age: "",
                            method: "ArmyBodyFatCalculator"
                         }}
                         onSubmit = {(values)=>{
                             const intAge = parseInt(values.age)
                             const data = {
                                height: values.height,
                                height_unit: values.height_unit,
                                waist: values.waist,
                                waist_unit: values.waist_unit,
                                neck: values.neck,
                                neck_unit: values.neck_unit,
                                hip: values.hip,
                                hip_unit: values.hip_unit,
                                gender: values.gender,
                                age: intAge,
                                method: values.method
                             }

                             console.log(data)
                             const postData = async () => {
                                 console.log("**** DATA UNIT ****")
                                 const responseData = await otherMainService(data)
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
                                             <Box sx={{ ...labelStyle }}>Height</Box>
                                         </Grid>
                                         <Grid item={true} xs={5} sx={{
                                             display:'flex'}}>
                                             <Field
                                                 type="text"
                                                 name="height"
                                                 component={CustomFormikForm}
                                             />
                                         </Grid>
                 
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Height unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="height_unit"
                                             as={HeightUnit}
                                         />
                                         </Grid>

                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Waist</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="waist"
                                             component={CustomFormikForm}
                                         />
                                         </Grid>
                                            
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Waist unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="waist_unit"
                                             as={WaistUnit}
                                         />
                                         </Grid>

                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Neck</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="neck"
                                             component={CustomFormikForm}
                                         />
                                         </Grid>
                                            
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Neck unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="neck_unit"
                                             as={NeckUnit}
                                         />
                                         </Grid>

                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Hip</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="hip"
                                             component={CustomFormikForm}
                                         />
                                         </Grid>
                                            
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Hip unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="hip_unit"
                                             as={HipUnit}
                                         />
                                         </Grid>

                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Age</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="age"
                                             component={CustomFormikForm}
                                         />
                                         </Grid>

                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Gender</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="gender"
                                             component={CustomFormikForm}
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