import React,  { useState, useEffect } from 'react'
import { Grid , Box, Typography, LinearProgress, Button } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik'

export default function ExponentForm(props:any){
    const [results, setResult] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const field_name_1 = props.fieldName1
    const field_name_2 = props.fieldName2

    return(
        <div className="container d-flex justify-content-center">

            <Box sx={{
                width: '100',
                borderRadius: 3, 
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: 5,
                paddingRight: 5
                }}>
                     <Box sx={{width: 400, m:4}}>
                        <Formik
                        initialValues={{
                            value_1: '',
                            value_2: ''
                        }}
                        onSubmit={(value, actions) =>{
                           const postDataFunction = async () => {
                               const dataReturned = await props.serviceFunction(value, props.serviceMethodName);
                               console.log(dataReturned);
                               setResult(dataReturned)
                           }

                           postDataFunction();
                        }}>
                            {(props: FormikProps<any>) =>(
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid  item xs={12} md={12}>
                                            <Field style={{ border: 5, borderColor: 'red' }} className="custom-form-control" type="text" name="value_2" />
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Field className="custom-form-control" type="text" name="value_1" />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Button sx={{ textTransform: 'none', borderRadius: 10, width: 100, height: 20, color: 'white', backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)' }} type="button">Clear</Button>
                                        </Grid>

                                        <Grid item xs={4}></Grid>
                                        <Grid sx={{  display: 'flex', justifyContent: 'right' }} item xs={4}>
                                            <Button sx={{ textTransform: 'none', borderRadius: 10, width: 100, height: 20, color: 'white', backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)' }} type="submit">calculate</Button>
                                        </Grid>
                                        
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            <Box/>
               
        </div>
    );
}