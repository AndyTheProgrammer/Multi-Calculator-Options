import React, { useRef, useState, useEffect } from 'react'
import CustomForm from '../../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { financeService } from '../../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../../layouts/AddLayout'
import { Box, Grid, Typography } from '@mui/material'
import { CustomFormBtn } from '../../../custom/CustomFormBtn'
import { NavBar2 } from '../../../navbar/navbar2'
import { labelStyle, formCardStyle, formDisplay } from '../../../../styling/CustomStyles'
import { CustomFormikForm } from '../../../forms/CustomForm'


const innerBoxStyle = {
    width: 400,
    height: 300,
    borderRadius: 10,
    boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white'
 }


export default function DebtToIncomeCalculator(){
    const [value, setValue] = useState("")
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
    return(
        <>
        <NavBar2 pagename="Debt To Income Calculator"/>
        <AddLayout>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Anime
                    style={{
                        position: 'absolute',
                    }}
                    ref={animatedSquaresRef1}
                    config={{
                        translateX: -250,
                        duration: 250,
                        easing: 'easeInOutSine',
                        autoplay: false,
                    }}>
                    <Box sx={{...formDisplay}}>
                        

                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{height:25, width: '100%' }}></Box>
                            <Box sx={{...formCardStyle}}></Box>
                        </Box>
                        <Formik
                            initialValues={{ 
                                salary_and_earned_income:"",
                                pension_and_social_security:"",
                                investment_and_savings:"",
                                other_income:"",
                                rental_cost:"",
                                mortgage:"",
                                property_tax:"",
                                other_expenses:"",
                                auto_loan:"",
                                credit_cards:"",
                                homeowner_insurance:"",
                                hoa_fees:"",
                                method: "DebtToIncomeCalculator"
                            }}
                            onSubmit = {(values)=>{
                                const salary_and_earned_income = parseInt(values.salary_and_earned_income);
                                const pension_and_social_security = parseInt(values.pension_and_social_security);
                                const investment_and_savings = parseInt(values.investment_and_savings);
                                const other_income = parseInt(values.other_income);
                                const rental_cost = parseInt(values.rental_cost);
                                const mortgage = parseInt(values.mortgage);
                                const property_tax = parseInt(values.property_tax);
                                const other_expenses = parseInt(values.other_expenses);
                                const auto_loan = parseInt(values.auto_loan);
                                const credit_cards = parseInt(values.credit_cards);
                                const homeowner_insurance = parseInt(values.homeowner_insurance);
                                const hoa_fees = parseInt(values.hoa_fees);
                                const data = {
                                    salary_and_earned_income: salary_and_earned_income,
                                    pension_and_social_security: pension_and_social_security,
                                    investment_and_savings: investment_and_savings,
                                    other_income: other_income,
                                    rental_cost: rental_cost,
                                    mortgage: mortgage,
                                    property_tax: property_tax,
                                    other_expenses: other_expenses,
                                    auto_loan: auto_loan,
                                    credit_cards: credit_cards,
                                    homeowner_insurance: homeowner_insurance,
                                    hoa_fees: hoa_fees,
                                    method: values.method
                                }
                                console.log(data)
                                const postData = async () => {
                                    const responseData = await financeService(data)
                                    
                                    var msg:any = responseData.statusDescription;
                                    if(msg === "success"){
                                        console.log("Hacking is beautiful")
                                        setValue(responseData.message.distance)
                                        console.log(responseData)
                                    }
                                }
                                postData()
                            }}>
                                
                            {(props: FormikProps<any>) => (
                                <Form>
                                    <Box sx={{  height: 250, display:'flex', flexDirection:'column' }}>
                                        <Grid container={true} rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>salary and earned income</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="salary_and_earned_income"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>Pension and social security</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="pension_and_social_security"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>investment and savings</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="investment_and_savings"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>other income</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="other_income"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>rental cost</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="rental_cost"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>mortgage</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="mortgage"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>property tax</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="property_tax"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>other expenses</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="other_expenses"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>auto loan</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="auto_loan"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>credit cards</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="credit_cards"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>homeowner insurance</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="homeowner_insurance"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>

                                            <Grid item={true} xs={5} >
                                                <Box sx={{...labelStyle}}>hoa fees</Box></Grid>
                                            <Grid item={true} xs={7}>
                                            <Field
                                                    type="text"
                                                    name="hoa_fees"
                                                    component={CustomFormikForm}
                                                />
                                            </Grid>
                                                            
                                        </Grid>
                                        <Box sx={{ flexGrow: 1}}>
                                            {/* 
                                                Flex box pushes submit button down
                                            */}
                                        </Box>

                                    <Grid container rowSpacing={1} sx={{paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                        <Grid item xs={4}>
                                                <Box sx={{display:"flex", justifyContent:"start"}}>
                                                    <CustomFormBtn 
                                                    type="button" 
                                                    handleClick={()=>{ 
                                                        play1();
                                                        play2();
                                                    }} 
                                                    name="Clear"/>
                                                </Box>
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={4}>
                                                <Box sx={{display:"flex", justifyContent:"end"}}>
                                                    <CustomFormBtn type="submit" name="Calculate"/>
                                                </Box>
                                        </Grid>
                                    </Grid>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Anime>

                <Anime
                    style={{
                        position: 'absolute',
                        zIndex: -5
                    }}
                    ref={animatedSquaresRef2}
                    config={{
                        translateX: 200,
                        duration: 250,
                        easing: 'easeInOutSine',
                        autoplay: false,
                    }}>
                    <Box sx={formDisplay}>
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
                </Anime>
            </Box>
        </AddLayout>
        </>
    );
}