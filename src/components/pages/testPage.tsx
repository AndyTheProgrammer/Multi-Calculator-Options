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
import MassCalculator from  '../TemperalComponentsFolder/other/measurement/MassCalculator'
import AreaConverter from  '../TemperalComponentsFolder/other/AreaConverter'
import BinaryToDecimalCalculator from  '../TemperalComponentsFolder/math/BinaryToDecimalCalculator'
import MarginOfErrorCalculator from '../pages/calculators/statistics/MarginOfErrorCalculator'



export default function TestPage(){
    return(
        <>
          <MassCalculator/>
        </>
    );
}