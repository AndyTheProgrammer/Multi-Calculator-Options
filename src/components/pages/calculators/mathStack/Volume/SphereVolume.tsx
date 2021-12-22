import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { SphereVolumeCalculatorI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
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

const SphereVolume = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    units: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sphereVol}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit
          }, { setSubmitting, resetForm }) => {
            const payload: SphereVolumeCalculatorI = {
              radius,
              radius_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: sphereVolume } = await calculateMath(payload)
              console.log('=====>', sphereVolume)
              const {
                volume,
                units,
              } = sphereVolume
              if (typeof sphereVolume === 'object') {
                setResult({
                  volume: volume,
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
                <Label title={LABELS.radius} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="radius_unit"
                  measurement="length"
                  value={values.radius_unit}
                  onChange={handleChange('radius_unit')}
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
      <ResultTabsContainer tabTitle={'Result'} sm={6} latex={LATEX.sphereVolume}>
        <div className="text-wrap">
          <Typography variant="subtitle1">
            Volume = {Result.volume}{Result.units}<sup>3</sup>
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default SphereVolume
