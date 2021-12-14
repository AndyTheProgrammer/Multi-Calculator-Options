import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { ConicalFrustrumSurfaceAreaI } from '../../../../../types'
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

const ConicalFrustrumSurfaceArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    top_radius: '',
    top_radius_unit: '',
    bottom_radius: '',
    bottom_radius_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    totalSurfaceArea: 0,
    lateralSurfaceArea: 0,
    circularEndSurfaceArea: 0,
    r: '',
    R: '',
    h: '',
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    circularEndSurfaceAreaInm: 0,
    lateralSurfaceAreaInm: 0,
    totalSurfaceAreaInm: 0,
    top_radiusInm: 0,
    bottom_radiusInm: 0,
    heightInm: 0,
    circularEndSurfaceAreaInin: 0,
    lateralSurfaceAreaInin: 0,
    totalSurfaceAreaInin: 0,
    top_radiusInin: 0,
    bottom_radiusInin: 0,
    heightInin: 0

  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.conicalFrustrumSurfArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            top_radius,
            top_radius_unit,
            bottom_radius,
            bottom_radius_unit,
            height,
            height_unit,
          }, { setSubmitting }) => {
            const payload: ConicalFrustrumSurfaceAreaI = {
              top_radius,
              top_radius_unit,
              bottom_radius,
              bottom_radius_unit,
              height,
              height_unit,
              method: 'ConicalFrustumSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: ConicalFrustumSurfaceArea } = await calculateMath(payload)
              console.log('=====>', ConicalFrustumSurfaceArea)
              const {
                totalSurfaceArea,
                lateralSurfaceArea,
                circularEndSurfaceArea,
                r,
                R,
                h,
                height,
                units,
                unitType,
                circularEndSurfaceAreaInm,
                lateralSurfaceAreaInm,
                totalSurfaceAreaInm,
                top_radiusInm,
                bottom_radiusInm,
                heightInm,
                circularEndSurfaceAreaInin,
                lateralSurfaceAreaInin,
                totalSurfaceAreaInin,
                top_radiusInin,
                bottom_radiusInin,
                heightInin,
              } = ConicalFrustumSurfaceArea
              if (typeof ConicalFrustumSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  totalSurfaceArea,
                  lateralSurfaceArea,
                  circularEndSurfaceArea,
                  r,
                  R,
                  h,
                  units
                })
              }

              if (typeof ConicalFrustumSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  circularEndSurfaceAreaInm,
                  lateralSurfaceAreaInm,
                  totalSurfaceAreaInm,
                  top_radiusInm,
                  bottom_radiusInm,
                  heightInm,
                  circularEndSurfaceAreaInin,
                  lateralSurfaceAreaInin,
                  totalSurfaceAreaInin,
                  top_radiusInin,
                  bottom_radiusInin,
                  heightInin,
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
                <Label title={LABELS.topRadius} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="top_radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.top_radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="top_radius_unit"
                  measurement="length"
                  value={values.top_radius_unit}
                  onChange={handleChange('top_radius_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.bottomRadius} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="bottom_radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.bottom_radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="bottom_radius_unit"
                  measurement="length"
                  value={values.bottom_radius_unit}
                  onChange={handleChange('bottom_radius_unit')}
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
      {selectedResult ? (<ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">lateralSurfaceArea: {Result.lateralSurfaceArea}</Typography>
          <Typography variant="subtitle1"> circularEndSurfaceArea: {Result.circularEndSurfaceArea}</Typography>
          <Typography variant="subtitle1"> totalSurfaceArea: {Result.totalSurfaceArea}</Typography>
          <Typography variant="subtitle1"> R: {Result.R}</Typography>
          <Typography variant="subtitle1"> h: {Result.h}</Typography>
          <Typography variant="subtitle1"> r: {Result.r}</Typography>
        </div>
      </ResultTabsContainer>) : (
        <ResultTabsContainer tabTitle1={'Result'} sm={6}>
          <div className="text-center mb-3">
            <Typography variant="subtitle1">circularEndSurfaceAreaInin: {resultTwo.circularEndSurfaceAreaInin}</Typography>
            <Typography variant="subtitle1"> circularEndSurfaceAreaInm: {resultTwo.circularEndSurfaceAreaInm}</Typography>
            <Typography variant="subtitle1"> heightInin: {resultTwo.heightInin}</Typography>
            <Typography variant="subtitle1"> heightInm: {resultTwo.heightInm}</Typography>
            <Typography variant="subtitle1"> lateralSurfaceAreaInin: {resultTwo.lateralSurfaceAreaInin}</Typography>
            <Typography variant="subtitle1"> lateralSurfaceAreaInm: {resultTwo.lateralSurfaceAreaInm}</Typography>
            <Typography variant="subtitle1"> lateralSurfaceAreaInm: {resultTwo.top_radiusInin}</Typography>
            <Typography variant="subtitle1"> lateralSurfaceAreaInm: {resultTwo.top_radiusInm}</Typography>
            <Typography variant="subtitle1"> lateralSurfaceAreaInm: {resultTwo.totalSurfaceAreaInin}</Typography>
            <Typography variant="subtitle1"> lateralSurfaceAreaInm: {resultTwo.totalSurfaceAreaInm}</Typography>


          </div>
        </ResultTabsContainer>
      )}



    </>
  )
}

export default ConicalFrustrumSurfaceArea
