/**
 * 
 * Form input for the area converter
 */
 import React, { useState} from 'react'
 import { UniversalConverterForm } from '../../forms/UniversalConvertorForm'
 import { temperatureConverter } from '../../../services/convertersUnits' // gets units
 import { allConverter } from '../../../services/converterService/convert'
 import { methodTemperatureConverter } from '../../../services/methodNames/methods'
 import { Box } from '@mui/material'

 function TemperatureConverter(props:any){


     return(
        <UniversalConverterForm 
        pagename="Temperature Converter Calculator"
        unitsFunnction={temperatureConverter} 
        convertFunction={ allConverter } 
        convertMethod={methodTemperatureConverter} />
     );
 }

 /**
  * 
  * The unitsFunction prop takes in the function the is responsible for returning units from the db
  * the convertFunction prop take in the function that is repsonsible for calculating results
  * the convert method prop takes in the convertion method name
  */
 
  export default TemperatureConverter