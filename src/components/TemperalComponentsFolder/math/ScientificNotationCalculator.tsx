import React, { useRef, useState, useEffect }  from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
var classNames = require('classnames');
var Latex = require('react-latex');

export default function ScientificNotationCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [playAnimation, setPlayAnimation] = useState(false)
    const [inputValue, setInputValue] = useState("124")
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue("0")
        setErrorMSG(false)
        console.log(inputValue)
    }


    return(
        <>
            <NavBar2 pageimage={math_icon} categoryname="General Calculators" pagename="Scientific Notation Calculator"/>
            <AddLayout categorykey='general' searchname='General Calculators' searchimage={geometry_icon}>
                <Box sx={{ display: "flex", justifyContent: "center" }}> 
                <Box className='animated-content-center'>
                <Box
                    className={
                        classNames({
                            'animated-pos': true,
                            'animated-margin': true,
                            'forward-animation-card-1': controlAnimation,
                            'reverse-animation': !controlAnimation
                        })
                    }>
                    <Box 
                        sx={{ maxWidth: 450,paddingBottom: 1 }}
                        className="animated-box" >
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{height:2, width: '100%' }}></Box>
                        </Box>
                        <Formik
                            enableReinitialize
                            initialValues={{ 
                                value:inputValue,
                                method: "ScientificNotationCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    value: values.value,
                                    method: values.method
                                }
                                setInputValue(values.value)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setControlAnimation(true)
                                        setValue([
                                            responseData.message
                                        ])
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
                                    <Grid 
                                            container={true} 
                                            rowSpacing={1} 
                                            sx={{
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                                marginBottom:4
                                            }}>
                                            <Grid item xs={12}>
                                                <Typography sx={{marginBottom: 1}}>    
                                                    <Box
                                                        sx={{
                                                            fontWeight: 100,
                                                            fontStyle: 'bold',
                                                            fontSize: 14,
                                                            color: '#b0b0b0',
                                                            marginBottom:3
                                                        }}>
                                                        amet aliquam id diam maecenas ultricies mi eget mauris pharetra
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{display:'flex', justifyContent:'center'}}>
                                                    <Box sx={{display:'flex'}}>
                                                        <Box sx={{...labelStyle }}>Number : </Box>
                                                        <Box sx={{width: 150, marginLeft:1}}>
                                                            <CustomForm
                                                                type="text"
                                                                name="value"
                                                                onChange={handleChange}
                                                                value={values.value}
                                                                placeholder=""
                                                            />
                                                        </Box>
                                                        <Typography sx={{ marginTop: 0}}>
                                                            <Latex displayMode={false}>{`$=\\hspace{.1cm}?$`}</Latex>
                                                        </Typography>   
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ flexGrow: 1}}>
                                            {/* 
                                                Flex box pushes submit button down
                                            */}
                                        </Box>
                                    </Box>
                                    <Box 
                                        // className="toggle-box-primary"
                                        sx={{
                                            paddingLeft: 4, paddingRight: 4, 
                                            minWidth: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                            <Box sx={{display:"flex", justifyContent:"start"}}>
                                                <CustomFormBtn 
                                                type="button" 
                                                handleClick={()=>{
                                                    clear()
                                                        
                                                    }} 
                                                name="Clear"/>
                                            </Box>
                                        <Box sx={{display:"flex", flexGrow:1, justifyContent:"start"}}>
                                        
                                        </Box>
                                        <Box sx={{display:"flex", justifyContent:"end"}}>
                                            <CustomFormImageBtn 
                                                type="submit" 
                                                name="Calculate"/>   
                                        </Box>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Box>


                {/*
                    Component displays the results 
                
                */}

            <Box
                className={
                    classNames({
                        'animated-pos': true,
                        'animated-margin': true,
                        'forward-animation-card-2': controlAnimation,
                        'reverse-animation': !controlAnimation
                    })
                }
                style={{
                    zIndex: -5
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
                                                    textAlign:'center'
                                                }}>Result</Box>
                                        </Typography>
                                    </Box>
                                </Box>
                                {
                                    value.map((d)=>{
                                        return(
                                            <Box sx={{paddingLeft: 3}}>
                                                <Typography sx={{ display:'flex'}}>
                                                    <Box sx={{ width: 120 }}>
                                                        Real number
                                                    </Box>
                                                    <Box>
                                                        : { d.realNumber }
                                                    </Box>
                                                </Typography>
                                                <Typography sx={{ display:'flex'}}>
                                                    <Box sx={{ width: 120 }}>
                                                        E-notation 
                                                    </Box>
                                                    <Box>
                                                        :{ d.test}
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        );
                                    })
                                }
                        </Box>
                        :<Box></Box>
                    }
                </Box>
                
                </Box>
                </Box>
            </AddLayout>
        </>
    );
}