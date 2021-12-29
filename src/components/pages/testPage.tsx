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
import RootsCalculators from  '../TemperalComponentsFolder/pages/RootsCalculators'
import AreaConverter from  '../TemperalComponentsFolder/other/AreaConverter'
import GPACalculator from  '../TemperalComponentsFolder/math/GPACalculator'
import MarginOfErrorCalculator from '../pages/calculators/statistics/MarginOfErrorCalculator'



export default function TestPage(){
    return(
        <>
          <RootsCalculators/>
        </>
    );
}