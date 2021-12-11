import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { TubeVolumeCalculatorI } from '../../../../../types'
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
  FormTabsContainer,
  ResultTabsContainer
} from '../../../../custom'

const TubeVolume = () => {
  const [initialFormValues] = React.useState({
    outer_diameter: "",
    outer_diameter_unit: "",
    inner_diameter: "",
    inner_diameter_unit: "",
    length: "",
    length_unit: "",
  })
  const [Result, setResult] = React.useState({
    Volume: 0,
    outer_diameter: 0,
    inner_diameter: 0,
    length: 0,
    units: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.tubeVol} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            outer_diameter,
            outer_diameter_unit,
            inner_diameter,
            inner_diameter_unit,
            length,
            length_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: TubeVolumeCalculatorI = {
              outer_diameter,
              outer_diameter_unit,
              inner_diameter,
              inner_diameter_unit,
              length,
              length_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: tubeVolume } = await calculateMath(payload)
              console.log('=====>', tubeVolume)
              const { volume, units, outer_diameter, inner_diameter, length } = tubeVolume
              if (typeof tubeVolume === 'object') {
                setResult({
                  Volume: volume,
                  outer_diameter: outer_diameter,
                  inner_diameter: inner_diameter,
                  length: length,
                  units: units
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
                <Label title={LABELS.outerDiameter} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="outer_diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.outer_diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="outer_diameter_unit"
                  measurement="length"
                  value={values.outer_diameter_unit}
                  onChange={handleChange('outer_diameter_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.innerDiameter} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="inner_diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.inner_diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="inner_diameter_unit"
                  measurement="length"
                  value={values.inner_diameter_unit}
                  onChange={handleChange('inner_diameter_unit')}
                />
              </div>

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
          <Typography variant="subtitle1"> Volume: {Result.Volume}</Typography>
          <Typography variant="subtitle1"> Outer Diameter: {Result.outer_diameter}</Typography>
          <Typography variant="subtitle1"> Inner Diameter: {Result.inner_diameter}</Typography>
          <Typography variant="subtitle1"> Units: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default TubeVolume
