/**
 * 
 * Form input for the area converter
 */
 import React, { useState } from 'react'
 import { UniversalConverterForm } from '../../forms/UniversalConvertorForm'
 import { dataUnitConverterUnit } from '../../../services/convertersUnits'
 import { allConverter } from '../../../services/converterService/convert'
 import { methodDataUnitConverter } from '../../../services/methodNames/methods'
 import { Box } from '@mui/material'


 function DataUnitConverter(props:any){

     return(
        <UniversalConverterForm 
        pagename="Data Unit Converter Calculator"
        unitsFunnction={dataUnitConverterUnit} 
        convertFunction={ allConverter } 
        convertMethod={methodDataUnitConverter} />
     );
 }

 /**
  * 
  * The unitsFunction prop takes in the function the is responsible for returning units from the db
  * the convertFunction prop take in the function that is repsonsible for calculating results
  * the convert method prop takes in the convertion method name
  */
 
export default DataUnitConverter