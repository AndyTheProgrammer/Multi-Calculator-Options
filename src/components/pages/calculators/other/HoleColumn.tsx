import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { HoleColumnI } from '../../../../types'
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

const HoleColumn = () => {
  const [initialFormValues] = React.useState({
    diameter: "",
    diameter_unit: "",
    height: "",
    height_unit: "",
    quantity: ""
  })
  const [Result, setResult] = React.useState({
    holeColumn: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.holeColumn} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            diameter,
            diameter_unit,
            height,
            height_unit,
            quantity,
          }, { setSubmitting }) => {
            const payload: HoleColumnI = {
              diameter,
              diameter_unit,
              height,
              height_unit,
              quantity,
              method: 'holeColumnOrRoundFootings'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: trapSpeedMethod } = await calculateOthers(payload)
              console.log('=====>', trapSpeedMethod)
              const { holeColumn, unit,
              } = trapSpeedMethod
              if (typeof trapSpeedMethod === 'object') {
                setResult({
                  holeColumn: holeColumn,
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
                <Label title={LABELS.quantity} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="quantity"
                  placeholder={PLACEHOLDERS.number}
                  value={values.quantity}
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Hole Column: {Result.holeColumn}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default HoleColumn
