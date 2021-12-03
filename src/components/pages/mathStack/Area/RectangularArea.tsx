import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { RectangularAreaI } from '../../../../types'
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
import { RectangleAreaI } from '../../../../types/MathInterfaces'

const RectangularArea = () => {
  const [initialFormValues] = React.useState({
    length: '',
    length_unit: '',
    width: '',
    width_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    area: 0,
    submittedLength: 0,
    submitted_width: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    areaInLengthUnit: 0,
    areaInWidthUnit: 0,
    lengthInWidthUnit: 0,
    $widthInlengthUnit: 0,
    submittedLength: '',
    submitted_width: ''
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)


  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.rectangleArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          length,
          length_unit,
          width,
          width_unit,
          height,
          height_unit
        }, { setSubmitting, resetForm }) => {
          const payload: RectangleAreaI = {
            length,
            length_unit,
            width,
            width_unit,
            method: 'rectangleArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: rectangleArea } = await calculateMath(payload)
            console.log('=====>', rectangleArea)
            const { area,
              units,
              submittedLength,
              submitted_width,
              unitType,
              areaInLengthUnit,
              areaInWidthUnit,
              lengthInWidthUnit,
              $widthInlengthUnit,
            } = rectangleArea
            if (typeof rectangleArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setResult({
                area: area,
                submittedLength: submittedLength,
                submitted_width: submitted_width,
                units: units
              })
            }

            if (typeof rectangleArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setResultTwo({
                areaInLengthUnit: areaInLengthUnit,
                areaInWidthUnit: areaInWidthUnit,
                lengthInWidthUnit: lengthInWidthUnit,
                $widthInlengthUnit: $widthInlengthUnit,
                submittedLength: submittedLength,
                submitted_width: submitted_width
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
              <Label title={LABELS.length} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="length"
                placeholder={PLACEHOLDERS.number}
                value={values.length}
                onChange={handleChange}
              />

              <CustomSelect
                id="length_unit"
                value={values.length_unit}
                onChange={handleChange('length_unit')}
              />
            </div>


            <div className="form-row">
              <Label title={LABELS.width} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="width"
                placeholder={PLACEHOLDERS.number}
                value={values.width}
                onChange={handleChange}
              />

              <CustomSelect
                id="width_unit"
                value={values.width_unit}
                onChange={handleChange('width_unit')}
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
              <Typography variant="subtitle1"> Length: {Result.submittedLength}</Typography>
              <Typography variant="subtitle1"> Width: {Result.submitted_width}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.units}</Typography>
            </div>) : (<div className="text-center mb-3">
              <Typography variant="subtitle1"> areaInLengthUnit: {resultTwo.areaInLengthUnit}</Typography>
              <Typography variant="subtitle1"> areaInWidthUnit: {resultTwo.areaInWidthUnit}</Typography>
              <Typography variant="subtitle1"> lengthInWidthUnit: {resultTwo.lengthInWidthUnit}</Typography>
              <Typography variant="subtitle1"> submittedLength: {resultTwo.submittedLength}</Typography>              <Typography variant="subtitle1"> submittedLength: {resultTwo.submittedLength}</Typography>
              <Typography variant="subtitle1"> submitted_width: {resultTwo.submitted_width}</Typography>
              <Typography variant="subtitle1"> widthInlengthUnit: {resultTwo.$widthInlengthUnit}</Typography>

            </div>)}


          </form>
        )}

      </Formik>

    </div>
  )
}

export default RectangularArea
