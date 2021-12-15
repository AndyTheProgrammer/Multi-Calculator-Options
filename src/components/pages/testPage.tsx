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
import ArithmeticSequenceCalculator from  '../TemperalComponentsFolder/math/ArithmeticSequenceCalculator'



//
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import ExponentForm from '../forms/math/ExponentForm'

    function Topic() {
        // The <Route> that rendered this component has a
        // path of `/topics/:topicId`. The `:topicId` portion
        // of the URL indicates a placeholder that we can
        // get from `useParams()`.
        let { topicId }:any = useParams();
      
        return (
          <div>
            <h3>{topicId}</h3>
          </div>
        );
      }


export default function TestPage(){
    return(
        <>
          <ArithmeticSequenceCalculator />
        </>
    );
}