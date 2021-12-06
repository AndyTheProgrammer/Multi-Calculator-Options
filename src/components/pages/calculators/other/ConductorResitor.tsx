import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ConductorResitorI } from '../../../../types'
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
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const ConductorResitor = () => {
  const [initialFormValues] = React.useState({
    length: "",
    length_unit: "",
    diameter: "",
    diameter_unit: "",
    conductivity: ""
  })
  const [Result, setResult] = React.useState({
    resistance: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.conductorResitor} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            length,
            length_unit,
            diameter,
            diameter_unit,
            conductivity,
          }, { setSubmitting, resetForm }) => {
            const payload: ConductorResitorI = {
              length,
              length_unit,
              diameter,
              diameter_unit,
              conductivity,
              method: 'ResistanceOfAConductor'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: resistanceOfAConductor } = await calculateOthers(payload)
              console.log('=====>', resistanceOfAConductor)
              const { resistance, unit,
              } = resistanceOfAConductor
              if (typeof resistanceOfAConductor === 'object') {
                setResult({
                  resistance: resistance,
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
                <Label title={LABELS.diameter} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="diameter_unit"
                  measurement="length"
                  value={values.diameter_unit}
                  onChange={handleChange('diameter_unit')}
                />
              </div>


              <div className="form-row">
                <Label title={LABELS.conductivity} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="conductivity"
                  placeholder={PLACEHOLDERS.number}
                  value={values.conductivity}
                  onChange={handleChange}
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
          <Typography variant="subtitle1"> Resistance: {Result.resistance}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default ConductorResitor
