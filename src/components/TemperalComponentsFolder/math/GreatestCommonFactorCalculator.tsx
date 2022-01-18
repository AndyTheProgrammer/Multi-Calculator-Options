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
import geometry_icon from '../../../common/assets/geometry_icon.svg';
import math_icon from '../../../common/assets/math_icon.svg';
import stats from '../../../common/assets/stats_icon.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { typography } from '@mui/system'

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

export default function GreatestCommonFactorCalculator(){
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
                setSDValue([
                    {id: 0, value: ''},
                    {id: 1, value: ''},
                    {id: 2, value: ''}
                ])
                setPlayAnimation(false);
            }
        }
        else{
            setValue([]);
            setSDValue([
                {id: 0, value: ''},
                {id: 1, value: ''},
                {id: 2, value: ''}
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
        {id: 0, value: '100'},
        {id: 1, value: '24'},
        {id: 2, value: '16'}
      ]);

      const handler = (h:any, id:any) =>{

        const copysdValue = sdValue;
        
          if(copysdValue.length !== 0){
            for(var i = 0; i < copysdValue.length; i++){
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
        setValue(postData)
    }

    return(
        <>
            <NavBar2 pageimage={math_icon}  categoryname="General Calculators" pagename="Greatest Common Factor Calculator"/>
            <AddLayout categorykey='general' searchname='General Calculators' searchimage={geometry_icon}>
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
                            <Box sx={{height:2, width: '100%' }}></Box>
                        </Box>
                        <Grid columnSpacing={1} container sx={{ paddingTop:5, paddingBottom:5, paddingLeft:5, paddingRight:5}}>
                            <Grid item xs={12}>
                                <Typography sx={{marginBottom: 1}}>    
                                    <Box
                                        sx={{
                                            fontWeight: 100,
                                            fontStyle: 'italic',
                                            fontSize: 14,
                                            color: '#b0b0b0'
                                        }}>
                                        Provide numbers seperated by a coma
                                    </Box>
                                    <Box
                                        sx={{
                                            fontWeight: 100,
                                            fontStyle: 'italic',
                                            fontSize: 14,
                                            color: '#b0b0b0'
                                        }}>
                                        e.g 12,4,5,64,87
                                    </Box>
                                </Typography>
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
                                <Box sx={{paddingLeft: 3}}>
                                    <Typography sx={{ fontSize: 16, border:'none' }}>
                                        <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                            Calculation Steps:
                                        </Box>
                                        <Box sx={{ marginBottom: 2, fontSize: 14,}}>
                                            Prime factorization of the numbers:
                                        </Box>
                                    </Typography>
                                    
                                    {
                                        value.map((data)=>{
                                            var factors = primeFactors(data)
                                            var count=0
                                            return(
                                                <Typography sx={{display:'flex'}}>
                                                    <Box sx={{marginRight:2}}>{data} : </Box>
                                                    {
                                                        factors.map((f)=>{
                                                            count++
                                                            return(
                                                                <>
                                                                    <Box sx={{marginRight:2}}>{f}</Box>
                                                                    {
                                                                        (count < factors.length)?
                                                                        <Box sx={{marginRight:2}}>x</Box>
                                                                        :<></>
                                                                    }
                                                                </>
                                                            );
                                                            
                                                        })
                                                    }
                                                </Typography>
                                            );
                                        })
                                    }
                                </Box>
                            
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

function primeFactors(n:any){
    var factors = [], 
        divisor = 2;
  
    while(n>2){
      if(n % divisor == 0){
         factors.push(divisor); 
         n= n/ divisor;
      }
      else{
        divisor++;
      }     
    }
    return factors;
}