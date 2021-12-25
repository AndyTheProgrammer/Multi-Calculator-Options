import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ConcreteSquareFootingI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const ConcreteSquareFooting = (props: any) => {
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
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    length: "",
    length_unit: "",
    width: "",
    width_unit: "",
    breadth: "",
    breadth_unit: "",
    quantity: ""
  })
  const [Result, setResult] = React.useState({
    volume1: 0,
    volume2: 0,
    volume3: 0,
    length: 0,
    width: 0,
    breadth: 0,
    units: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.concreteSquareFooting}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            length,
            length_unit,
            width,
            width_unit,
            breadth,
            breadth_unit,
            quantity,
          }, { setSubmitting }) => {
            const payload: ConcreteSquareFootingI = {
              length,
              length_unit,
              width,
              width_unit,
              breadth,
              breadth_unit,
              quantity,
              method: 'SlabsSquareFootingsOrWallsConcreteCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: slabsSquareFootingsOrWallsConcreteCalculator } = await calculateOthers(payload)
              console.log('=====>', slabsSquareFootingsOrWallsConcreteCalculator)
              const {
                volumeInm,
                units,
                volumeInin,
                length,
                width,
                breadth
              } = slabsSquareFootingsOrWallsConcreteCalculator
              if (typeof slabsSquareFootingsOrWallsConcreteCalculator === 'object') {
                setResult({
                  volume1: volumeInm,
                  volume2: volumeInin,
                  volume3: volumeInin,
                  length,
                  width,
                  breadth,
                  units,
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
                  type={INPUT_TYPE.number}
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
                <Label title={LABELS.width} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
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
              </div>

              <div className="form-row">
                <Label title={LABELS.breadth} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="breadth"
                  placeholder={PLACEHOLDERS.number}
                  value={values.breadth}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="breadth_unit"
                  measurement="length"
                  value={values.breadth_unit}
                  onChange={handleChange('breadth_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.quantity} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
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
      <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">
            Volume: {Result.volume1}{Result.units}<sup>3</sup>,
          </Typography>

          <Typography variant="subtitle1">
            or
          </Typography>

          <Typography variant="subtitle1">
            Volume: {Result.volume2}{Result.units}<sup>3</sup>
          </Typography>

          <Typography variant="subtitle1">
            or
          </Typography>

          <Typography variant="subtitle1">
            Volume: {Result.volume2}{Result.units}<sup>3</sup>
          </Typography>

          <Typography variant="subtitle1">  Breath: {Result.breadth}</Typography>
          <Typography variant="subtitle1"> length: {Result.length}</Typography>
          <Typography variant="subtitle1"> Width: {Result.width}</Typography>
          <Typography variant="subtitle1"> Units: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default ConcreteSquareFooting
