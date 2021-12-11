import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ConicalFrustumVolumeI } from '../../../../../types'
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

const ConicalFrustumVolume = () => {
  const [initialFormValues] = React.useState({
    top_radius: "",
    top_radius_unit: "",
    bottom_radius: "",
    bottom_radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    Volume: 0,
    topRadius: 0,
    bottomRadius: 0,
    height: 0,
    units: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.conicalFrustrumVol} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            top_radius,
            top_radius_unit,
            bottom_radius,
            bottom_radius_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: ConicalFrustumVolumeI = {
              top_radius,
              top_radius_unit,
              bottom_radius,
              bottom_radius_unit,
              height,
              height_unit,
              method: 'ConicalFrustumVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: conicalFrustrumVolume } = await calculateMath(payload)
              console.log('=====>', conicalFrustrumVolume)
              const { volume, units, topR, bottomR, height } = conicalFrustrumVolume
              if (typeof conicalFrustrumVolume === 'object') {
                setResult({
                  Volume: volume,
                  topRadius: topR,
                  bottomRadius: bottomR,
                  height: height,
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
                <Label title={LABELS.topRadius} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="top_radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.top_radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="top_radius_unit"
                  measurement="length"
                  value={values.top_radius_unit}
                  onChange={handleChange('top_radius_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.bottomRadius} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="bottom_radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.bottom_radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="bottom_radius_unit"
                  measurement="length"
                  value={values.bottom_radius_unit}
                  onChange={handleChange('bottom_radius_unit')}
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
                  measurement="length"
                  value={values.height_unit}
                  onChange={handleChange('height_unit')}
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
          <Typography variant="subtitle1"> Top Radius: {Result.topRadius}</Typography>
          <Typography variant="subtitle1"> Bottom Radius: {Result.bottomRadius}</Typography>
          <Typography variant="subtitle1"> Height: {Result.height}</Typography>
          <Typography variant="subtitle1"> Units : {Result.units}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default ConicalFrustumVolume
