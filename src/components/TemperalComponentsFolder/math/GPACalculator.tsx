import React, { useRef } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid } from '@mui/material'
import { labelStyle, formCardStyle, formDisplay } from '../../../styling/CustomStyles'


export function GPACalculator(){
    return(
        <>
            <Formik
                initialValues={{ 
                    course:"",
                    credit:"",
                    grade:"",
                    method: "GPACalculator"
                }}
                onSubmit = {(values)=>{
                    console.log("I am submmited ", values)
                }}>
                    
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label style={{ marginRight: 10 }}>Course</label>
                            <CustomForm
                                type="text"
                                name="name"
                                id="fibonacci"
                                onChange={handleChange}
                                value={values.course}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label style={{ marginRight: 10 }}>Credit</label>
                            <CustomForm
                                type="text"
                                name="name"
                                id="fibonacci"
                                onChange={handleChange}
                                value={values.credit}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label style={{ marginRight: 10 }}>Grade</label>
                            <CustomForm
                                type="text"
                                name="name"
                                id="fibonacci"
                                onChange={handleChange}
                                value={values.grade}
                                placeholder=""
                            />
                        </div>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
}