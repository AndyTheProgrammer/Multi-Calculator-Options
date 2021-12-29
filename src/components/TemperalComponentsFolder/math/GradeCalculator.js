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
            fontSize: 20
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



export default function GPACalculator(props){    
  const [value, setValue] = useState([])
  const [courses, setCourses] = useState([
    {id: 1, value: 'Math'},
    {id: 2, value: ''},
    {id: 3, value: ''}
  ]);
  const [credit, setCredit] = useState([
    {id: 1, value: '20'},
    {id: 2, value: ''},
    {id: 3, value: ''}
  ]);
  const [grade, setGrade] = useState([
    {id: 1, value: '80'},
    {id: 2, value: ''},
    {id: 3, value: ''}
  ]);

  function clearAll(){
    setCourses([{}])
    setCredit([{}])
    setGrade([{}])
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

  function controlAnimation(){
    props.controlanimation()
  }
  async function submitData(courses, credit, grade){
    const data = {
      entry: courses,
      weight: credit,
      grade: grade,
      method:"GradeCalculator"
    }
    const response = await mathMainService(data);
    console.log(response.message)
    props.retrieve([response.message])
  }

  const addInput = ()=>{
      setCourses([...courses, { id: courses.length + 1, value: ''}])
      setCredit([...credit, { id: credit.length + 1, value: ''}])
      setGrade([...grade, { id: grade.length + 1, value: ''}])
  }

  return(
    <Box>
      <Box sx={{minHeight: 150, display:'flex', flexDirection:'column' }}>
          <Grid container={true}columnSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
              <Grid item={true} xs={6}>
                  <Box sx={{ ...labelStyle }}>Entry (optional) </Box>
              </Grid>
              <Grid item={true} xs={3}>
                  <Box sx={{ ...labelStyle }}>Weight</Box>
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
                    <GradeInputField inputvalue={data.value} id={data.id} getValue={handler} />
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
                              clearAll()
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
     
  );
}