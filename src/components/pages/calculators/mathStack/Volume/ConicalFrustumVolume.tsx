import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  }));
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
        animation={formAnimation}
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
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
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
                  type={INPUT_TYPE.text}
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
                  type={INPUT_TYPE.text}
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
                  type={INPUT_TYPE.text}
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

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer
          tabTitle={'Result'}
          animation={resultAnimation}
          latex={LATEX.conicalFrustrumVolume}
        >
          <div className="text-center">
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
        </ResultTabsContainer>
      }
    </>
  )
}

export default ConicalFrustumVolume
