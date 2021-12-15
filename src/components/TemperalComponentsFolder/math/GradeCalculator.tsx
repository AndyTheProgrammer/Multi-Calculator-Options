import React, { useRef } from 'react'
import CustomForm from '../../forms/CustomForm'
import { Field, Form, Formik, FormikProps } from 'formik'
import { mathMainService } from '../../../services/mathService/mathMainService'
import Anime from 'react-animejs-wrapper'
import AddLayout from '../../layouts/AddLayout'
import { Box, Grid } from '@mui/material'

export function GradeCalculator(){
    return(
        <>
            <Formik
                initialValues={{ 
                    entry:"",
                    weight:"",
                    grade:"",
                    method: "GradeCalculator"
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
                            <label style={{ marginRight: 10 }}>Entry</label>
                            <CustomForm
                                type="text"
                                name="name"
                                id="fibonacci"
                                onChange={handleChange}
                                value={values.entry}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label style={{ marginRight: 10 }}>Weight</label>
                            <CustomForm
                                type="text"
                                name="name"
                                id="fibonacci"
                                onChange={handleChange}
                                value={values.weight}
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