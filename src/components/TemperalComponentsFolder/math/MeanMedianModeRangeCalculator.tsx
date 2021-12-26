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
 import { CustomFormBtn } from '../../custom/CustomFormBtn'
 import { NavBar2 } from '../../navbar/navbar2'
 import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
 
 function MeanMedianModeRangeCalculator(){
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
         <NavBar2 pagename="Mean Median Mode Range Calculator"/>
         <AddLayout>
            <h1>
                This component was moved but has not been removed,
                because it will affect operation order
            </h1> 
         </AddLayout>
         </>
     );
   
 }
 
 export default MeanMedianModeRangeCalculator 