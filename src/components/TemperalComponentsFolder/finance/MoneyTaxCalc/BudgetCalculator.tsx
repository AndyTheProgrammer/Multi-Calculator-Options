import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { financeService } from '../../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { NavBar2 } from '../../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../../styling/CustomStyles'
import { CustomFormikForm } from '../../../forms/CustomForm'
import { CustomFormBtn, CustomFormImageBtn } from '../../../custom/CustomFormBtn';
import finance_icon from '../../../../common/assets/finance_icon.svg';
import money_tax_icon from '../../../../common/assets/money_tax_icon.svg';


const BudgetOptions = (props:any) => (
 
    <Box sx={{
      display: 'flex',
    }}>
      <select 
      style={{
        width:'100%',
        // backgroundColor:'#F0F3F6',
        backgroundColor:'#EEEEEE',
        border: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        fontSize: 18,
        marginLeft: 1
      }}
      {...props} >
        <option value="">Year</option>
        <option value="">Month</option>
      </select>
    </Box>
  );

export default function BudgetCalculator(){
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
        <NavBar2 pageimage={finance_icon} categoryname="Laon Calculators" pagename="Budget Calculator"/>
        <AddLayout categorykey='money' searchname='Loan Calculators' searchimage={money_tax_icon}>
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
            <Box sx={{ display: 'flex', justifyContent:'center'}}>
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
                        sx={{ maxWidth: 750,paddingBottom: 1 }}
                        className="animated-box" >
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{height:25, width: '100%' }}></Box>
                            {/* <Box sx={{...formCardStyle}}></Box> */}
                        </Box>
                        <Formik
                            initialValues={ {
                                income_tax_rate: "",
                                income_one: "",
                                income_one_unit: "",
                                income_two: "",
                                income_two_unit: "",
                                income_three: "",
                                income_three_unit: "",
                                income_four: "",
                                income_four_unit: "",
                                income_five: "",
                                income_five_unit: "",
                                income_six: "",
                                income_six_unit: "",
                                housing_and_tilities_one: "",
                                housing_and_tilities_one_unit: "",
                                housing_and_tilities_two: "",
                                housing_and_tilities_two_unit: "",
                                housing_and_tilities_three: "",
                                housing_and_tilities_three_unit: "",
                                housing_and_tilities_four: "",
                                housing_and_tilities_four_unit: "",
                                housing_and_tilities_five: "",
                                housing_and_tilities_five_unit: "",
                                housing_and_tilities_six: "",
                                housing_and_tilities_six_unit: "",
                                housing_and_tilities_seven: "",
                                housing_and_tilities_seven_unit: "",
                                transportation_one: "",
                                transportation_one_unit: "",
                                transportation_two: "",
                                transportation_two_unit: "",
                                transportation_three: "",
                                transportation_three_unit: "",
                                transportation_four: "",
                                transportation_four_unit: "",
                                transportation_five: "",
                                transportation_five_unit: "",
                                transportation_six: "",
                                transportation_six_unit: "",
                                transportation_seven: "",
                                transportation_seven_unit: "",
                                other_debt_and_loan_payments_one: "",
                                other_debt_and_loan_payments_one_unit: "",
                                other_debt_and_loan_payments_two: "",
                                other_debt_and_loan_payments_two_unit: "",
                                other_debt_and_loan_payments_three: "",
                                other_debt_and_loan_payments_three_unit: "",
                                healthcare_one: "",
                                healthcare_one_unit: "",
                                healthcare_two: "",
                                healthcare_two_unit: "",
                                healthcare_three: "",
                                healthcare_three_unit: "",
                                living_expenses_one: "",
                                living_expenses_one_unit: "",
                                living_expenses_two: "",
                                living_expenses_two_unit: "",
                                living_expenses_three: "",
                                living_expenses_three_unit: "",
                                living_expenses_four: "",
                                living_expenses_four_unit: "",
                                living_expenses_five: "",
                                living_expenses_five_unit: "",
                                living_expenses_six: "",
                                living_expenses_six_unit: "",
                                children_and_education_one: "",
                                children_and_education_one_unit: "",
                                children_and_education_two: "",
                                children_and_education_two_unit: "",
                                children_and_education_three: "",
                                children_and_education_three_unit: "",
                                children_and_education_four: "",
                                children_and_education_four_unit: "",
                                children_and_education_five: "",
                                children_and_education_five_unit: "",
                                savings_and_investments_one: "",
                                savings_and_investments_one_unit: "",
                                savings_and_investments_two: "",
                                savings_and_investments_two_unit: "",
                                savings_and_investments_three: "",
                                savings_and_investments_three_unit: "",
                                savings_and_investments_four: "",
                                savings_and_investments_four_unit: "",
                                savings_and_investments_five: "",
                                savings_and_investments_five_unit: "",
                                miscellaneous_expenses_one: "",
                                miscellaneous_expenses_one_unit: "",
                                miscellaneous_expenses_two: "",
                                miscellaneous_expenses_two_unit: "",
                                miscellaneous_expenses_three: "",
                                miscellaneous_expenses_three_unit: "",
                                miscellaneous_expenses_four: "",
                                miscellaneous_expenses_four_unit: "",
                                miscellaneous_expenses_five: "",
                                miscellaneous_expenses_five_unit: "",
                                miscellaneous_expenses_six: "",
                                miscellaneous_expenses_six_unit: "",
                                method: "",
                            }}
                            onSubmit = {(values)=>{
                                const data = {}

                                setValue(['NO DATA FROM END POINT'])
                                const postData = async () => {
                                    // const responseData = await financeService(data)
                                    
                                    // var msg:any = responseData.statusDescription;
                                    // if(msg === "success"){
                                    //     setValue([responseData.message])
                                    // }
                                }
                                postData()
                            }}>
                                
                            {(props: FormikProps<any>) => (
                                <Form>
                                    <Box sx={{  minHeight: 250, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                            <Grid item={true} xs={6} >
                                                <Box sx={{...labelStyle}}>Sales Tax Percentage</Box></Grid>
                                            <Grid item={true} xs={3}>
                                                <Field
                                                    type="text"
                                                    name="sales_tax_percentage"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={3} >
                                                <Field
                                                    type="text"
                                                    name="sales_tax_percentage"
                                                    component={BudgetOptions}
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
                                            <Box sx={{display:"flex", flexGrow:1, justifyContent:"start"}}>
                                            
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"end"}}>
                                                <CustomFormImageBtn type="submit" name="Calculate"/>   
                                            </Box>
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Anime>

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
                                <Box sx={{height:30, width: '100%' }}></Box>
                                <Box sx={{
                                        height:30, width: '100%', 
                                        // backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)',
                                        borderRadius: '0 10px 3px', 
                                    }}></Box>
                            </Box>
                            <Box sx={{marginLeft: 5}}>
                               We may have data
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