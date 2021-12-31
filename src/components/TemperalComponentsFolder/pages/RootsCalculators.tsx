// import React from 'react'

// export default function RootsCalculators(){
//     return(
//         <>
//         </>
//     );

// }

import React, { useRef, useState, useEffect } from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm, {CustomFormFraction} from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import TextCard from '../../utilityComponents/TextCard'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import { errorText }  from '../../../styling/textStyle'
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm'
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import square_root from '../../../common/assets/square_root.svg';
import cube_root from '../../../common/assets/cube_root.svg';
import algebra_icon from '../../../common/assets/algebra_icon.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Latex = require('react-latex');
var classNames = require('classnames');

export default function RootsCalculators(){
    const [index, setIndex] = useState([true,false,false])
    const [calcName, setCalcName] = useState("Percentage Change")
    const [showMenu, setShowMenu] = useState(false)
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
    const [tab_1, setTab_1] = useState([false,false,true, false])
    const [tab_2, setTab_2] = useState([true, false, false])
    const [tab_3, setTab_3] = useState([true, false, false])

    const tabstyles_1 = classNames({
        'form-card-1': tab_1[0],
        'form-card-1-b': tab_1[1],
        'form-card-none': tab_1[2],
        'form-card-1-c': tab_1[3],
        'div-link': true
    })

    const tabstyles_2 = classNames({
        'form-card-2': tab_2[0],
        'form-card-2-b': tab_2[1],
        'form-card-none': tab_2[2],
        'div-link': true
    })

    const tabstyles_3 = classNames({
        'form-card-3': tab_3[0],
        'form-card-3-b': tab_3[1],
        'form-card-none': tab_3[2],
        'div-link': true
    })

    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="Algebra Calculators" pagename="Roots Calculators"/>
        <AddLayout categorykey='algebra' searchname='Algebra Calculators' searchimage={algebra_icon}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                        sx={{ maxWidth: 500, minHeight: 150, paddingBottom: 1 }}
                        className="animated-box" >
                        
                        <Box sx={{ width:'100%', display: 'flex', }}>
                            <Typography
                                onClick={
                                    ()=>{
                                        setTab_1([false,false,true, false])
                                            setTab_2([true, false, false])
                                            setTab_3([true, false, false])
                                            setIndex([true, false, false])
                                        setCalcName("General root calculator")
                                    }
                                }
                                className={tabstyles_1 }
                                sx={{ 
                                        width:'100%',
                                        fontSize: 14,
                                        paddingTop: 0.1, 
                                        marginBottom:0.5,
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                <Box>
                                    General root 
                                </Box>
                            </Typography >
                            <Typography
                                onClick={
                                    ()=>{
                                        setTab_1([false, true, false])
                                        setTab_2([false, false, true])
                                        setTab_3([false, true, false])
                                        setIndex([false, true, false])
                                        setCalcName("Square root")
                                        setShowMenu(false)
                                    }
                                }
                                className={tabstyles_2}
                                sx={{ width:'100%' }}>
                                <Box
                                    sx={{ 
                                        width:'100%',
                                        fontSize: 14,
                                        paddingTop: 0.1, 
                                        marginBottom:0.5,
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    Square root
                                </Box>
                            </Typography>
                            <Typography
                                onClick={
                                    ()=>{
                                        setTab_1([false, false, false, true])
                                        setTab_2([false, true, false])
                                        setTab_3([false, false, true])
                                        setIndex([false, false, true])
                                        setCalcName("Cube root")
                                        setShowMenu(false)
                                    }
                                }
                                className={tabstyles_3}
                                sx={{ width:'100%' }}>
                                <Box
                                    sx={{ 
                                        width:'100%',
                                        fontSize: 14,
                                        paddingTop: 0.1, 
                                        marginBottom:0.5,
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >Cube root</Box>
                            </Typography>
                             
                        </Box>
                        {
                            (index[0])?
                            <Formik
                            initialValues={{ 
                                
                                number: "",
                                root_number: "",
                                method: "GeneralRootCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    number: values.number,
                                    root_number: values.root_number,
                                    method: values.method
                                }

                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setValue([
                                            responseData.message.answer
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
                                        <Box sx={{ minHeight: 100, display: 'flex', justifyContent:'center'}}>
                                            <Box sx={{border:'none', maxHeight: '100%', width: '190px', marginTop:5, }}>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        width: 70,
                                                        marginTop: 0,
                                                        marginLeft: 2
                                                    }}>
                                                    <CustomFormFraction
                                                        type="text"
                                                        name="root_number"
                                                        onChange={handleChange}
                                                        value={values.root_number}
                                                        placeholder="n"
                                                    />
                                                </Box>
                                                <Box sx={{width: '190px', marginTop: 2, marginLeft: 9}}>
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            width: 100,
                                                        }}>
                                                        <img alt="root" style={{ width:'100%'}} src={square_root}/>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            width: 70,
                                                            marginTop: 2,
                                                            marginLeft: 4
                                                        }}>
                                                            <CustomFormFraction
                                                                type="text"
                                                                name="number"
                                                                onChange={handleChange}
                                                                value={values.number}
                                                                placeholder="x"
                                                            />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Number</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="number"
                                                    onChange={handleChange}
                                                    value={values.number}
                                                    placeholder=""
                                                />
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Root Number</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="root_number"
                                                    onChange={handleChange}
                                                    value={values.root_number}
                                                    placeholder=""
                                                />
                                            </Grid>
                                            
                                                                
                                        </Grid> */}
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
                                </form>
                            )}
                        </Formik>
                            :<Box></Box>
                        }
                        {
                            (index[1])?
                            <Formik
                        initialValues={{ 
                            number:"",
                            method: "SquareRootCalculator"
                        }}
                        onSubmit = {(values)=>{
                            const data = {
                                number: values.number,
                                method: values.method
                            }
                            console.log(data)
                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setValue([responseData.message.answer])
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
                               <Box sx={{  minHeight: 150 }}>
                                    <Box sx={{ minHeight: 100, display: 'flex', justifyContent:'center'}}>
                                        <Box sx={{border:'none', maxHeight: '100%', width: '120px', marginTop:5, }}>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    width: 100,
                                                }}>
                                                <img alt="root" style={{ width:'100%'}} src={square_root}/>
                                            </Box>
                                            <Box
                                            sx={{
                                                position: 'absolute',
                                                width: 70,
                                                marginTop: 2,
                                                marginLeft: 4
                                            }}>
                                                <CustomFormFraction
                                                    type="text"
                                                    name="number"
                                                    onChange={handleChange}
                                                    value={values.number}
                                                    placeholder="x"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                        <Grid item={true} xs={5} >
                                            <Box sx={{...labelStyle}}>Number</Box></Grid>
                                        <Grid item={true} xs={7}>
                                            <CustomForm
                                                type="text"
                                                name="number"
                                                onChange={handleChange}
                                                value={values.number}
                                                placeholder=""
                                            />
                                        </Grid>
                                  
                                    </Grid> */}
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
                            </form>
                        )}
                    </Formik>
                            :<Box></Box>
                        }
                        {
                            (index[2])?
                            <Formik
                            initialValues={{ 
                                number:"",
                                method: "CubeRootCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    number: values.number,
                                    method: values.method
                                }
                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setValue([responseData.message.answer])
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
                                   <Box sx={{  minHeight: 150}}>
                                        <Box sx={{ minHeight: 100,  display: 'flex', justifyContent:'center'}}>
                                            <Box sx={{ width: '120px', marginTop:4, }}>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        width: 100,
                                                    }}>
                                                    <img alt="root" style={{ width:'100%'}} src={cube_root}/>
                                                </Box>
                                                <Box
                                                sx={{
                                                    position: 'absolute',
                                                    width: 70,
                                                    marginTop: 4,
                                                    marginLeft: 4
                                                }}>
                                                    <CustomFormFraction
                                                        type="text"
                                                        name="number"
                                                        onChange={handleChange}
                                                        value={values.number}
                                                        placeholder="x"
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
    
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle }}>Number</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="number"
                                                    onChange={handleChange}
                                                    value={values.number}
                                                    placeholder=""
                                                />
                                            </Grid>
                                      
                                        </Grid> */}
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
                                </form>
                            )}
                        </Formik>
                            :<Box></Box>
                        }
                      
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
                        {
                                (index[0])?
                                <Box 
                                    // sx={{ maxWidth: 400,paddingBottom: 1 }}
                                    // className="animated-box" 
                                    >
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
                                :<Box></Box>
                            }
                            {
                                (index[1])?
                                <Box 
                                        // sx={{ maxWidth: 400,paddingBottom: 1 }}
                                        // className="animated-box" 
                                    >
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
                                        <p>Square root</p>
                                        <p>{value}</p>
                                    </Box>
                                </Box>
                                :<Box></Box>
                            }
                            {
                                (index[2])?
                                <Box 
                                    // sx={{ maxWidth: 400,paddingBottom: 1 }}
                                    // className="animated-box" 
                                    >
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
                                :<Box></Box>
                            }
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