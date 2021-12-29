import React, { useRef, useState, useEffect }  from 'react';
import CustomForm from '../../forms/CustomForm';
import { Field, Form, Formik, FormikProps } from 'formik';
import { mathMainService } from '../../../services/mathService/mathMainService';
import Anime from 'react-animejs-wrapper';
import AddLayout from '../../layouts/AddLayout';
import { Box, Grid, Typography } from '@mui/material';
import { NavBar2 } from '../../navbar/navbar2';
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles';
import { CustomFormikForm, CustomFormikOptions } from '../../forms/CustomForm';
import TextCard from '../../utilityComponents/TextCard';
import { CustomFormBtn, CustomFormImageBtn } from '../../custom/CustomFormBtn';
import math_icon from '../../../common/assets/math_icon.svg';
import stats from '../../../common/assets/stats_icon.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Latex = require('react-latex');

function checkArray(arr:any, num:any){
    for(var i = 0; i < arr.length; i++){
      if(arr[i].id === num){
        return true;
      }
    }
    return false
  }

function InputField(props:any){
    const [value, setValue] = useState(props.inputvalue)
    const handleChange = (e:any) => {
      setValue(e.target.value)
      console.log(props.id)
      props.getValue(e.target.value, props.id)     
    }
  
    return (
        <Box sx={{
          display: 'flex',
        }}>
          <input
            style={{
              textAlign: 'center',
              width:'100%',
              backgroundColor:'#F0F3F6',
              border: 'solid',
              borderWidth: 0,
              borderColor: 'red',
              borderRadius: 7,
              outline: 'none'
            }}
            type="text" 
            name="value" 
            value={value} 
            onChange={handleChange}
          />
        </Box>
    );
  }

