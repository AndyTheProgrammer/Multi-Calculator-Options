import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { TubeVolumeCalculatorI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX
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

const TubeVolume = (props: any) => {
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
    outer_diameter: "",
    outer_diameter_unit: "",
    inner_diameter: "",
    inner_diameter_unit: "",
    length: "",
    length_unit: "",
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
        tabTitle1={CALCULATORS.tubeVol}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            outer_diameter,
            outer_diameter_unit,
            inner_diameter,
            inner_diameter_unit,
            length,
            length_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: TubeVolumeCalculatorI = {
              outer_diameter,
              outer_diameter_unit,
              inner_diameter,
              inner_diameter_unit,
              length,
              length_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: tubeVolume } = await calculateMath(payload)
              console.log('=====>', tubeVolume)
              const { volume, units, unitType, volumem, volumein } = tubeVolume
              if (typeof tubeVolume === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  volume: volume,
                  units: units
                })
              }
              if (typeof tubeVolume === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  volumeInm: volumem,
                  volumeInin: volumein,
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
                <Label title={LABELS.outerDiameter} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="outer_diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.outer_diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="outer_diameter_unit"
                  measurement="length"
                  value={values.outer_diameter_unit}
                  onChange={handleChange('outer_diameter_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.innerDiameter} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="inner_diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.inner_diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="inner_diameter_unit"
                  measurement="length"
                  value={values.inner_diameter_unit}
                  onChange={handleChange('inner_diameter_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.length} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="length"
                  placeholder={PLACEHOLDERS.number}
                  value={values.length}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="length_unit"
                  measurement="length"
                  value={values.length_unit}
                  onChange={handleChange('length_unit')}
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
          latex={LATEX.tubeVolume}
        >
          <div>
            {selectedResult === true &&
              <div className="text-center mb-3">
                <Typography variant="subtitle1">
                  Volume = {Result.volume}{Result.units}<sup>3</sup>
                </Typography>
              </div>
            }
            {selectedResult === false &&
              <div className="text-center mb-3">
                <Typography variant="subtitle1"> Volume = {resultTwo.volumeInm}</Typography>
                <Typography variant="subtitle1">or</Typography>

                <Typography variant="subtitle1"> = {resultTwo.volumeInin}</Typography>
              </div>
            }
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default TubeVolume
