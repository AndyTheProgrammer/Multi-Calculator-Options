import React, { useRef, useState, useEffect }from 'react'
import { CustomFormBtn } from '../../custom/CustomFormBtn'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'


function DistanceBasedOnLatitudeAndLongitudeCalculator(){
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
        <NavBar2 pagename="Distance based on Latitude and Longitude Calculator"/>
        <AddLayout>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Anime
                style={{
                    position: 'absolute',
                }}
                ref={animatedSquaresRef1}
                config={{
                    translateX: -250,
                    duration: 250,
                    easing: 'easeInOutSine',
                    autoplay: false,
                }}>
                <Box sx={{...formDisplay}}>
                    

                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{height:25, width: '100%' }}></Box>
                        <Box sx={{ ...formCardStyle }}></Box>
                    </Box>
                    <Formik
                        initialValues={{ 
                            latitude1:"",
                            latitude2: "",
                            longitude1: "",
                            longitude2: "",
                            method: "DistanceBasedOnLatitudeAndLongitudeCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                latitude1: values.latitude1,
                                latitude2: values.latitude2,
                                longitude1: values.longitude1,
                                longitude2: values.longitude2,
                                method: values.method
                            }
                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setValue(responseData.message.distanceInMiles)
                                    console.log(responseData.message.distanceInMiles)
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
                                  <Box sx={{  height: 250, display:'flex', flexDirection:'column' }}>
                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                        <Grid item={true} xs={5} >
                                            <Box sx={{ ...labelStyle }}>Latitude 1</Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <CustomForm
                                                type="text"
                                                name="latitude1"
                                                onChange={handleChange}
                                                value={values.latitude1}
                                                placeholder=""
                                            />
                                        </Grid>
                
                                        <Grid item xs={5}>
                                            <Box sx={{ ...labelStyle }}>Latitude 2</Box></Grid>
                                        <Grid item xs={7}>
                                        <CustomForm
                                            type="text"
                                            name="latitude2"
                                            onChange={handleChange}
                                            value={values.latitude2}
                                            placeholder=""
                                        />
                                        </Grid>
                                    
                                        <Grid item xs={5}>
                                            <Box sx={{ ...labelStyle }}>Longitude 1</Box></Grid>
                                        <Grid item xs={7}>
                                            <CustomForm
                                                type="text"
                                                name="longitude1"
                                                onChange={handleChange}
                                                value={values.longitude1}
                                                placeholder=""
                                            />
                                        
                                        </Grid>

                                        <Grid item xs={5}>
                                            <Box sx={{ ...labelStyle }}>Longitude 2</Box></Grid>
                                        <Grid item xs={7}>
                                            <CustomForm
                                                type="text"
                                                name="longitude2"
                                                onChange={handleChange}
                                                value={values.longitude2}
                                                placeholder=""
                                            />
                                        
                                        </Grid>                     
                                    </Grid>
                                    <Box sx={{ flexGrow: 1}}>
                                        {/* 
                                            Flex box pushes submit button down
                                        */}
                                    </Box>

                                    <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
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
                    duration: 250,
                    easing: 'easeInOutSine',
                    autoplay: false,
                }}>
                 <Box sx={formDisplay}>
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
                        <p>Answer</p>
                        <p>{value}</p>
                    </Box>
                </Box>
            </Anime>
            
            </Box>
            
        </AddLayout>
        </>
    );
}

export default DistanceBasedOnLatitudeAndLongitudeCalculator