import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { CircularSlabI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
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

const CircularSlab = (props: any) => {
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
    length: "",
    length_unit: "",
    outer_diameter: "",
    outer_diameter_unit: "",
    inner_diameter: "",
    inner_diameter_unit: "",
    quantity: ""
  })
  const [Result, setResult] = React.useState({
    volume1: 0,
    volume2: 0,
    volume3: 0,
    unit1: '',
    unit2: '',
    unit3: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.circularSlab}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            length,
            length_unit,
            outer_diameter,
            outer_diameter_unit,
            inner_diameter,
            inner_diameter_unit,
            quantity,
          }, { setSubmitting }) => {
            const payload: CircularSlabI = {
              length,
              length_unit,
              outer_diameter,
              outer_diameter_unit,
              inner_diameter,
              inner_diameter_unit,
              quantity,
              method: 'CircularSlabOrTubeConcreteCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: circularSlabOrTubeConcrete } = await calculateOthers(payload)
              console.log('=====>', circularSlabOrTubeConcrete)
              const {
                volumeInOuterDiameterUnit,
                volumeInInnerDiameterUnit,
                volumeInLengthUnit,
                outerDiameterUnit,
                innerDiameterUnit,
                lengthUnit
              } = circularSlabOrTubeConcrete
              if (typeof circularSlabOrTubeConcrete === 'object') {
                setResult({
                  volume1: volumeInOuterDiameterUnit,
                  volume2: volumeInInnerDiameterUnit,
                  volume3: volumeInLengthUnit,
                  unit1: outerDiameterUnit,
                  unit2: innerDiameterUnit,
                  unit3: lengthUnit,
                })
              }
              /*  if (typeof circularSlabOrTubeConcrete === 'object') {
                 setResult({
                   volume1: volume1,
                   volume2: volume2,
                   volume3: volume3,
                   unit1: unit1,
                   unit2: unit2,
                   unit3: unit3,
                 })
               } */
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
                <Label title={LABELS.quantity} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="quantity"
                  placeholder={PLACEHOLDERS.number}
                  value={values.quantity}
                  onChange={handleChange}
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
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
          <div className="mb-3 text-center">
            <Typography variant="subtitle1"> Volume: {Result.volume1}{Result.unit1}</Typography>
            <Typography variant="subtitle1"> or {Result.volume2}{Result.unit2}</Typography>
            <Typography variant="subtitle1"> or {Result.volume3}{Result.unit3}</Typography>
          </div>
        </ResultTabsContainer>
      }

    </>
  )
}

export default CircularSlab
