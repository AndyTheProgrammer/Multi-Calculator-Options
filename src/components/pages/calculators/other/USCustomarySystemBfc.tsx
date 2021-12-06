import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { USCustomarySystemBfcI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  Label,
  CustomResetBtn,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const USCustomarySystemBfc = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    neck: '',
    neck_unit: '',
    hip: '',
    hip_unit: '',
    waist: '',
    waist_unit: '',
    abdomen: '',
    gender: '',
  })
  const [Result, setResult] = React.useState({
    bfc: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.usCustomarySystemBfc} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            height_unit,
            neck,
            neck_unit,
            hip,
            hip_unit,
            waist,
            waist_unit,
            abdomen,
            gender,
          }, { setSubmitting }) => {
            const payload: USCustomarySystemBfcI = {
              height,
              height_unit,
              neck,
              neck_unit,
              hip,
              hip_unit,
              waist,
              waist_unit,
              abdomen,
              gender,
              method: 'USCustomarySystemBFP'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: usCustomarySystemBFC } = await calculateOthers(payload)
              console.log('=====>', usCustomarySystemBFC)
              if (typeof usCustomarySystemBFC === 'object') {
                const { bfc } = usCustomarySystemBFC
                setResult({
                  bfc: bfc,
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

              <div className="form-row">
                <Label title={LABELS.neck} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="neck"
                  placeholder={PLACEHOLDERS.number}
                  value={values.neck}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="neck_unit"
                  measurement="length"
                  value={values.neck_unit}
                  onChange={handleChange('neck_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.hip} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="hip"
                  placeholder={PLACEHOLDERS.number}
                  value={values.hip}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="hip_unit"
                  measurement="length"
                  value={values.hip_unit}
                  onChange={handleChange('hip_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.waist} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="waist"
                  placeholder={PLACEHOLDERS.number}
                  value={values.waist}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="waist_unit"
                  measurement="length"
                  value={values.waist_unit}
                  onChange={handleChange('waist_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.abdomen} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="abdomen"
                  placeholder={PLACEHOLDERS.number}
                  value={values.abdomen}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.gender} />
                <CustomSelect
                  id="gender"
                  measurement="gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
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
      <ResultTabsContainer tabTitle2={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">
            BFC: {Result.bfc}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default USCustomarySystemBfc
