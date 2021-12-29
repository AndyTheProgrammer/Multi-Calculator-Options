import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { MarginErrorI } from '../../../../types'
import { calculateStatistics } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const MarginOfErrorCalculator = (props: any) => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    confidence_level: '',
    sample_size: '',
    population_proportion: ''
  })
  const [Result, setResult] = React.useState({
    marginOfError: 0,
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.marginOfError}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            confidence_level,
            sample_size,
            population_proportion
          }, { setSubmitting }) => {
            const payload: MarginErrorI = {
              confidence_level,
              sample_size,
              population_proportion,
              method: 'FindOuttheMarginofError'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: marginOfErrorCalculator } = await calculateStatistics(payload)
              console.log('=====>', marginOfErrorCalculator)
              const { margin_of_error } = marginOfErrorCalculator
              if (typeof marginOfErrorCalculator === 'object') {
                setResult({
                  marginOfError: margin_of_error,
                })
              }
              if (success === true) {
                setAnswer(success)
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                <Label title={LABELS.confidenceLevel} />
                <CustomTextInput
                  type={null}
                  id="confidence_level"
                  placeholder={PLACEHOLDERS.number}
                  value={values.confidence_level}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.populationProportion} />
                <CustomTextInput
                  type={null}
                  id="population_proportion"
                  placeholder={PLACEHOLDERS.number}
                  value={values.population_proportion}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.sampleSize} />
                <CustomTextInput
                  type={null}
                  id="sample_size"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sample_size}
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
      <ResultTabsContainer tabTitle={'Result'} latex={LATEX.marginOfError}>
        {answer === true &&
          <div className="mb-3 text-wrap">
            <Typography variant="subtitle1">
              Margin of error: {Result.marginOfError}
            </Typography>
          </div>
        }
      </ResultTabsContainer>
    </>
  )
}

export default MarginOfErrorCalculator
