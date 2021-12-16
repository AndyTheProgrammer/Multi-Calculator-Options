/**
 * 
 * Form input for the area converter
 */
 import React, { useState } from 'react'
 import { UniversalConverterForm } from '../../forms/UniversalConvertorForm'
 import { areaConverterUnit } from '../../../services/convertersUnits'
 import { allConverter } from '../../../services/converterService/convert'
 import { methodAreaConverter } from '../../../services/methodNames/methods'
 import { Box } from '@mui/material'


 function AreaConverter(props:any){
     return(
        <UniversalConverterForm
            pagename="Area Converter Calculator" 
            unitsFunnction={areaConverterUnit} 
            convertFunction={ allConverter } 
            convertMethod={methodAreaConverter} />
     );
 }

 /**
  * 
  * The unitsFunction prop takes in the function the is responsible for returning units from the db
  * the convertFunction prop take in the function that is repsonsible for calculating results
  * the convert method prop takes in the convertion method name
  */
 
export default AreaConverter