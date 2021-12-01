import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { SquarePyramidSurfaceAreaI } from '../../../../types'
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

const SquarePyramidSurfaceArea = () => {
  const [initialFormValues] = React.useState({
    base_edge: '',
    base_edge_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    base_edge: 0,
    height: 0,
    unit: '',
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.squarePyramidSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          base_edge,
          base_edge_unit,
          height,
          height_unit
        }, { setSubmitting, resetForm }) => {
          const payload: SquarePyramidSurfaceAreaI = {
            base_edge,
            base_edge_unit,
            height,
            height_unit,
            method: 'SquarePyramidSurfaceArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: SquarePyramidSurfaceArea } = await calculateMath(payload)
            console.log('=====>', SquarePyramidSurfaceArea)
            const { surfaceArea, base_edge, height, unit
            } = SquarePyramidSurfaceArea
            if (typeof SquarePyramidSurfaceArea === 'object') {
              setResult({
                surfaceArea: surfaceArea,
                base_edge: base_edge,
                height: height,
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
              <Label title={LABELS.baseEdge} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="base_edge"
                placeholder={PLACEHOLDERS.number}
                value={values.base_edge}
                onChange={handleChange}
              />

              <CustomSelect
                id="base_edge_unit"
                value={values.base_edge_unit}
                onChange={handleChange('base_edge_unit')}
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
                value={values.height_unit}
                onChange={handleChange('height_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">Surface Area: {Result.surfaceArea}</Typography>
              <Typography variant="subtitle1"> Base Edge: {Result.base_edge}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default SquarePyramidSurfaceArea