export default function StandardDeviationCalculator(){
    const [value, setValue] = useState<any[]>([])
    const [inputType, setInputType] = useState('population')
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
                setSDValue([
                    {id:1,value:''},
                    {id:1,value:''},
                    {id:1,value:''}
                ])
                setValue([]);
                setInputType('population')
                setPlayAnimation(false);
            }
        }
        else{
            setValue([]);
            setInputType('population')
            setSDValue([
                {id:1,value:''},
                {id:1,value:''},
                {id:1,value:''}
            ])
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

    const [sdValue, setSDValue] = useState([
        {id: 0, value: '7'},
        {id: 1, value: '4'},
        {id: 2, value: '2'}
      ]);

      const handler = (h:any, id:any) =>{

        const copysdValue = sdValue;
        
          if(copysdValue.length !== 0){
            for(var i = 0; i < copysdValue.length; i++){
                // if(!checkArray(copysdValue, id)){
                //     const data = {
                //         id: id,
                //         value: h
                //     }
                //     setSDValue([...copysdValue, data]);
                // }
                if(copysdValue[i].id === id ){      
                    copysdValue[i].value = h
                    console.log("Monkey")
                    setSDValue(copysdValue)
                }
            }
            // setSDValue([...copysdValue])
        }
    }
    
    function addField(){
        setSDValue([...sdValue, {id: sdValue.length, value: ''}]);
    }

    function checkEmpty(arr:any){
        for(var i = 0; i < arr.length; i++){
            if(parseInt(arr[i++].value) && arr[i].value === ''  ){
                return false
            }
            if(!parseInt(arr[i].value)){
                return false
            }
        }
        return true
    }

    async function submitHandler(){
        var postData:any = [];
        
        for(var i = 0; i < sdValue.length; i++){
            if( sdValue[i].value !== '' && parseInt(sdValue[i].value)){
                postData.push(parseInt(sdValue[i].value))
            }
        }
        if(inputType === 'population'){
            console.log("Submit population data here")
            const data = {
                provided_numbers: postData.toString(),
                method: "PopulationStandardDeviationCalculator"
            }
            const response = await mathMainService(data);
            setValue([response.message])
            console.log(response.message)
        }

        if(inputType === 'sample'){
            console.log("Submit sample data here")
            const data = {
                provided_numbers: postData.toString(),
                method: "SampleStandardDeviationCalculator"
            }
            const response = await mathMainService(data);
            setValue([response.message])
        }
        console.log(value)
    }

    function toggleType(data:string){
        setInputType(data)
    }

    return(
        <>
            <NavBar2 pageimage={math_icon} categoryname="Statistics Calculators" pagename="Sample Standard Deviation Calculator"/>
            <AddLayout  categorykey='statistics' searchname='Statistics Calculators' searchimage={stats} >
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
                        sx={{ maxWidth: 450,paddingBottom: 1 }}
                        className="animated-box" >
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{height:25, width: '100%' }}></Box>
                            <Box sx={{...formCardStyle}}></Box>
                        </Box>
                        <Grid columnSpacing={1} container sx={{ paddingTop:5, paddingBottom:5, paddingLeft:5, paddingRight:5}}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{
                                                width: {
                                                    lg: '50%',
                                                    md: '50%',
                                                    sm: '170px',
                                                    xs: '170px'
                                                },
                                                fontWeight: 'bold',
                                                marginTop: 1.1
                                            }}>
                                            <Box>This is data :</Box>
                                        </Typography>
                                    <FormControl component="fieldset" sx={{ width: '100%'}}>
                                        
                                        <RadioGroup row aria-label="position" name="position" defaultValue={inputType}>
                                            <FormControlLabel
                                                value='population'
                                                control={<Radio />}
                                                label="Population"
                                                labelPlacement="start"
                                                onClick={
                                                    ()=>{
                                                        toggleType('population')
                                                    }
                                                }
                                                />
                                            <FormControlLabel
                                                value='sample'
                                                control={<Radio />}
                                                label="Sample"
                                                labelPlacement="start"
                                                onClick={
                                                    ()=>{
                                                        toggleType('sample')
                                                    }
                                                }
                                                />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                        {
                            sdValue.map((data) => (
                                <Grid item xs={4} sm={3} md={2} sx={{ marginBottom: 1 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <InputField inputvalue={data.value} id={data.id} getValue={handler} />
                                        </Box>
                                        <Typography>
                                            <Box>,</Box>
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))
                        }
                        </Grid>
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
                                      handleClick={()=>{ addField() }} 
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
                        duration: 250,
                        easing: 'easeInOutSine',
                        autoplay: false,
                    }}>
                    {
                        (value.length)?
                        value.map((data:any)=>(
                            <Box 
                            sx={{ maxWidth: 400,paddingBottom: 1 }}
                            className="animated-box" >
                                {
                                    console.log(data)
                                }
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
                                <Box 
                                    sx={{ 
                                        display:'flex', }}>
                                    <Typography
                                        sx={{ 
                                            display:'flex',
                                            justifyContent:  'space-between',
                                            marginRight: 1 ,
                                            fontSize: 14
                                        }}>
                                        <Box sx={{ width: 150 }}>
                                            Standard Deviation    
                                        </Box>
                                        <Box>
                                            :
                                        </Box>

                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }}>
                                        <Box>
                                            {data.standardDeviation}   
                                            {data.sampleStandardDeviation} 
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        display:'flex', }}>
                                    <Typography
                                        sx={{ 
                                            display:'flex',
                                            justifyContent:  'space-between',
                                            marginRight: 1 ,
                                            fontSize: 14
                                        }}>
                                        <Box sx={{ width: 150 }}>
                                            Count   
                                        </Box>
                                        <Box>
                                            :
                                        </Box>

                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }}>
                                        <Box>
                                            {data.count}   
                                        </Box>
                                    </Typography>
                                </Box>

                                <Box 
                                    sx={{ 
                                        display:'flex', }}>
                                    <Typography
                                        sx={{ 
                                            display:'flex',
                                            justifyContent:  'space-between',
                                            marginRight: 1 ,
                                            fontSize: 14
                                        }}>
                                        <Box sx={{ width: 150 }}>
                                            Sum   
                                        </Box>
                                        <Box>
                                            :
                                        </Box>

                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }}>
                                        <Box>
                                        {data.sum}    
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        display:'flex', }}>
                                    <Typography
                                        sx={{ 
                                            display:'flex',
                                            justifyContent:  'space-between',
                                            marginRight: 1 ,
                                            fontSize: 14,
                                        }}>
                                        <Box sx={{ width: 150 }}>
                                            Mean 
                                        </Box>
                                        <Box>
                                            :
                                        </Box>

                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }}>
                                        <Box>
                                        {data.mean}   
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        display:'flex', }}>
                                    <Typography
                                        sx={{ 
                                            display:'flex',
                                            justifyContent:  'space-between',
                                            marginRight: 1 ,
                                            fontSize: 14
                                        }}>
                                        <Box sx={{ width: 150 }}>
                                            Variance   
                                        </Box>
                                        <Box>
                                            :
                                        </Box>

                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }}>
                                        <Box>
                                        {data.variance}     
                                        </Box>
                                    </Typography>
                                </Box>

                            </Box>
                        </Box>
                        ))
                        :<Box></Box>
                    }
                </Anime>
                
                </Box>
                </Box>
            
            </AddLayout>
        </>
    );
}