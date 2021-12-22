import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { SphericalCapSurfaceAreaI } from '../../../../../types'
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

const Latex = require('react-latex');

const SphericalCapSurfaceArea = (props: any) => {
  const { openDrop } = props
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    baseSurfaceArea: 0,
    totalSolidSphereSurfaceArea: 0,
    unit: '',
  })

  const [resultTwo, setResultTwo] = React.useState({
    surfaceAreaInradiusUnit: 0,
    surfaceAreaInheightUnit: 0,
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sphericalCapSurfArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: SphericalCapSurfaceAreaI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'CapSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: CapSurfaceArea } = await calculateMath(payload)
              console.log('=====>', CapSurfaceArea)
              const {
                surfaceArea,
                units,
                surfaceAreaInradiusUnit,
                surfaceAreaInheightUnit,
                radiusInheightUnit,
                $heightInradiusUnit,
                submittedradius,
                submitted_height,
                unitType
              } = CapSurfaceArea
              if (typeof CapSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  surfaceArea: surfaceArea,
                  baseSurfaceArea: surfaceArea,
                  totalSolidSphereSurfaceArea: surfaceArea,
                  unit: units,
                })
              }

              if (typeof CapSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  surfaceAreaInradiusUnit: surfaceAreaInradiusUnit,
                  surfaceAreaInheightUnit: surfaceAreaInheightUnit,
                })
              }
              if (success === true) {
                setAnswer(success)
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
      <ResultTabsContainer
        tabTitle={'Result'}
        sm={6}
      >
        {answer === true &&
          <div>
            {selectedResult ? (
              <div className="text-wrap">
                <Latex displayMode={true}>{LATEX.sphericalCapSurfArea}</Latex>
                <Latex displayMode={true}>{LATEX.sphericalCapSurfArea_base}</Latex>
                <Latex displayMode={true}>{LATEX.sphericalCapSurfArea_totalSolidSphere}</Latex>

                <Typography variant="subtitle1">
                  SA = {Result.surfaceArea}{Result.unit}<sup>2</sup>
                </Typography>
              </div>

            ) : (

              <div className="text-wrap">
                <Typography variant="subtitle1">
                  SA = {resultTwo.surfaceAreaInradiusUnit}
                </Typography>
                <Typography variant="subtitle2">
                  or
                </Typography>
                <Typography variant="subtitle1">
                  = {resultTwo.surfaceAreaInheightUnit}
                </Typography>
              </div>

            )}
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default SphericalCapSurfaceArea
