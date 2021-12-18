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
      console.log(props.id)
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
              outline: 'none'
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
    console.log(props.id)
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
            outline: 'none'
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
    console.log(props.id)
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
            outline: 'none'
          }}
          type="text" 
          name="grade" 
          value={value} 
          onChange={handleChange}
        />
      </Box>
  );
}

export default function GPACalculator(){    const [value, setValue] = useState("")
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


  const [courses, setCourses] = useState([
    {id: 1, value: ''}
  ]);
  const [credit, setCredit] = useState([
    {id: 1, value: ''}
  ]);
  const [grade, setGrade] = useState([
    {id: 1, value: ''}
  ]);

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
      resultCoursesArray[i] = courses[i].value
    }
    for(var i = 0; i < credit.length; i++){
      resultCreditArray[i] = credit[i].value
    }
    for(var i = 0; i < grade.length; i++){
      resultGradeArray[i] = grade[i].value
    }


    console.log(resultCoursesArray.toString())
    console.log(resultCreditArray.toString())
    console.log(resultGradeArray.toString())
  }

  const addInput = ()=>{
      setCourses([...courses, { id: courses.length + 1, value: ''}])
      setCredit([...credit, { id: credit.length + 1, value: ''}])
      setGrade([...grade, { id: grade.length + 1, value: ''}])
  }

  return(
    <>
    <NavBar2 pagename="GPA Calculator" />
    <AddLayout>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            
        <Anime
            style={{
                position: 'absolute',
            }}
            ref={animatedSquaresRef1}
            config={{
                translateX: -250,
                easing: 'easeInOutSine',
                autoplay: false,
                duration: 250
            }}>
            <Box sx={{ ...formDisplay }}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{height:25, width: '100%' }}></Box>
                    <Box sx={{ ...formCardStyle }}></Box>
                </Box>
                
                        
                  <Box sx={{minHeight: 250, display:'flex', flexDirection:'column' }}>
                      <Grid container={true}columnSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                          <Grid item={true} xs={4}>
                              <Box sx={{ ...labelStyle }}>Course</Box>
                          </Grid>
                          <Grid item={true} xs={4}>
                              <Box sx={{ ...labelStyle }}>Credit</Box>
                          </Grid>
                          <Grid item={true} xs={4}>
                              <Box sx={{ ...labelStyle }}>Grade</Box>
                          </Grid>
                          <Grid item={true} xs={4} >
                          {
                            courses.map((data) => (
                              <Box sx={{ marginBottom: 1 }}>
                                <CoursesInputField inputvalue={data.value} id={data.id} getValue={handler} />
                              </Box>
                            ))
                          }
                          </Grid>
                          <Grid item={true} xs={4} >
                          {
                            credit.map((data) => (
                              <Box sx={{ marginBottom: 1 }}>
                                <CreditInputField inputvalue={data.value} id={data.id} getValue={handler} />
                              </Box>
                            ))
                          }
                          </Grid>
                          <Grid item={true} xs={4} >
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
                      <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                          <Grid item xs={4}>
                              <Box sx={{display:"flex", justifyContent:"start"}}>
                                  <CustomFormBtn 
                                  type="button" 
                                  handleClick={()=>{ console.log("Clear button clicked") }} 
                                  name="Clear"/>
                              </Box>
                          </Grid>
                          <Grid item xs={4}>
                              <Box sx={{display:"flex", justifyContent:"start"}}>
                                  <CustomFormBtn 
                                  type="button" 
                                  handleClick={()=>{ addInput() }} 
                                  name="Add Courses"/>
                              </Box>
                          </Grid>
                          <Grid item xs={4}>
                              <Box sx={{display:"flex", justifyContent:"start"}}>
                                  <CustomFormBtn 
                                  type="button" 
                                  handleClick={()=>{ submitHandler() }} 
                                  name="Calculate"/>
                              </Box>
                          </Grid>
                          
                      </Grid>
                  </Box>

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
                easing: 'easeInOutSine',
                autoplay: false,
                duration: 250
            }}>
             <Box style={formDisplay} >
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
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={false}>{`$a_{n} = a+(n-1)d$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={false}>{`$S_{n} = \\displaystyle \\sum_{i=1}^{10} t_i$`}</Latex>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Latex displayMode={false}>{`$answer = ${value}$`}</Latex>
                    </Box>
                </Box>
            </Box>
        </Anime>
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