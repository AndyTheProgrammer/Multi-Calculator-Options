/**
 * THIS MAKES THE Arithmetic Sequence Calculator FORM
 */

 import React, { useRef, useState, useEffect } from 'react'
 import CustomForm from '../../../forms/CustomForm'
 import { Field, Form, Formik, FormikProps } from 'formik'
 import { otherMainService } from '../../../../services/mathService/mathMainService'
 import Anime from 'react-animejs-wrapper'
 import AddLayout from '../../../layouts/AddLayout'
 import { Box, Grid } from '@mui/material'
 import { NavBar2 } from '../../../navbar/navbar2'
 import { CustomFormikForm } from '../../../forms/CustomForm'
 import { labelStyle, formCardStyle, formDisplay } from '../../../../styling/CustomStyles'
 import { CustomFormBtn, CustomFormImageBtn } from '../../../custom/CustomFormBtn'
 import other_icon from '../../../../common/assets/other_icon.svg';
 import transport_util_icon from '../../../../common/assets/others_icons/transport_util_icon.svg';

 const Latex = require('react-latex');
 
 const TimeUnit = (props:any) => ( 
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
        <option value="Hour">Hour</option>
      </select>
    </Box>
);

const PowerUnit = (props:any) => ( 
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
        <option value="Watt">Watt</option>
      </select>
    </Box>
);


 
 export default function ElectricityCalculator(){
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
         <NavBar2 pageimage={other_icon} categoryname="Transport and Utility Calculators" pagename="Electricity Calculator" />
         <AddLayout categorykey='transport' searchname='Transport and Utility Calculators' searchimage={transport_util_icon}>
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
                         <Box sx={{ ...formCardStyle }}></Box>
                     </Box>
                     <Formik
                         initialValues={{ 
                            power:"",
                            power_unit: "Watt",
                            capacity: "",
                            time:"",
                            time_unit: "Hour",
                            cost: "",
                            method: "ElectricityCalculator"
                         }}
                         onSubmit = {(values)=>{
                             const data = {
                                power: values.power,
                                power_unit: values.power_unit,
                                capacity: values.capacity,
                                time: values.time,
                                time_unit: values.time_unit,
                                cost: values.cost,
                                method: values.method
                             }
                             
                             const postData = async () => {
                                 console.log("**** DATA UNIT ****")
                                 const responseData = await otherMainService(data)
                                 console.log(responseData)
                                 var msg:any = responseData.statusDescription;
                                 if(msg === "success"){
                                     setValue([responseData.message.answer])
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
                                             <Box sx={{ ...labelStyle }}>Power</Box>
                                         </Grid>
                                         <Grid item={true} xs={5} sx={{
                                             display:'flex'}}>
                                             <Field
                                                 type="text"
                                                 name="power"
                                                 component={CustomFormikForm}
                                             />
                                         </Grid>
                 
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Power unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                         <Field
                                             type="text"
                                             name="power_unit"
                                             as={PowerUnit}
                                         />
                                         </Grid>
                                     
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Capacity</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="capacity"
                                                 component={CustomFormikForm}
                                             />
                                         </Grid>  
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Time</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="time"
                                                 component={CustomFormikForm}
                                             />
                                         </Grid>  
                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Time unit</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="time_unit"
                                                 as={TimeUnit}
                                             />
                                         </Grid>      

                                         <Grid item xs={7}>
                                             <Box sx={{ ...labelStyle }}>Cost</Box>
                                         </Grid>
                                         <Grid item xs={5}>
                                             <Field
                                                 type="text"
                                                 name="cost"
                                                 component={CustomFormikForm}
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
                             </Form>
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
                            sx={{ maxWidth: 450,paddingBottom: 1 }}
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