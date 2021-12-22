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

const CubeVolume = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    edge_length: "",
    edge_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    units: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.cubeVol}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
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
              const { volume, unit } = cubeVolume
              if (typeof cubeVolume === 'object') {
                setResult({
                  volume: volume,
                  units: unit
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
      <ResultTabsContainer tabTitle={'Result'} sm={6} latex={LATEX.cubeVolume}>
        <div className="text-wrap">
          <Typography variant="subtitle1">
            Volume = {Result.volume}{Result.units}<sup>3</sup>
          </Typography>
        </div>
      </ResultTabsContainer>



    </ >
  )
}

export default CubeVolume
