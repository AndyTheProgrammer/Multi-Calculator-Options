// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { SurfaceAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { circle } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  SURFACEAREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS,
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  FieldContainer,
  PlaceHolder,
  Image,
} from '../../../../../custom'

const BallSurfaceArea = (props: any) => {
  const { openDrop } = props
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
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    area: 0,
    unit: '',
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.ballSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ballSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={circle} />
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit
          }, { setSubmitting }) => {
            const payload: SurfaceAreaI = {
              radius,
              radius_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: ballSurfaceArea } = await calculateMath(payload)
              console.log('=====>', ballSurfaceArea)
              if (typeof ballSurfaceArea === 'object') {
                const { surfaceArea, area, unit } = ballSurfaceArea
                console.log(ballSurfaceArea)
                setResult({
                  surfaceArea: surfaceArea,
                  area: area,
                  unit: unit
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
              <FieldContainer>
                <FormRow>
                  <Label title={LABELS.radius} />
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
                </FormRow>
              </FieldContainer>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer
          tabTitle={'Result'}
          latex={LATEX.ballSurfArea}
          animation={resultAnimation}
        >

          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {Result.surfaceArea}{Result.unit}<sup>2</sup>
            </Typography>
          </div>

        </ResultTabsContainer>
      }
    </>
  )
}

export default BallSurfaceArea
