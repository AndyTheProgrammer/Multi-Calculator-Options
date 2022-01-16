
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
var classNames = require('classnames');
var Latex = require('react-latex');


const menubutton = {
    width:'100%',
    fontSize: 16,
    paddingTop: 0.1, 
    marginBottom:0.5,
    boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.2)',
}

export default function RootsCalculators(){
    const [index, setIndex] = useState([true,false,false])
    const [calcName, setCalcName] = useState("General Root Calculator")
    const [showMenu, setShowMenu] = useState(false)
    const [value, setValue] = useState<any[]>([])
    const [inputValue, setInputValue] = useState(['4','100'])
    const [controlAnimation, setControlAnimation] = useState(false)
    const [errorMSG, setErrorMSG] = useState(false)

    const clear = () => {
        setControlAnimation(false)
        setValue([])
        setInputValue(['','','',''])
        setErrorMSG(false)
        console.log(inputValue)
    }
    return(
        <>
        <NavBar2 pageimage={math_icon} categoryname="Algebra Calculators" pagename="Roots Calculators"/>
        <AddLayout categorykey='algebra' searchname='Algebra Calculators' searchimage={algebra_icon}>
            <Typography 
                sx={{
                    paddingLeft: 1.5, 
                    marginBottom: 2,
                    fontFamily: 'Roboto, Helvetica',
                    fontSize: 16
                }}>
                <Box>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.
                </Box>
            </Typography>
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
                        sx={{ maxWidth: 500, minHeight: 150, paddingBottom: 1 }}
                        className="animated-box" >
                        
                        <Box sx={{ width:'100%', display: 'flex', }}>
                            <Box sx={{ width:'100%'}}>
                                <Box sx={{ width:'100%'}}
                                    onClick={
                                        ()=>{
                                            setShowMenu(!showMenu)
                                        }
                                    }>
                                    <Typography 
                                        sx={{ width: '50%'}}>
                                                <Box
                                                sx={{
                                                    justifyContent: 'space-between',
                                                    display: 'flex', }} 
                                                    className="form-card div-link"> 
                                                    {calcName} 
                                                
                                                    {
                                                        (showMenu)?
                                                            <KeyboardArrowUpIcon sx={{ color: 'white' }} />
                                                        :   <KeyboardArrowDownIcon sx={{ color: 'white' }} />
                                                    }
                                                </Box>
                                    </Typography>
                                </Box>
                                {
                                    (showMenu)?
                                    <Box sx={{ 
                                        position:'absolute',    
                                        width:'210px',
                                        height: '140px',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                        borderRadius: 2.5,
                                        marginLeft: 1,
                                        paddingLeft: 1,
                                        paddingRight: 1,
                                        paddingTop: 1,
                                        zIndex:20
                                    }}>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([true, false, false, false])
                                                    setCalcName("General Root Calculator")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                               ...menubutton
                                            }}>
                                            <Box>
                                               General Root Calculator
                                            </Box>
                                        </Typography >
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, true, false, false])
                                                    setCalcName("Root Calculator")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                                ...menubutton
                                            }}>
                                            <Box>
                                                Root Calculator
                                            </Box>
                                        </Typography>
                                        <Typography
                                            onClick={
                                                ()=>{
                                                    setIndex([false, false, true, false])
                                                    setCalcName("Cube Root Calculator")
                                                    setShowMenu(false)
                                                }
                                            }
                                            className={classNames({
                                                'form-card': true,
                                                'div-link': true
                                            })}
                                            sx={{ 
                                                ...menubutton
                                            }}>
                                            <Box> Cube Root Calculator</Box>
                                        </Typography>
                                       
                                    </Box>
                                    :<Box></Box>
                                }
                            </Box>
                        </Box>
                        {
                            (index[0])?
                            <Formik
                            enableReinitialize
                            initialValues={{ 
                                
                                number: inputValue[0],
                                root_number: inputValue[1],
                                method: "GeneralRootCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    number: values.number,
                                    root_number: values.root_number,
                                    method: values.method
                                }
                                setInputValue([
                                    values.number,
                                    values.root_number
                                ])

                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setControlAnimation(true)
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
                                        <Box 
                                            sx={{
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                            }}>
                                            <Typography sx={{marginBottom: 1}}>    
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        fontStyle: 'bold',
                                                        fontSize: 14,
                                                        color: '#b0b0b0',
                                                        marginBottom:1
                                                    }}>
                                                    amet aliquam id diam maecenas ultricies mi eget mauris pharetra
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        display:'flex',
                                                        justifyContent:'center'
                                                    }}>
                                                    <Latex displayMode={true}>{`$\\sqrt[${"n"}]{${"x"}}= ${"y"} $`}</Latex>
                                                </Box>
                                            </Typography>
                                        </Box>
                                        <Box sx={{ minHeight: 100, display: 'flex', justifyContent:'center'}}>
                                            <Box sx={{border:'none', maxHeight: '100%', width: '190px', marginTop:1, }}>
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
                            :<Box></Box>
                        }
                        {
                            (index[1])?
                            <Formik
                            enableReinitialize
                            initialValues={{ 
                                number:inputValue[0],
                                method: "SquareRootCalculator"
                            }}
                        onSubmit = {(values)=>{
                            const data = {
                                number: values.number,
                                method: values.method
                            }

                            setInputValue([
                                inputValue[0],
                                ''
                            ])

                            const postData = async () => {
                                const responseData = await mathMainService(data)
                                var msg:any = responseData.statusDescription;
                                if(msg === "success"){
                                    setControlAnimation(true)
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
                                    <Box 
                                        sx={{
                                            minWidth:'350px', 
                                            paddingTop:2, 
                                            paddingLeft:2, 
                                            paddingRight:2,
                                        }}>
                                        <Typography sx={{marginBottom: 1}}>    
                                            <Box
                                                sx={{
                                                    fontWeight: 100,
                                                    fontStyle: 'bold',
                                                    fontSize: 14,
                                                    color: '#b0b0b0',
                                                    marginBottom:1
                                                }}>
                                                amet aliquam id diam maecenas ultricies mi eget mauris pharetra
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: 100,
                                                    display:'flex',
                                                    justifyContent:'center'
                                                }}>
                                                <Latex displayMode={true}>{`$\\sqrt{${"x"}}= ${"y"} $`}</Latex>
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ minHeight: 100, display: 'flex', justifyContent:'center'}}>
                                        <Box sx={{border:'none', maxHeight: '100%', width: '120px', marginTop:1, }}>
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
                            :<Box></Box>
                        }
                        {
                            (index[2])?
                            <Formik
                            enableReinitialize
                            initialValues={{ 
                                number:inputValue[1],
                                method: "CubeRootCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const data = {
                                    number: values.number,
                                    method: values.method
                                }
                                setInputValue([
                                    '',
                                    inputValue[1]
                                ])
                                const postData = async () => {
                                    const responseData = await mathMainService(data)
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        setControlAnimation(true)
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
                                        <Box 
                                            sx={{
                                                minWidth:'350px', 
                                                paddingTop:2, 
                                                paddingLeft:2, 
                                                paddingRight:2,
                                            }}>
                                            <Typography sx={{marginBottom: 1}}>    
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        fontStyle: 'bold',
                                                        fontSize: 14,
                                                        color: '#b0b0b0',
                                                        marginBottom:1
                                                    }}>
                                                    amet aliquam id diam maecenas ultricies mi eget mauris pharetra
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontWeight: 100,
                                                        display:'flex',
                                                        justifyContent:'center'
                                                    }}>
                                                    <Latex displayMode={true}>{`$\\sqrt[${"3"}]{${"x"}}= ${"y"} $`}</Latex>
                                                </Box>
                                            </Typography>
                                        </Box>
                                        <Box sx={{ minHeight: 100,  display: 'flex', justifyContent:'center'}}>
                                            <Box sx={{ width: '120px', marginTop:1, }}>
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
                            :<Box></Box>
                        }
                      
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
                                    <Box sx={{paddingLeft: 3}}>
                                        <Typography sx={{ fontSize: 16, border:'none' }}>
                                            <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                Calculation Steps:
                                            </Box>
                                        </Typography>
                                        <Box sx={{marginBottom: 2}}>
                                            <Latex displayMode={true}>{`$\\sqrt[${inputValue[0]}]{${inputValue[1]}}= ${value[0]} $`}</Latex>
                                        </Box>
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
                                    <Box sx={{paddingLeft: 3}}>
                                        <Typography sx={{ fontSize: 16, border:'none' }}>
                                            <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                Calculation Steps:
                                            </Box>
                                        </Typography>
                                        <Box sx={{marginBottom: 2}}>
                                            <Latex displayMode={true}>{`$\\sqrt{${inputValue[0]}}= ${value[0]} $`}</Latex>
                                        </Box>
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
                                    <Box sx={{paddingLeft: 3}}>
                                        <Typography sx={{ fontSize: 16, border:'none' }}>
                                            <Box sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: 14,}}>
                                                Calculation Steps:
                                            </Box>
                                        </Typography>
                                        <Box sx={{marginBottom: 2}}>
                                            <Latex displayMode={true}>{`$\\sqrt[3]{${inputValue[1]}}= ${value[0]} $`}</Latex>
                                        </Box>
                                    </Box>
                                </Box>
                                :<Box></Box>
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