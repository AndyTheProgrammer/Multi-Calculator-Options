// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { CubeAreaI } from '../../../../../types'
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

const CubeSurfArea = (props: any) => {
  const { openDrop } = props
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    edge_length: '',
    edge_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    area: 0,
    unit: ''
  })
  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.cubeSurfArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            // eslint-disable-next-line camelcase
            edge_length,
            edge_unit

          }, { setSubmitting }) => {
            const payload: CubeAreaI = {
              edge_length,
              edge_unit,
              method: 'cubeSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: CubeSurfaceArea } = await calculateMath(payload)
              console.log('=====>', CubeSurfaceArea)
              const {
                cubeSurfaceArea,
                unit,
                edge_length,
                unitType,
                area
              } = CubeSurfaceArea

              if (typeof CubeSurfaceArea === 'object') {
                setResult({
                  surfaceArea: cubeSurfaceArea,
                  area: area,
                  unit: unit
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
      <ResultTabsContainer
        tabTitle={'Result'}
        sm={6}
        latex={LATEX.cubeSurfArea}
      >
        {answer === true &&
          <div className="text-wrap">
            <Typography variant="subtitle1">
              SA = {Result.surfaceArea}{Result.unit}<sup>2</sup>
            </Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default CubeSurfArea
