import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring } from 'react-spring'

import { ParallelogramAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { parallelogram } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  AREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS,
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  ResultTabsContainer,
  FormTabsContainer,
  PlaceHolder,
  Image,
} from '../../../../../custom'

const ParallelogramArea = () => {
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
  const [parallelogramInitialValues] = React.useState({
    breadth: '',
    breadth_unit: '',
    height: '',
    height_unit: ''
  })
  const [parallelogramResult, setParallelogramResult] = React.useState({
    area: 0,
    breadth: 0,
    height: 0,
    unit: ''
  })

  const [parallelogramResultTwo, setParallelogramResultTwo] = React.useState({
    areaInbreadthUnit: 0,
    areaInheightUnit: 0,
    breadthInheightUnit: 0,
    $heightInbreadthUnit: 0,
    submittedbreadth: 0,
    submitted_height: 0,
    unit: ''
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.parallelogramArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.parallelogramArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={AREA_CALCULATORS}
      >
        <Image path={parallelogram} />
        <Formik
          initialValues={parallelogramInitialValues}
          onSubmit={async ({
            breadth,
            breadth_unit,
            height,
            height_unit
          }, { setSubmitting, resetForm }) => {
            const payload: ParallelogramAreaI = {
              breadth,
              breadth_unit,
              height,
              height_unit,
              method: 'parallelogramArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: parallelogramArea } = await calculateMath(payload)
              console.log('=====>', parallelogramArea)
              const {
                area,
                unit,
                submittedbreadth,
                submitted_height,
                unitType,
                areaInbreadthUnit,
                areaInheightUnit,
                breadthInheightUnit,
                $heightInbreadthUnit,

              } = parallelogramArea
              if (typeof parallelogramArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setParallelogramResult({
                  area: area,
                  breadth: submittedbreadth,
                  height: submitted_height,
                  unit: unit
                })
              }

              if (typeof parallelogramArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setParallelogramResultTwo({
                  areaInbreadthUnit: areaInbreadthUnit,
                  areaInheightUnit: areaInheightUnit,
                  breadthInheightUnit: breadthInheightUnit,
                  $heightInbreadthUnit: $heightInbreadthUnit,
                  submitted_height: submitted_height,
                  submittedbreadth: submittedbreadth,
                  unit: unit
                })
              }
              if (success === true) {
                setAnswer(success)
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
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
                <Label title={LABELS.breadth} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
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
              </FormRow>

              <FormRow>
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
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer
          tabTitle={"Result"}
          latex={LATEX.parallelogramArea}
          animation={resultAnimation}
        >

          {selectedResult === true &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {parallelogramResult.area}{parallelogramResult.unit}<sup>2</sup>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {parallelogramResultTwo.areaInbreadthUnit}{parallelogramResultTwo.unit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                = {parallelogramResultTwo.areaInheightUnit}{parallelogramResultTwo.unit}<sup>2</sup>
              </Typography>
            </div>
          }

        </ResultTabsContainer>
      }
    </>
  )
}

export default ParallelogramArea
