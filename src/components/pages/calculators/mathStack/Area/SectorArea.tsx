import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { SectorAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  ResultTabsContainer,
  FormTabsContainer
} from '../../../../custom'

const SectorArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    angle: "",
    angle_unit: "",
  })
  const [Result, setResult] = React.useState({
    area: 0,
    radiusUnits: 0,
    angleUnit: 0,
    submittedradius: '',
    submitted_angle: '',
  })

  const [resultTwo, setResultTwo] = React.useState({

  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sectorArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            angle,
            angle_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: SectorAreaI = {
              radius,
              radius_unit,
              angle,
              angle_unit,
              method: 'sectorArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: sectorArea } = await calculateMath(payload)
              console.log('=====>', sectorArea)
              const { area, unitType, radiusUnits, angleUnit, submittedradius, submitted_angle
              } = sectorArea
              if (typeof sectorArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  area: area,
                  radiusUnits: radiusUnits,
                  angleUnit: angleUnit,
                  submitted_angle: submitted_angle,
                  submittedradius: submittedradius,

                })
              }
              if (typeof sectorArea === 'object' && unitType === true) {
                setSelectedResult(unitType)

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

              <div className="form-row">
                <Label title={LABELS.angle} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="angle"
                  placeholder={PLACEHOLDERS.number}
                  value={values.angle}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="angle_unit"
                  measurement="angle"
                  value={values.angle_unit}
                  onChange={handleChange('angle_unit')}
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
        {/* <div className="text-center mb-3">
              <Typography variant="subtitle1"> Area: {Result.area}</Typography>
              <Typography variant="subtitle1"> Radius: {Result.radius}</Typography>
              <Typography variant="subtitle1"> Angle: {Result.angle}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
            </div> */}
      </ResultTabsContainer>


    </>
  )
}

export default SectorArea
