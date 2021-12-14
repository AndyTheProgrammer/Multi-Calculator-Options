import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { TriangleAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  ResultTabsContainer,
  FormTabsContainer
} from '../../../../custom'

//Needs to be Refactored. Waiting on Martin's End!

const TriangleArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    sideA: "",
    sideA_unit: "",
    sideB: "",
    sideB_unit: "",
    sideC: "",
    sideC_unit: "",
  })
  const [Result, setResult] = React.useState({
    area: 0,
    sideA: 0,
    sideB: 0,
    sideC: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.triangleArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            sideA,
            sideA_unit,
            sideB,
            sideB_unit,
            sideC,
            sideC_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: TriangleAreaI = {
              sideA,
              sideA_unit,
              sideB,
              sideB_unit,
              sideC,
              sideC_unit,
              method: 'TriangleArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: TriangleArea } = await calculateMath(payload)
              console.log('=====>', TriangleArea)
              const { area, unit, sideA, sideB, sideC
              } = TriangleArea
              if (typeof TriangleArea === 'object') {
                setResult({
                  area: area,
                  sideA: sideA,
                  sideB: sideB,
                  sideC: sideC,
                  unit: unit
                })
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                <Label title={LABELS.sideA} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="sideA"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sideA}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="sideA_unit"
                  measurement="length"
                  value={values.sideA_unit}
                  onChange={handleChange('sideA_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.sideB} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="sideB"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sideB}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="sideB_unit"
                  measurement="length"
                  value={values.sideB_unit}
                  onChange={handleChange('sideB_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.sideC} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="sideC"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sideC}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="sideC_unit"
                  measurement="length"
                  value={values.sideC_unit}
                  onChange={handleChange('sideC_unit')}
                />
              </div>

              <div
                className="form-row"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <CustomBtn />
                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Area: {Result.area}</Typography>
          <Typography variant="subtitle1"> Side A: {Result.sideA}</Typography>
          <Typography variant="subtitle1"> Side B: {Result.sideB}</Typography>
          <Typography variant="subtitle1"> Side C: {Result.sideC}</Typography>
          <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default TriangleArea
