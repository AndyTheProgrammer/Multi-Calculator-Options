import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { SquarePyramidSurfaceAreaI } from '../../../../../types'
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

const SquarePyramidSurfaceArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    base_edge: '',
    base_edge_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    baseSurfaceArea: 0,
    lateralSurfaceArea: 0,
    totalSurfaceArea: 0,
    unit: '',
  })
  const [resultTwo, setResultTwo] = React.useState({
    areaInBaseUnit: 0,
    areaInHeightUnit: 0,
    unit: '',
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.squarePyramidSurfArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
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
              const { success, payload: SquarePyramidSurfaceArea } = await calculateMath(payload)
              console.log('=====>', SquarePyramidSurfaceArea)
              const {
                units,
                unitType,
                baseSurfaceArea,
                lateralSurfaceArea,
                totalSurfaceArea,
                areaInbaseUnit,
                areaInheightUnit,
              } = SquarePyramidSurfaceArea
              if (typeof SquarePyramidSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  baseSurfaceArea: baseSurfaceArea,
                  lateralSurfaceArea: lateralSurfaceArea,
                  totalSurfaceArea: totalSurfaceArea,
                  unit: units
                })
              }
              if (typeof SquarePyramidSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  areaInBaseUnit: areaInbaseUnit,
                  areaInHeightUnit: areaInheightUnit,
                  unit: units,
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
                  measurement="length"
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
        {selectedResult === true &&
          <div className="text-wrap">
            <Latex >{LATEX.squarePyramidSurfArea_base}</Latex>
            <Latex >{LATEX.squarePyramidSurfArea_lateral}</Latex>
            <Latex >{LATEX.squarePyramidSurfArea_total}</Latex>

            <Typography variant="subtitle1">
              Base SA = {Result.baseSurfaceArea}{Result.unit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              Lateral SA = {Result.lateralSurfaceArea}{Result.unit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              Total SA = {Result.totalSurfaceArea}{Result.unit}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap">
            <Latex >{LATEX.squarePyramidSurfArea_base}</Latex>
            <Latex >{LATEX.squarePyramidSurfArea_lateral}</Latex>
            <Latex >{LATEX.squarePyramidSurfArea_total}</Latex>

            <Typography variant="subtitle1">
              SA = {resultTwo.areaInBaseUnit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle2">
              or
            </Typography>
            <Typography variant="subtitle1">
              = {resultTwo.areaInHeightUnit}<sup>2</sup>
            </Typography>
          </div>
        }
      </ResultTabsContainer>
    </>
  )
}

export default SquarePyramidSurfaceArea
