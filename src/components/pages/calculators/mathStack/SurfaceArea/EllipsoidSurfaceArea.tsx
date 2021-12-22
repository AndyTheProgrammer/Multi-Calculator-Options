import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { EllipsoidSurfaceAreaI } from '../../../../../types'
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


const EllipsoidSurfaceArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    axis1: '',
    axis1_unit: '',
    axis2: '',
    axis2_unit: '',
    axis3: '',
    axis3_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    axis1: 0,
    axis2: 0,
    axis3: 0,
    unit: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    surfaceAreaInm: 0,
    surfaceAreaInin: 0
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ellipsoidSurfArea}
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
            axis3_unit
          }, { setSubmitting }) => {
            const payload: EllipsoidSurfaceAreaI = {
              axis1,
              axis1_unit,
              axis2,
              axis2_unit,
              axis3,
              axis3_unit,
              method: 'EllipsoidSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: EllipsoidSurfaceArea } = await calculateMath(payload)
              console.log('=====>', EllipsoidSurfaceArea)
              const {
                surfaceArea,
                axis1,
                axis2,
                axis3,
                unit,
                unitType,
                surfaceAreaInm,
                surfaceAreaInin
              } = EllipsoidSurfaceArea
              if (typeof EllipsoidSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  surfaceArea: surfaceArea,
                  axis1: axis1,
                  axis2: axis2,
                  axis3: axis3,
                  unit: unit
                })
              }
              if (typeof EllipsoidSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  surfaceAreaInm: surfaceAreaInm,
                  surfaceAreaInin: surfaceAreaInin,
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
      <ResultTabsContainer
        tabTitle={'Result'}
        sm={6}
        latex={LATEX.ellipsoidSurfArea}
      >
        {selectedResult === true &&
          < div className="text-wrap">3
            <Typography variant="subtitle1">
              Surface Area: {Result.surfaceArea}{Result.unit}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          < div className="text-wrap">3
            <Typography variant="subtitle1">Surface Area = {Result.surfaceArea}</Typography>
            <Typography variant="subtitle2">or</Typography>
            <Typography variant="subtitle1"> = {Result.surfaceArea}</Typography>
          </div>
        }
      </ResultTabsContainer >



    </>
  )
}

export default EllipsoidSurfaceArea
