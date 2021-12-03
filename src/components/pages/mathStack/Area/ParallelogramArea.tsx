import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { ParallelogramAreaI } from '../../../../types'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
} from '../../../custom'

const ParallelogramArea = () => {
  const [initialFormValues] = React.useState({
    breadth: '',
    breadth_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    area: 0,
    breadth: 0,
    height: 0,
    unit: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    areaInbreadthUnit: 0,
    areaInheightUnit: 0,
    breadthInheightUnit: 0,
    $heightInbreadthUnit: 0,
    submittedbreadth: 0,
    submitted_height: 0
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)


  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.capsuleSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          breadth,
          breadth_unit,
          height,
          height_unit
        }, { setSubmitting, resetForm }) => {
          const payload: ParallelogramAreaI = {
            breadth,
            breadth_unit,
            height,
            height_unit,
            method: 'parallelogramArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: parallelogramArea } = await calculateMath(payload)
            console.log('=====>', parallelogramArea)
            const {
              area,
              unit,
              submittedbreadth,
              submitted_height,
              unitType,
              areaInbreadthUnit,
              areaInheightUnit,
              breadthInheightUnit,
              $heightInbreadthUnit,

            } = parallelogramArea
            if (typeof parallelogramArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setResult({
                area: area,
                breadth: submittedbreadth,
                height: submitted_height,
                unit: unit
              })
            }

            if (typeof parallelogramArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setResultTwo({
                areaInbreadthUnit: areaInbreadthUnit,
                areaInheightUnit: areaInheightUnit,
                breadthInheightUnit: breadthInheightUnit,
                $heightInbreadthUnit: $heightInbreadthUnit,
                submitted_height: submitted_height,
                submittedbreadth: submittedbreadth
              })
            }

            resetForm()
          } catch (err) {
            console.log('====>', err)
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <Label title={LABELS.breadth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="breadth"
                placeholder={PLACEHOLDERS.number}
                value={values.breadth}
                onChange={handleChange}
              />

              <CustomSelect
                id="breadth_unit"
                value={values.breadth_unit}
                onChange={handleChange('breadth_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.height} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="height"
                placeholder={PLACEHOLDERS.number}
                value={values.height}
                onChange={handleChange}
              />

              <CustomSelect
                id="height_unit"
                value={values.height_unit}
                onChange={handleChange('height_unit')}
              />
            </div>

            <CustomBtn />
            {selectedResult ? (<div className="text-center mb-3">
              <Typography variant="subtitle1"> Area: {Result.area}</Typography>
              <Typography variant="subtitle1"> Breadth: {Result.breadth}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>

            </div>) : (<div className="text-center mb-3">
              <Typography variant="subtitle1"> areaInbreadthUnit: {resultTwo.areaInbreadthUnit}</Typography>
              <Typography variant="subtitle1"> areaInheightUnit: {resultTwo.areaInheightUnit}</Typography>
              <Typography variant="subtitle1"> breadthInheightUnit: {resultTwo.breadthInheightUnit}</Typography>
              <Typography variant="subtitle1"> heightInbreadthUnit: {resultTwo.$heightInbreadthUnit}</Typography>
              <Typography variant="subtitle1"> submitted_height: {resultTwo.submitted_height}</Typography>
              <Typography variant="subtitle1"> submittedbreadth: {resultTwo.submittedbreadth}</Typography>


            </div>)}


          </form>
        )}
      </Formik>
    </div>
  )
}

export default ParallelogramArea
