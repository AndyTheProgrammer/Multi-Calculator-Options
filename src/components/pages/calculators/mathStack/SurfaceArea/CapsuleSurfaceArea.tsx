import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { CapsuleSurfaceAreaI } from '../../../../../types'
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

const CapsuleSurfaceArea = (props: any) => {
  const { openDrop } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false);
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true);
  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: '',
    height: "",
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    submittedradius: 0,
    submitted_height: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    surfaceAreaInradiusUnit: 0,
    surfaceAreaInheightUnit: 0,
    radiusInheightUnit: 0,
    $heightInradiusUnit: 0,
    submittedradius: '',
    submitted_height: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.capsuleSurfArea}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit
          }, { setSubmitting }) => {
            const payload: CapsuleSurfaceAreaI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'CapsuleSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: CapsuleSurfaceArea } = await calculateMath(payload)
              console.log('=====>', CapsuleSurfaceArea)
              const {
                surfaceArea,
                submittedradius,
                submitted_height,
                units,
                unitType,
                surfaceAreaInradiusUnit,
                surfaceAreaInheightUnit,
                radiusInheightUnit,
                $heightInradiusUnit,
              } = CapsuleSurfaceArea
              if (typeof CapsuleSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  surfaceArea: surfaceArea,
                  submittedradius: submittedradius,
                  submitted_height: submitted_height,
                  units: units,
                })
              }

              if (typeof CapsuleSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  surfaceAreaInheightUnit: surfaceAreaInheightUnit,
                  surfaceAreaInradiusUnit: surfaceAreaInradiusUnit,
                  radiusInheightUnit: radiusInheightUnit,
                  $heightInradiusUnit: $heightInradiusUnit,
                  submitted_height: submitted_height,
                  submittedradius: submittedradius
                })
              }
              if (success === true) {
                setAnswer(success)
              }
              if (success === true) {
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)', alignItems: 'center', justifyContent: 'flex-start',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)', alignItems: 'center', justifyContent: 'flex-end',
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
                <Label title={LABELS.baseRadius} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
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
          latex={LATEX.capsuleSurfArea}
          animation={resultAnimation}
        >

          <div className='text-center'>
            {selectedResult ? (
              <div className="text-wrap">
                <Typography variant="subtitle1">
                  SA = {Result.surfaceArea}{Result.units}<sup>2</sup>
                </Typography>
              </div>
            ) : (
              <div className="text-wrap">
                <Typography variant="subtitle1">
                  SA = {resultTwo.surfaceAreaInradiusUnit}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle2">or</Typography>
                <Typography variant="subtitle1">
                  SA = {resultTwo.surfaceAreaInheightUnit}<sup>2</sup>
                </Typography>
              </div>
            )}
          </div>
        </ResultTabsContainer>
      }

    </>
  )
}

export default CapsuleSurfaceArea
