import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn'
import { NavBar2 } from '../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'
import math_icon from '../../../common/assets/math_icon.svg';
import stats from '../../../common/assets/stats_icon.svg';

const Latex = require('react-latex');

function checkArray(arr, num){
  for(var i = 0; i < arr.length; i++){
    if(arr[i].id === num){
      return true;
    }
  }
  return false
}


function CoursesInputField(props){
    const [value, setValue] = useState(props.inputvalue)

    const handleChange = (e) => {
      setValue(e.target.value)
      props.getValue(e.target.value, props.id, "courses")     
    }

    return (
        <Box sx={{
          display: 'flex',
        }}>
          <input
            style={{
              width:'100%',
              backgroundColor:'#F0F3F6',
              border: 'solid',
              borderWidth: 0,
              borderColor: 'red',
              borderRadius: 7,
              outline: 'none',
              fontSize: 16
            }}
            type="text" 
            name="courses" 
            value={value} 
            placeholder=""
            onChange={handleChange}
          />
        </Box>
    );
}

function CreditInputField(props){
  const [value, setValue] = useState(props.inputvalue)

  const handleChange = (e) => {
    setValue(e.target.value)
    props.getValue(e.target.value, props.id, "credit")     
  }

  return (
      <Box sx={{
        display: 'flex',
      }}>
        <input
          style={{
            width:'100%',
            backgroundColor:'#F0F3F6',
            border: 'solid',
            borderWidth: 0,
            borderColor: 'red',
            borderRadius: 7,
            outline: 'none',
            fontSize: 16
          }}
          type="text" 
          name="credit" 
          value={value} 
          onChange={handleChange}
        />
      </Box>
  );
}

function GradeInputField(props){
  const [value, setValue] = useState(props.inputvalue)

  const handleChange = (e) => {
    setValue(e.target.value)
    props.getValue(e.target.value, props.id, "grade")     
  }

  return (
      <Box sx={{
        display: 'flex',
      }}>
        <input
          style={{
            width:'100%',
            backgroundColor:'#F0F3F6',
            border: 'solid',
            borderWidth: 0,
            borderColor: 'red',
            borderRadius: 7,
            outline: 'none',
            fontSize: 18
          }}
          type="text" 
          name="grade" 
          value={value} 
          onChange={handleChange}
        />
      </Box>
  );
}


function GradeInputFieldOptions(props){
  const [value, setValue] = useState(props.inputvalue)

  const handleChange = (e) => {
    setValue(e.target.value)
    props.getValue(e.target.value, props.id, "grade")     
  }

  return (
    <Box sx={{
      display: 'flex',
    }}>
    <select 
    style={{
      width:'100%',
            backgroundColor:'#F0F3F6',
            border: 'solid',
            borderWidth: 0,
            borderColor: 'red',
            borderRadius: 7,
            outline: 'none',
            fontSize: 18
    }}
      value={value} 
      onChange={handleChange}>
      <option value=""></option>
      <option value="A+">A+</option>
      <option value="A">A</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B">B</option>
      <option value="B-">B-</option>
      <option value="C+">C+</option>
      <option value="C">C</option>
      <option value="C-">C-</option>
      <option value="D+">D+</option>
      <option value="D">D</option>
      <option value="D-">D-</option>
      <option value="F">F</option>
      <option value="P">P</option>
      <option value="NP">NP</option>
    </select>
  </Box>
  );
}



