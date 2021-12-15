import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, Box, Typography, LinearProgress } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik';
import { CustomFormBtn } from '../custom/CustomFormBtn';
import CustomForm from './CustomForm'
import { NavBar2 } from '../navbar/navbar2'
import AddLayout from '../layouts/AddLayout'
import Anime from 'react-animejs-wrapper'
import { CustomFormikForm, CustomFormikOptions } from './CustomForm'
const Latex = require('react-latex');

 const innerBoxStyle = {
    width: 400,
    height: 300,
    borderRadius: 10,
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white'
 }



function UniversalConverterForm(props:any){
    // using the useState ehook
    const [optionsData, setData] = useState([]); //for getting units

    //using the useEffect hook
    useEffect(() => {
        const fetchData = async () => {

          //fetches defined units for converter
          const result = await props.unitsFunnction()
          // setData(prevRes => ([...prevRes, ...result]))
          setData(result)
        };
        fetchData();
    }, [])

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
      },[value])

    const CustomFormikOptions = (props:any) => ( 
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
            {optionsData.map((data, i) => (
                <option key={data} >{
                    data
                }</option>
            ))}
          </select>
        </Box>
    );

    return(
      <>
      <NavBar2 pagename={props.pagename} />
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
              <div style={innerBoxStyle}>
                  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                      <Box sx={{height:30, width: '100%' }}></Box>
                      <Box sx={{
                              height:30, width: '100%', 
                              backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
                              borderRadius: '0 10px 3px', 
                          }}></Box>
                  </Box>
                  <Formik
                    initialValues={{ value: '1', fromUnit: "", toUnit: "" }}
                    onSubmit={(values, actions) => {
                        const data = {
                          value: values.value,
                          from_unit: values.fromUnit,
                          to_unit: values.toUnit,
                          method: props.convertMethod
                        }
                       const postData = async () => {
                        
                        const dataReturned = await props.convertFunction(data);
                        var status:any = dataReturned.statusDescription;
                        if(status === "success"){
                          setValue(dataReturned.message.convertionValue)
                          
                        }
                       }

                       postData();
                    }}
                    >
                    {(props: FormikProps<any>) => (
                    <Form >
                    
                      <Box sx={{  height: 250, display:'flex', flexDirection:'column' }}>
                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                          <Grid item xs={5} ><Box>Value</Box></Grid>
                          <Grid item xs={7} > 
                              <Field  
                                type="text" 
                                name="value"
                                component={CustomFormikForm} 
                                />
                          </Grid>

                          <Grid item xs={5} ><Box>From</Box></Grid>
                          <Grid item xs={7} >
                                <Field as={CustomFormikOptions} name="fromUnit" />                           
                          </Grid>

                          <Grid item xs={5} ><Box>To</Box></Grid>
                          <Grid item xs={7}>
                                <Field as={CustomFormikOptions} name="toUnit" />
                          </Grid>
                                              
                        </Grid>
                        <Box sx={{ flexGrow: 1}}>
                            {/* 
                                Flex box pushes submit button down
                            */}
                        </Box>

                        <Grid container rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                          <Grid item xs={4}>
                                  <Box sx={{display:"flex", justifyContent:"start"}}>
                                      <CustomFormBtn 
                                      type="button" 
                                      handleClick={()=>{ 
                                          play1();
                                          play2();
                                      }} 
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
              </div>
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
               <Box style={innerBoxStyle} >
                  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                      <Box sx={{height:30, width: '100%' }}></Box>
                      <Box sx={{
                              height:30, width: '100%', 
                              // backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
                              borderRadius: '0 10px 3px', 
                          }}></Box>
                  </Box>
                  <Box sx={{marginLeft: 5}}>
                      {/* <Box sx={{marginBottom: 2}}>
                          <Latex displayMode={false}>{`$a_{n} = a+(n-1)d$`}</Latex>
                      </Box>
                      <Box sx={{marginBottom: 2}}>
                          <Latex displayMode={false}>{`$S_{n} = \\displaystyle \\sum_{i=1}^{10} t_i$`}</Latex>
                      </Box> */}
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

export {UniversalConverterForm}

                 