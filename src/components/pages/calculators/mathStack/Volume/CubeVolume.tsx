import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { CubeVolumeCalculatorI } from '../../../../../types'
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

const CubeVolume = () => {
  const [initialFormValues] = React.useState({
    edge_length: "",
    edge_unit: "",
  })
  const [Result, setResult] = React.useState({
    Volume: 0,
    edge_length: 0,
    units: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.cubeVol} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            edge_length,
            edge_unit
          }, { setSubmitting, resetForm }) => {
            const payload: CubeVolumeCalculatorI = {
              edge_length,
              edge_unit,
              method: 'CubeVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: cubeVolume } = await calculateMath(payload)
              console.log('=====>', cubeVolume)
              const { volume, units, edge_length
              } = cubeVolume
              if (typeof cubeVolume === 'object') {
                setResult({
                  Volume: volume,
                  edge_length: edge_length,
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
                <Label title={LABELS.edgeLength} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="edge_length"
                  placeholder={PLACEHOLDERS.number}
                  value={values.edge_length}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="edge_unit"
                  measurement="length"
                  value={values.edge_unit}
                  onChange={handleChange('edge_unit')}
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
          <Typography variant="subtitle1"> Volume: {Result.Volume}</Typography>
          <Typography variant="subtitle1"> Edge Length: {Result.edge_length}</Typography>
          <Typography variant="subtitle1"> Units: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>



    </ >
  )
}

export default CubeVolume
