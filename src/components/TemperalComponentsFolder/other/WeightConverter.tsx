/**
 * 
 * Form input for the area converter
 */
 import React, { useState } from 'react'
 import { UniversalConverterForm } from '../../forms/UniversalConvertorForm'
 import { weightConverterUnit } from '../../../services/convertersUnits' // gets units
 import { allConverter } from '../../../services/converterService/convert'
 import { methodWeightConverter } from '../../../services/methodNames/methods'
 import { Box } from '@mui/material'

 
 function WeightConverter(props:any){

     return(
        <UniversalConverterForm 
        pagename="Weight Converter Calculator"
        unitsFunnction={weightConverterUnit} 
        convertFunction={ allConverter } 
        convertMethod={methodWeightConverter} />
     );
 }

 /**
  * 
  * The unitsFunction prop takes in the function the is responsible for returning units from the db
  * the convertFunction prop take in the function that is repsonsible for calculating results
  * the convert method prop takes in the convertion method name
  */
 
export default WeightConverter