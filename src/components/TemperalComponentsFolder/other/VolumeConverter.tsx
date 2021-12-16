/**
 * 
 * Form input for the area converter
 */
 import React, { useState } from 'react'
 import { UniversalConverterForm } from '../../forms/UniversalConvertorForm'
 import { volumeConverterUnit } from '../../../services/convertersUnits' // gets units
 import { allConverter } from '../../../services/converterService/convert'
 import { methodVolumeConverter } from '../../../services/methodNames/methods'
 import { Box } from '@mui/material'
 
 

 function VolumeConverter(props:any){

     return(
        <UniversalConverterForm 
        pagename="Volume Converter Calculator"
        unitsFunnction={volumeConverterUnit} 
        convertFunction={ allConverter } 
        convertMethod={methodVolumeConverter} />
     );
 }

 /**
  * 
  * The unitsFunction prop takes in the function the is responsible for returning units from the db
  * the convertFunction prop take in the function that is repsonsible for calculating results
  * the convert method prop takes in the convertion method name
  */
 
export default VolumeConverter