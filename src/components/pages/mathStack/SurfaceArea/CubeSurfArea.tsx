// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { CubeAreaI } from '../../../../types'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
} from '../../../custom'

const CubeSurfArea = () => {
  const [initialFormValues] = React.useState({
    edge_length: '',
    edge_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    edge_length: 0,
    unit: ''
  })
  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.cubeSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          // eslint-disable-next-line camelcase
          edge_length,
          edge_unit

        }, { setSubmitting, resetForm }) => {
          const payload: CubeAreaI = {
            edge_length,
            edge_unit,
            method: 'cubeSurfaceAreaCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: cubeSurfaceArea } = await calculateMath(payload)
            console.log('=====>', cubeSurfaceArea)
            const { surfaceArea, unit, edge_length,
            } = cubeSurfaceArea
            if (typeof cubeSurfaceArea === 'object') {
              setResult({
                surfaceArea: surfaceArea,
                edge_length: edge_length,
                unit: unit
              })
            }
            resetForm()
          } catch (err) {
            console.log('====>', err)
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
                value={values.edge_unit}
                onChange={handleChange('edge_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Surface area: {Result.surfaceArea}</Typography>
              <Typography variant="subtitle1"> Edge length: {Result.edge_length}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>

            </div>

          </form>
        )}
      </Formik>
    </div>
  )
}

export default CubeSurfArea
