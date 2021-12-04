import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { InternationalSystemBfcI } from '../../../../types'
import { calculateHealth } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomSelect,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const InternationalSystemBfc = () => {

  const [initialFormValues] = React.useState({
    height: '',
    neck: '',
    gender: '',
    hip: '',
    waist: '',
  })
  const [Result, setResult] = React.useState({
    bfc: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.internationalSystemBfc} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            neck,
            gender,
            hip,
            waist,
          }, { setSubmitting }) => {
            const payload: InternationalSystemBfcI = {
              height,
              neck,
              gender,
              hip,
              waist,
              method: 'InternationalSystemUnitBFP'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: internationalSystemBFC } = await calculateHealth(payload)
              console.log('=====>', internationalSystemBFC)
              if (typeof internationalSystemBFC === 'object') {
                const { bfc } = internationalSystemBFC
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
          <Typography variant="subtitle1">BFC: {Result.bfc}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default InternationalSystemBfc
