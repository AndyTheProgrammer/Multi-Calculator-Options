import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { RectangleAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
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

const RectangularArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    length: '',
    length_unit: '',
    width: '',
    width_unit: '',
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
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.rectangleArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            length,
            length_unit,
            width,
            width_unit,
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

            } catch (err) {
              console.log('====>', err)
            }
          }}

        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
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
                  measurement="length"
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
                  measurement="length"
                  value={values.width_unit}
                  onChange={handleChange('width_unit')}
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
        {selectedResult ? (
          <div className="text-wrap">
            <Typography variant="subtitle1"> Area = l x w</Typography>
            <Typography variant="subtitle1"> = {Result.area}{Result.units}<sup>2</sup></Typography>
          </div>
        ) : (
          <div className="text-wrap">
            <Typography variant="subtitle1"> areaInLengthUnit: {resultTwo.areaInLengthUnit}</Typography>
            <Typography variant="subtitle1"> areaInWidthUnit: {resultTwo.areaInWidthUnit}</Typography>
            <Typography variant="subtitle1"> lengthInWidthUnit: {resultTwo.lengthInWidthUnit}</Typography>
            <Typography variant="subtitle1"> submittedLength: {resultTwo.submittedLength}</Typography>              <Typography variant="subtitle1"> submittedLength: {resultTwo.submittedLength}</Typography>
            <Typography variant="subtitle1"> submitted_width: {resultTwo.submitted_width}</Typography>
            <Typography variant="subtitle1"> widthInlengthUnit: {resultTwo.$widthInlengthUnit}</Typography>
          </div>
        )}
      </ResultTabsContainer>


    </>
  )
}

export default RectangularArea
