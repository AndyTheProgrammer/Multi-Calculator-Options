import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { TrapezoidAreaI } from '../../../../types'
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

const TrapezoidArea = () => {
  const [initialFormValues] = React.useState({
    base1: "",
    base1_unit: "",
    base2: "",
    base2_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    area: 0,
    base1: 0,
    base2: 0,
    height: 0,
    unit: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    areaInm: 0,
    base1tom: 0,
    base2tom: 0,
    heighttom: 0,
    areaIncm: 0,
    base1tocm: 0,
    base2tocm: 0,
    heighttocm: 0,
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)


  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.trapezoidArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          base1,
          base1_unit,
          base2,
          base2_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: TrapezoidAreaI = {
            base1,
            base1_unit,
            base2,
            base2_unit,
            height,
            height_unit,
            method: 'TrapezoidArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: TrapezoidArea } = await calculateMath(payload)
            console.log('=====>', TrapezoidArea)
            const {
              area,
              units,
              unitType,
              submittedbase1,
              submitted_base2,
              submitted_height,
              areaInm,
              base1tom,
              base2tom,
              heighttom,
              areaIncm,
              base1tocm,
              base2tocm,
              heighttocm
            } = TrapezoidArea
            if (typeof TrapezoidArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setResult({
                area: area,
                base1: submittedbase1,
                base2: submitted_base2,
                height: submitted_height,
                unit: units
              })
            }
            if (typeof TrapezoidArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setResultTwo({
                areaIncm: areaIncm,
                base1tocm: base1tocm,
                base2tocm: base2tocm,
                heighttocm: heighttocm,
                areaInm: areaInm,
                base1tom: base1tom,
                base2tom: base2tom,
                heighttom: heighttom

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
              <Label title={LABELS.base1} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="base1"
                placeholder={PLACEHOLDERS.number}
                value={values.base1}
                onChange={handleChange}
              />

              <CustomSelect
                id="base1_unit"
                value={values.base1_unit}
                onChange={handleChange('base1_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.base2} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="base2"
                placeholder={PLACEHOLDERS.number}
                value={values.base2}
                onChange={handleChange}
              />

              <CustomSelect
                id="base2_unit"
                value={values.base2_unit}
                onChange={handleChange('base2_unit')}
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
            {selectedResult ? (

              <div className="text-center mb-3">
                <Typography variant="subtitle1"> Area: {Result.area}</Typography>
                <Typography variant="subtitle1"> Base 1: {Result.base1}</Typography>
                <Typography variant="subtitle1"> Base 2: {Result.base2}</Typography>
                <Typography variant="subtitle1"> Height: {Result.height}</Typography>
                <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>

              </div>
            ) : (
              <div className="text-center mb-3">
                <Typography variant="subtitle1"> areaIncm: {resultTwo.areaIncm}</Typography>
                <Typography variant="subtitle1"> areaInm: {resultTwo.areaInm}</Typography>
                <Typography variant="subtitle1"> base1tocm: {resultTwo.base1tocm}</Typography>
                <Typography variant="subtitle1"> base1tom: {resultTwo.base1tom}</Typography>
                <Typography variant="subtitle1"> base2tocm: {resultTwo.base2tocm}</Typography>
                <Typography variant="subtitle1"> base2tom: {resultTwo.base2tom}</Typography>
                <Typography variant="subtitle1"> heighttocm: {resultTwo.heighttocm}</Typography>
                <Typography variant="subtitle1"> heighttom: {resultTwo.heighttom}</Typography>


              </div>
            )}


          </form>
        )}

      </Formik>
    </div>
  )
}

export default TrapezoidArea
