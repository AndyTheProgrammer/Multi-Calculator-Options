// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Typography } from '@material-ui/core';
import { Formik } from 'formik';
import { useSpring, animated } from 'react-spring';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { CubeAreaI } from '../../../../../../types';
import { calculateMath } from '../../../../../../services/AppCalculatorsApi';
import { cube } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  SURFACEAREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS,
} from '../../../../../../common/shared';
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
} from '../../../../../custom';
const Latex = require('react-latex');

const CubeSurfArea = () => {
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
    edge_length: '',
    edge_unit: 'mm'
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    area: 0,
    edge_length: '',
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
        placeHolder={GEOMETRY_PLACEHOLDERS.cubeSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.cubeSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={cube} />
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            // eslint-disable-next-line camelcase
            edge_length,
            edge_unit

          }, { setSubmitting }) => {
            const payload: CubeAreaI = {
              edge_length,
              edge_unit,
              method: 'cubeSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: CubeSurfaceArea } = await calculateMath(payload)
              console.log('=====>', CubeSurfaceArea)
              const {
                cubeSurfaceArea,
                unit,
                unitType,
                area
              } = CubeSurfaceArea

              if (typeof CubeSurfaceArea === 'object') {
                setResult({
                  surfaceArea: cubeSurfaceArea,
                  area: area,
                  unit: unit,
                  edge_length,
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
                  <Label title={LABELS.edgeLength} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="edge_length"
                    placeholder={PLACEHOLDERS.number}
                    value={values.edge_length}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="edge_unit"
                    measurement="length"
                    value={values.edge_unit}
                    onChange={handleChange('edge_unit')}
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
          latex={LATEX.cubeSurfArea}
        >
          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$ = 6 * ${Result.edge_length}^{2}$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$ = 6 * ${parseFloat(Result.edge_length) * parseFloat(Result.edge_length)}$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1" className='final-answer'>
            <Latex displayMode={false}>
              {`$ = ${Result.surfaceArea}${Result.unit}^{2} $`}
            </Latex>
          </Typography>

        </ResultTabsContainer>
      }
    </>
  )
}

export default CubeSurfArea
