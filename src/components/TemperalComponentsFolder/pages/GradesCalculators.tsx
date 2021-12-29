import React, { useRef, useState, useEffect }from 'react'
import { NavBar2 } from '../../navbar/navbar2'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import TextCard from '../../utilityComponents/TextCard'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import  GradeCalculator from '../math/GradeCalculator'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import math_icon from '../../../common/assets/math_icon.svg';
import stats from '../../../common/assets/stats_icon.svg'
const Latex = require('react-latex');
var classNames = require('classnames');

function GradesCalculators(){
    const [index, setIndex] = useState([true,false,false])
    const [calcName, setCalcName] = useState("Grade Calculator")
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

    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="Statistics Calculators"  pagename="Grades Calculator"/>
        <AddLayout categorykey='statistics' searchname='Statistics Calculators' searchimage={stats}>
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
                        sx={{ maxWidth: 500, minHeight: 200, paddingBottom: 1 }}
                        className="animated-box" >
                        
                        <Box sx={{ width:'100%',}}>
                            <Box sx={{ width:'100%', display: 'flex',}}>
                                <Typography
                                    onClick={
                                        ()=>{
                                            setIndex([true, false, false])
                                            setCalcName("Grade Calculator")
                                            setShowMenu(false)
                                        }
                                    }
                                    className={classNames({
                                        'form-card-1-b': index[0],
                                        'form-card-none': !index[0],
                                        'div-link': true
                                    })}
                                    sx={{ 
                                            width:'100%',
                                            fontSize: 14,
                                            paddingTop: 0.1, 
                                            marginBottom:0.5,
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}>
                                    <Box>
                                        Grade Calculator
                                    </Box>
                                </Typography >
                                <Typography
                                    onClick={
                                        ()=>{
                                            setIndex([false, true, false])
                                            setCalcName("Grade Planning")
                                            setShowMenu(false)
                                        }
                                    }
                                    className={classNames({
                                        'form-card-3-b': index[1],
                                        'form-card-none': !index[1],
                                        'div-link': true
                                    })}
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
                                        Grade Planning
                                    </Box>
                                </Typography>
                            
                            </Box>
                        </Box>
                        {
                            (index[0])?
                            <GradeCalculator retrieve={setValue} controlanimation={controlAnimation}/>
                            :<Box></Box>
                        }
                        {
                            (index[1])?
                            <Formik
                            initialValues={{ 
                                
                                desired_grade: "",
                                current_grade: "",
                                weight_of_final: "",
                                method: "FinalGradeCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    desired_grade: values.desired_grade,
                                    current_grade: values.current_grade,
                                    weight_of_final: values.weight_of_final,
                                    method: values.method
                                }
    
                                console.log(data)
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setValue([responseData.message.finalGrade])
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
                                                <Box sx={{...labelStyle}}>Desired Grade</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="desired_grade"
                                                    onChange={handleChange}
                                                    value={values.desired_grade}
                                                    placeholder=""
                                                />
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Current Grade</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="current_grade"
                                                    onChange={handleChange}
                                                    value={values.current_grade}
                                                    placeholder=""
                                                />
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Weight of Final</Box></Grid>
                                            <Grid item={true} xs={7}>
                                                <CustomForm
                                                    type="text"
                                                    name="weight_of_final"
                                                    onChange={handleChange}
                                                    value={values.weight_of_final}
                                                    placeholder=""
                                                />
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
                                    <Box sx={{marginLeft: 1}}>
                                        <Box sx={{ width: '100%'}}>
                                            {
                                                value.map((data)=>{
                                                return(
                                                    <Box sx={{display: 'flex'}}>
                                                    <Box sx={{ 
                                                        width: '100%', 
                                                        marginRight: 1,
                                                        borderRadius: 1
                                                        }}>
                                                        {
                                                        data.weightsArray.map((course:any)=>(
                                                            <Box sx={{marginBottom: 0.5, backgroundColor: '#F0F3F6',
                                                            borderRadius: 1}}>
                                                            {course}
                                                            </Box>
                                                        ))
                                                        }
                                                    </Box>
                                                    </Box>
                                                );
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                                :<Box></Box>
                            }
                            {
                                (index[1])?
                                <Box 
                                // sx={{ maxWidth: 450,paddingBottom: 1 }}
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
                                    <p>Final Grade</p>
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

export default GradesCalculators