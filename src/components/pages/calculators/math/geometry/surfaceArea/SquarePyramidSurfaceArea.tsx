import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { SquarePyramidSurfaceAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { square_pyramid } from '../../../../../../common/assets';
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
  PlaceHolder,
  Image,
  FieldContainer,
} from '../../../../../custom'
const Latex = require('react-latex');

const SquarePyramidSurfaceArea = () => {
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
    base: '',
    base_unit: 'mm',
    height: '',
    height_unit: 'mm'
  })
  const [Result, setResult] = React.useState({
    baseSurfaceArea: 0,
    lateralSurfaceArea: 0,
    totalSurfaceArea: 0,
    unit: '',
  })
  const [resultTwo, setResultTwo] = React.useState({
    areaInBaseUnit: 0,
    areaInHeightUnit: 0,
    base: '',
    base_unit: '',
    height: '',
    height_unit: ''
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.squarePyramidSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.squarePyramidSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={square_pyramid} />
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            base,
            base_unit,
            height,
            height_unit
          }, { setSubmitting, resetForm }) => {
            const payload: SquarePyramidSurfaceAreaI = {
              base,
              base_unit,
              height,
              height_unit,
              method: 'SquarePyramidSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: SquarePyramidSurfaceArea } = await calculateMath(payload)
              console.log('=====>', SquarePyramidSurfaceArea)
              const {
                units,
                unitType,
                baseSurfaceArea,
                lateralSurfaceArea,
                totalSurfaceArea,
                areaInbaseUnit,
                areaInheightUnit,
              } = SquarePyramidSurfaceArea
              if (typeof SquarePyramidSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  baseSurfaceArea: baseSurfaceArea,
                  lateralSurfaceArea: lateralSurfaceArea,
                  totalSurfaceArea: totalSurfaceArea,
                  unit: units
                })
              }
              if (typeof SquarePyramidSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  areaInBaseUnit: areaInbaseUnit,
                  areaInHeightUnit: areaInheightUnit,
                  base,
                  base_unit,
                  height,
                  height_unit,
                })
              }
              if (success === true) {
                setAnswer(success)
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
                  <Label title={LABELS.baseEdge} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="base"
                    placeholder={PLACEHOLDERS.number}
                    value={values.base}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="base_unit"
                    measurement="length"
                    value={values.base_unit}
                    onChange={handleChange('base_unit')}
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
          animation={resultAnimation}
        >
          <Typography variant="subtitle1">
            <Latex displayMode={false}>{LATEX.squarePyramidSurfArea_base}</Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>{LATEX.squarePyramidSurfArea_lateral}</Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>{LATEX.squarePyramidSurfArea_total}</Latex>
          </Typography>

          <Typography gutterBottom />

          {selectedResult === true &&
            <div>

              <Typography variant="subtitle1">
                Base SA = {Result.baseSurfaceArea}{Result.unit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                Lateral SA = {Result.lateralSurfaceArea}{Result.unit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                Total SA = {Result.totalSurfaceArea}{Result.unit}<sup>2</sup>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div >
              <Latex >{LATEX.squarePyramidSurfArea_base}</Latex>
              <Latex >{LATEX.squarePyramidSurfArea_lateral}</Latex>
              <Latex >{LATEX.squarePyramidSurfArea_total}</Latex>

              <Typography variant="subtitle1">
                SA = {resultTwo.areaInBaseUnit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle2">
                or
              </Typography>
              <Typography variant="subtitle1">
                = {resultTwo.areaInHeightUnit}<sup>2</sup>
              </Typography>
            </div>
          }

        </ResultTabsContainer>
      }
    </>
  )
}

export default SquarePyramidSurfaceArea
