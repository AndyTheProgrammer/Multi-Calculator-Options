import React from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchForm } from '../forms/searchForm';
import { useHistory } from 'react-router-dom'

// 
import RootsCalculators from '../TemperalComponentsFolder/pages/RootsCalculators'
import AreaConverter from '../TemperalComponentsFolder/other/AreaConverter'
import ReturnOnInvestmentCalculator from '../TemperalComponentsFolder/finance/investmentAndSavingsCalc/ReturnOnInvestmentCalculator'
import SalesCalculator from '../TemperalComponentsFolder/finance/MoneyTaxCalc/SalesCalculator'
import ArmyBodyFatCalculator from '../TemperalComponentsFolder/other/fitness/ArmyBodyFatCalculator'
import DayOfTheWeekCalculator from '../TemperalComponentsFolder/other/health/DayOfTheWeekCalculator'
import RandomPasswordGenerator from '../TemperalComponentsFolder/other/technology/RandomPasswordGenerator'
import Converters from '../TemperalComponentsFolder/pages/Converters'
export default function TestPage() {
  return (
    <>
      <Converters/>
    </>
  );
}