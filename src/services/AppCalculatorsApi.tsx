/* eslint-disable camelcase */
import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../common/AppUrl'
import * as FinancialFormulas from '../types/FinanceInterfaces'
import * as MatheMaticalFormulas from '../types/MathInterfaces'
import * as OtherFormulas from '../types/OtherCalculatorInterfaces'
import * as StatisticalFormulas from '../types/StatisticsInterfaces'

export const calculateMath = async (calculateArea: MatheMaticalFormulas.AllMathCalculators) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/calculator/math`, calculateArea);

    const { statusCode, message } = data;
    if (statusCode === 100) {
      // console.log('This is ', message)
      return { success: true, payload: message };
    }

    throw new Error('Responded with unexpected Error');
  } catch (err) {
    console.log(JSON.stringify({ err }, null, 2))
    const { response } = err as AxiosError

    if (response && typeof response.data.statusCode === 'number') {

      const { data: { statusCode, message }, } = response

      if (statusCode === 401) {
        return {
          success: false,
          payload: message
        }
      }

      if (statusCode === 404) {
        return {
          success: false,
          payload: message
        }
      }
    }


    return {
      success: false,
      payload: 'Unexpected Error',
    };
  }
};

export const calculateFinances = async (calculateFinancialPayload: FinancialFormulas.AllFinancialCalculators) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/calculator/finacial`, calculateFinancialPayload)

    const { statusCode, message } = data;
    if (statusCode === 100) {
      // console.log('This is ', message)
      return { success: true, payload: message };
    }

    throw new Error('Responded with unexpected Error');
  } catch (err) {
    console.log(JSON.stringify({ err }, null, 2))
    const { response } = err as AxiosError

    if (response && typeof response.data.statusCode === 'number') {

      const { data: { statusCode, message }, } = response

      if (statusCode === 401) {
        return {
          success: false,
          payload: message
        }
      }

      if (statusCode === 404) {
        return {
          success: false,
          payload: message
        }
      }
    }

    return {
      success: false,
      payload: 'Unexpected Error',
    };
  }
};

export const calculateOthers = async (calculateOtherFormulaePayload: OtherFormulas.AllOtherCalculators) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/calculator/other`, calculateOtherFormulaePayload)

    const { statusCode, message } = data;
    if (statusCode === 100) {
      // console.log('This is ', message)
      return { success: true, payload: message };
    }

    throw new Error('Responded with unexpected Error');
  } catch (err) {
    console.log(JSON.stringify({ err }, null, 2))
    const { response } = err as AxiosError

    if (response && typeof response.data.statusCode === 'number') {

      const { data: { statusCode, message }, } = response

      if (statusCode === 401) {
        return {
          success: false,
          payload: message
        }
      }

      if (statusCode === 404) {
        return {
          success: false,
          payload: message
        }
      }
    }

    return {
      success: false,
      payload: 'Unexpected Error',
    };
  }
};

export const calculateStatistics = async (calculateStatisticalPayload: StatisticalFormulas.AllStatisticalCalculators) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/calculator/math`, calculateStatisticalPayload)

    const { statusCode, message } = data;
    if (statusCode === 100) {
      // console.log('This is ', message)
      return { success: true, payload: message };
    }

    throw new Error('Responded with unexpected Error');
  } catch (err) {
    console.log(JSON.stringify({ err }, null, 2))
    const { response } = err as AxiosError

    if (response && typeof response.data.statusCode === 'number') {

      const { data: { statusCode, message }, } = response

      if (statusCode === 401) {
        return {
          success: false,
          payload: message
        }
      }

      if (statusCode === 404) {
        return {
          success: false,
          payload: message
        }
      }
    }

    return {
      success: false,
      payload: 'Unexpected Error',
    };
  }
};