export default function GPACalculator(){    
  const [value, setValue] = useState([])
  // const [value, setValue] = useState<any[]>([])
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
              clearAll()
              setPlayAnimation(false);
          }
      }
      else{
        clearAll()
         
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


  const [courses, setCourses] = useState([
    {id: 1, value: ''},
    {id: 2, value: ''},
    {id: 3, value: ''}
  ]);
  const [credit, setCredit] = useState([
    {id: 1, value: ''},
    {id: 2, value: ''},
    {id: 3, value: ''}
  ]);
  const [grade, setGrade] = useState([
    {id: 1, value: ''},
    {id: 2, value: ''},
    {id: 3, value: ''}
  ]);

  function clearAll(){
    setCourses([{id: 1, value: ''}])
    setCredit([{id: 1, value: ''}])
    setGrade([{id: 1, value: ''}])
    setValue([]);
  }
  const handler = (h, id, name) =>{

    const copyCoursesArray = courses;
    const copyCreditArray = credit;
    const copyGradeArray = grade;
    

    if(name === "courses"){
      if(copyCoursesArray.length !== 0){
        for(var i = 0; i < copyCoursesArray.length; i++){
          if(!checkArray(copyCoursesArray, id)){
            const data = {
              id: id,
              value: h
            }
            setCourses([...copyCoursesArray, data]);
          }
    
          if(copyCoursesArray[i].id === id ){      
            copyCoursesArray[i].value = h
            setCourses(copyCoursesArray)
          }
        }
      }
      else{
        // const data = {
        //   id: id,
        //   value: h
        // }
        // setCourses([data]);
      }
    }

     if(name === "credit"){
      if(credit.length !== 0){
        for(var i = 0; i < credit.length; i++){
          if(!checkArray(copyCreditArray, id)){
            const data = {
              id: id,
              value: h
            }
            setCredit([...credit, data]);
          }
    
          if(credit[i].id === id ){      
            copyCreditArray[i].value = h
            setCredit(copyCreditArray)
          }
        }
      }
      else{
        // const data = {
        //   id: id,
        //   value: h
        // }
        // setCredit([data]);
      }
     }

     if(name === "grade"){
      if(grade.length !== 0){
        for(var i = 0; i < grade.length; i++){
          if(!checkArray(copyGradeArray, id)){
            const data = {
              id: id,
              value: h
            }
            setGrade([...grade, data]);
          }
    
          if(grade[i].id === id ){      
            copyGradeArray[i].value = h
            setGrade(copyGradeArray)
          }
        }
      }
      else{
        // const data = {
        //   id: id,
        //   value: h
        // }
        // setGrade([data]);
      }
     }
  }



 const submitHandler = () =>{
    var resultCoursesArray = [];
    var resultCreditArray = [];
    var resultGradeArray = [];

    for(var i = 0; i < courses.length; i++){
      if(courses[i].value !== ''){
        resultCoursesArray.push(courses[i].value)
      }
    }
    for(var i = 0; i < credit.length; i++){
      if(credit[i].value !== ''){
        resultCreditArray.push(credit[i].value)
      }
    }
    for(var i = 0; i < grade.length; i++){
      if(grade[i].value !== ''){
        resultGradeArray.push(grade[i].value)
      }
    }

    const min = Math.min(
      resultCoursesArray.length,
      resultCreditArray.length,
      resultGradeArray.length)

    console.log("min ", min)

    if( resultCoursesArray.length > min && min !== 0){
      const loop = resultCoursesArray.length - min
      
      for(var i = 0; i < loop ; i++){
        resultCoursesArray.pop()
      }
    }

    if( resultCreditArray.length > min && min !== 0){
      const loop = resultCreditArray.length - min
      
      for(var i = 0; i < loop ; i++){
        resultCreditArray.pop()
      }
    }

    if( resultGradeArray.length > min && min !== 0){
      const loop = resultGradeArray.length - min
      
      for(var i = 0; i < loop ; i++){
        resultGradeArray.pop()
      }
    }

    console.log(resultCoursesArray.toString())
    console.log(resultCreditArray.toString())
    console.log(resultGradeArray.toString())

    submitData(resultCoursesArray.toString(), resultCreditArray.toString(), resultGradeArray.toString())
  }

  async function submitData(courses, credit, grade){
    const data = {
      course: courses,
      credit: credit,
      grade: grade,
      method:"GPACalculator"
    }
    const response = await mathMainService(data);
    setValue([response.message])
    console.log("This is response data")
    console.log(value)
  }

  const addInput = ()=>{
      setCourses([...courses, { id: courses.length + 1, value: ''}])
      setCredit([...credit, { id: credit.length + 1, value: ''}])
      setGrade([...grade, { id: grade.length + 1, value: ''}])
  }

  return(
    <>
    <NavBar2 pageimage={math_icon} categoryname="Statistics Calculators"  pagename="GPA Calculator" />
    <AddLayout categorykey='statistics' searchname='Statistics Calculators' searchimage={stats}>
            <Box sx={{ display: "flex", justifyContent: "center" }}
            > 
            <Box className='animated-content-center'>
            <Anime
                className='animated-pos animated-margin'
                ref={animatedSquaresRef1}
                config={{
                    translateX: -250,
                    easing: 'easeInOutSine',
                    autoplay: false,
                    duration: 250
                }}>
                <Box 
                    sx={{ maxWidth: 550,paddingBottom: 1 }}
                    className="animated-box" >
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{height:25, width: '100%' }}></Box>
                        <Box sx={{ ...formCardStyle }}></Box>
                    </Box>
                      <Box sx={{minHeight: 150, display:'flex', flexDirection:'column' }}>
                          <Grid container={true}columnSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                              <Grid item={true} xs={6}>
                                  <Box sx={{ ...labelStyle }}>Course (Optional)</Box>
                              </Grid>
                              <Grid item={true} xs={3}>
                                  <Box sx={{ ...labelStyle }}>Credit</Box>
                              </Grid>
                              <Grid item={true} xs={3}>
                                  <Box sx={{ ...labelStyle }}>Grade</Box>
                              </Grid>
                              <Grid item={true} xs={6} >
                              {
                                courses.map((data) => (
                                  <Box sx={{ marginBottom: 1 }}>
                                    <CoursesInputField inputvalue={data.value} id={data.id} getValue={handler} />
                                  </Box>
                                ))
                              }
                              </Grid>
                              <Grid item={true} xs={3} >
                              {
                                credit.map((data) => (
                                  <Box sx={{ marginBottom: 1 }}>
                                    <CreditInputField inputvalue={data.value} id={data.id} getValue={handler} />
                                  </Box>
                                ))
                              }
                              </Grid>
                              <Grid item={true} xs={3} >
                              {
                                grade.map((data) => (
                                  <Box sx={{ marginBottom: 1 }}>
                                    <GradeInputFieldOptions inputvalue={data.value} id={data.id} getValue={handler} />
                                  </Box>
                                ))
                              }
                              </Grid>
      
                                  
                          </Grid>
                          
                          <Box sx={{flexGrow: 1}}>
                              {/* 
                                  Flex box pushes submit button down
                              */}
                          </Box>
                          
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
                                  <Box sx={{display:"flex", justifyContent:"start"}}>
                                      <CustomFormBtn 
                                      type="button" 
                                      handleClick={()=>{ addInput() }} 
                                      name="Add Courses"/>
                                  </Box>
                                  <Box sx={{display:"flex", justifyContent:"end"}}>
                                      <CustomFormImageBtn
                                        type="button"
                                        handleClick={
                                          () =>{
                                            submitHandler()
                                          }
                                        }  
                                        name="Calculate"/>
                                  </Box>
                          </Box>
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
                    easing: 'easeInOutSine',
                    autoplay: false,
                    duration: 250
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
                                            data.coursesArray.map((course)=>(
                                              <Box sx={{marginBottom: 0.5, backgroundColor: '#F0F3F6',
                                              borderRadius: 1}}>
                                                {course}
                                              </Box>
                                            ))
                                          }
                                        </Box>
                                        <Box sx={{ 
                                            width: '100%', 
                                            backgroundColor: '#F0F3F6',
                                            marginRight: 1,
                                           }}>
                                          {
                                            data.creditsArray.map((credit)=>(
                                              <Box sx={{marginBottom: 0.5, backgroundColor: '#F0F3F6',
                                              borderRadius: 1}}>
                                                {credit}
                                              </Box>
                                            ))
                                          }
                                        </Box>
                                        <Box sx={{ 
                                            width: '100%', 
                                            backgroundColor: '#F0F3F6',
                                            marginRight: 1,
                                            borderRadius: 1
                                           }}>
                                          {
                                            data.gradesArray.map((grade)=>(
                                              <Box sx={{marginBottom: 0.5, backgroundColor: '#F0F3F6',
                                              borderRadius: 1}}>
                                                {grade}
                                              </Box>
                                            ))
                                          }
                                        </Box>
                                        <Box sx={{ 
                                            width: '100%', 
                                            backgroundColor: '#F0F3F6',
                                            marginRight: 1,
                                           }}>
                                          {
                                            data.gpaArray.map((gpa)=>(
                                              <Box sx={{marginBottom: 0.5, backgroundColor: '#F0F3F6',
                                              borderRadius: 1}}>
                                                {gpa}
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
            </Anime>
            </Box>
        </Box>
    </AddLayout>
    </>
    // <div>
    //   <h1>Any place in your app!</h1>
    //       <div>
            
    //         {
    //           courses.map((data) => (
    //             <div>
    //               <CoursesInputField id={data.id} getValue={handler} />
    //             </div>
    //           ))
    //         }
          
    //         <button type="button" onClick={()=>submitHandler()} >
    //           Submit
    //         </button>
    //       </div>
    //       <button type="button" onClick={()=>addInput()} >
    //         Add Input
    //       </button>
    // </div>
  );
}