import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { StairsConcreateI } from '../../../../../../types'
import { calculateOthers } from '../../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  CONCRETE_CALCULATORS,
  HOUSING_OR_BUILDINGS_PLACEHOLDERS
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
} from '../../../../../custom'

const StairsConcreate = (props: any) => {
  const { openDrop } = props
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    run: '',
    run_unit: '',
    rise: '',
    rise_unit: '',
    width: '',
    width_unit: '',
    platform_depth: '',
    platform_depth_unit: '',
    steps: '',
  })
  const [Result, setResult] = React.useState({
    concreteNeeded: 0,
    unit: ''
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={HOUSING_OR_BUILDINGS_PLACEHOLDERS.stairsConcrete}
      />

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.stairsConcrete}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={CONCRETE_CALCULATORS}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            run,
            run_unit,
            rise,
            rise_unit,
            width,
            width_unit,
            platform_depth,
            platform_depth_unit,
            steps,
          }, { setSubmitting }) => {
            const payload: StairsConcreateI = {
              run,
              run_unit,
              rise,
              rise_unit,
              width,
              width_unit,
              platform_depth,
              platform_depth_unit,
              steps,
              method: 'StairsConcreteCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: stairsConcreteMethod } = await calculateOthers(payload)
              console.log('=====>', stairsConcreteMethod)
              const { concreteNeeded, unit, run, rise, width, platform_depth, steps
              } = stairsConcreteMethod
              if (typeof stairsConcreteMethod === 'object') {
                setResult({
                  concreteNeeded: concreteNeeded,
                  unit: unit
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
              <FormRow>
                <Label title={LABELS.run} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="run"
                  placeholder={PLACEHOLDERS.number}
                  value={values.run}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="run_unit"
                  measurement="length"
                  value={values.run_unit}
                  onChange={handleChange('run_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.rise} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="rise"
                  placeholder={PLACEHOLDERS.number}
                  value={values.rise}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="rise_unit"
                  measurement="length"
                  value={values.rise_unit}
                  onChange={handleChange('rise_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.width} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="width"
                  placeholder={PLACEHOLDERS.number}
                  value={values.width}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="width_unit"
                  measurement="length"
                  value={values.width_unit}
                  onChange={handleChange('width_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.platformDepth} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="platform_depth"
                  placeholder={PLACEHOLDERS.number}
                  value={values.platform_depth}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="platform_depth_unit"
                  measurement="length"
                  value={values.platform_depth_unit}
                  onChange={handleChange('platform_depth_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.steps} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="steps"
                  placeholder={PLACEHOLDERS.number}
                  value={values.steps}
                  onChange={handleChange}
                />
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
          <div className="mb-3 text-center">
            <Typography variant="subtitle1">
              Amount of concrete needed: {Result.concreteNeeded}{Result.unit}
            </Typography>
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default StairsConcreate
