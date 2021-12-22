import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { EllipsoidVolumeCalculatorI } from '../../../../../types'
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

const EllipsoidVolume = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    axis1: "",
    axis1_unit: "",
    axis2: "",
    axis2_unit: "",
    axis3: "",
    axis3_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    units: '',
  })
  const [resultTwo, setResultTwo] = React.useState({
    volumem: 0,
    volumein: 0,
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ellipsoidVol}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            axis1,
            axis1_unit,
            axis2,
            axis2_unit,
            axis3,
            axis3_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: EllipsoidVolumeCalculatorI = {
              axis1,
              axis1_unit,
              axis2,
              axis2_unit,
              axis3,
              axis3_unit,
              method: 'EllipsoidVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: ellipsoidVolume } = await calculateMath(payload)
              console.log('=====>', ellipsoidVolume)
              const {
                volume,
                units,
                unitType,
                volumein,
                volumem,
              } = ellipsoidVolume

              if (typeof ellipsoidVolume === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  volume: volume,
                  units: units
                })
              }
              if (typeof ellipsoidVolume === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  volumein: volumein,
                  volumem: volumem
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
                <Label title={LABELS.axis1} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="axis1"
                  placeholder={PLACEHOLDERS.number}
                  value={values.axis1}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="axis1_unit"
                  measurement="length"
                  value={values.axis1_unit}
                  onChange={handleChange('axis1_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.axis2} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="axis2"
                  placeholder={PLACEHOLDERS.number}
                  value={values.axis2}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="axis2_unit"
                  measurement="length"
                  value={values.axis2_unit}
                  onChange={handleChange('axis2_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.axis3} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="axis3"
                  placeholder={PLACEHOLDERS.number}
                  value={values.axis3}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="axis3_unit"
                  measurement="length"
                  value={values.axis3_unit}
                  onChange={handleChange('axis3_unit')}
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
      <ResultTabsContainer tabTitle={'Result'} sm={6} latex={LATEX.ellipsoidVolume}>
        {selectedResult === true &&
          <div className="text-wrap">
            <Typography variant="subtitle1">
              Volume = {Result.volume}{Result.units}<sup>3</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap">
            <Typography variant="subtitle1"> Volume = {resultTwo.volumein}</Typography>
            <Typography variant="subtitle2"> or</Typography>
            <Typography variant="subtitle1"> = {resultTwo.volumein}</Typography>
          </div>
        }
      </ResultTabsContainer>


    </>
  )
}

export default EllipsoidVolume
