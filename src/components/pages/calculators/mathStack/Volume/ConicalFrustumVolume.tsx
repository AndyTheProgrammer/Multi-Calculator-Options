import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ConicalFrustumVolumeI } from '../../../../../types'
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

const ConicalFrustumVolume = (props: any) => {
  const { openDrop } = props
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    top_radius: "",
    top_radius_unit: "",
    bottom_radius: "",
    bottom_radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    units: ''
  })
  const [resultTwo, setResultTwo] = React.useState({
    volumeInm: 0,
    volumeInin: 0,
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.conicalFrustrumVol}
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
          }, { setSubmitting, resetForm }) => {
            const payload: ConicalFrustumVolumeI = {
              top_radius,
              top_radius_unit,
              bottom_radius,
              bottom_radius_unit,
              height,
              height_unit,
              method: 'ConicalFrustumVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: conicalFrustrumVolume } = await calculateMath(payload)
              console.log('=====>', conicalFrustrumVolume)
              const { volume, units, volumeInm, volumeInin, unitType } = conicalFrustrumVolume

              if (typeof conicalFrustrumVolume === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  volume: volume,
                  units: units
                })
              }
              if (typeof conicalFrustrumVolume === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  volumeInm: volumeInm,
                  volumeInin: volumeInin
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
      <ResultTabsContainer tabTitle={'Result'} sm={6} latex={LATEX.conicalFrustrumVolume}>
        {answer === true &&
          <div>
            {selectedResult === true &&
              <div className="text-wrap">
                <Typography variant="subtitle1">
                  Volume = {Result.volume}{Result.units}<sup>3</sup>
                </Typography>
              </div>
            }
            {selectedResult === false &&
              <div className="text-wrap">
                <Typography variant="subtitle1"> Volume = {resultTwo.volumeInm}</Typography>
                <Typography variant="subtitle2"> or</Typography>
                <Typography variant="subtitle1"> = {resultTwo.volumeInin}</Typography>
              </div>
            }
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default ConicalFrustumVolume
