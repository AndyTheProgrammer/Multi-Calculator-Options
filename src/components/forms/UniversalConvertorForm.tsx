/**
 * 
 * Universal form used by converters
 */

import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, Box, Typography, LinearProgress } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import CustomForm from './CustomForm'
import { NavBar2 } from '../navbar/navbar2'
import AddLayout from '../layouts/AddLayout'
import Anime from 'react-animejs-wrapper'
import { CustomFormikForm, CustomFormikOptions } from './CustomForm'
import { labelStyle, formCardStyle, formDisplay } from '../../styling/CustomStyles'
import TextCard from '../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../custom/CustomFormBtn'
import other_icon from '../../common/assets/other_icon.svg';
import convertion_calc_icon from '../../common/assets/others_icons/convertion_calc_icon.svg';
const Latex = require('react-latex');


function UniversalConverterForm(props:any){
    // using the useState ehook
    const [optionsData, setData] = useState<any[]>([])//for getting units

    const CustomFormikOptions = (props:any) => ( 
      <Box sx={{
        display: 'flex',
        paddingLeft: '5px',
        paddingRight: '5px',
        width:'100%'
      }}>
        <select 
        style={{
          width:'100%',
          // backgroundColor:'#F0F3F6',
          backgroundColor:'#EEEEEE',
          border: 'solid',
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 3,
          height: 30
          // outline: 'none'
        }}
        {...props} >
          <option value=""></option>
          {optionsData.map((data, i) => (
              <option value={data} >{
                  data
              }</option>
          ))}
        </select>
      </Box>
    );
    

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

        const fetchData = async () => {
          if(!optionsData.length){
            console.log("If data options is empty")
            //fetches defined units for converter
            const result = await props.unitsFunnction()
            // setData(prevRes => ([...prevRes, ...result]))
            setData(result)
          }
        };
        fetchData();
        
        if (mediaQuery.matches) {
            if(value.length){
                play1();
                play2();
                setPlayAnimation(true)
            }
          } 
          
          
    })



    return(
      
              <Box 
                  sx={{ maxWidth: 450,paddingBottom: 1 }}
                  >
                  <Formik
                    initialValues={{ value: '', fromUnit: "", toUnit: "" }}
                    onSubmit={(values, actions) => {
                        const data = {
                          value: values.value,
                          from_unit: values.fromUnit,
                          to_unit: values.toUnit,
                          method: props.convertMethod
                        }
                        console.log(data)
                        const postData = async () => {
                        
                        const dataReturned = await props.convertFunction(data);
                        var status:any = dataReturned.statusDescription;
                        if(status === "success"){
                          console.log(dataReturned.message.convertionValue)
                          setValue([dataReturned.message.convertionValue])
                          
                        }
                       }

                       postData();
                    }}
                    >
                    {(props: FormikProps<any>) => (
                    <Form >
                    
                      <Box sx={{  height: 250, display:'flex', flexDirection:'column' }}>
                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                          <Grid item xs={5} >
                            <Box sx={{ ...labelStyle }}>Value</Box>
                          </Grid>
                          <Grid item xs={7} > 
                              <Field  
                                type="text" 
                                name="value"
                                component={CustomFormikForm} 
                                />
                          </Grid>

                          <Grid item xs={5} >
                            <Box sx={{ ...labelStyle }}>From</Box>
                          </Grid>
                          <Grid item xs={7} >
                                <Field as={CustomFormikOptions} name="fromUnit" />                           
                          </Grid>

                          <Grid item xs={5} >
                            <Box sx={{ ...labelStyle }}>To</Box>
                          </Grid>
                          <Grid item xs={7}>
                                <Field as={CustomFormikOptions} name="toUnit" />
                          </Grid>
                                              
                        </Grid>
                        <Box sx={{ flexGrow: 1}}>
                            {/* 
                                Flex box pushes submit button down
                            */}
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
                                            controlAnimation();
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
                    </Box>
                    </Form>
                    )}
                    </Formik>
              </Box>
    );
}

export {UniversalConverterForm}

                 
