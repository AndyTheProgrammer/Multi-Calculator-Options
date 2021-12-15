/**
 * 
 * Form input for the lengthConverter
 */

import React, { useState } from 'react'
import { UniversalConverterForm } from '../../forms/UniversalConvertorForm'
import { test } from '../../../services/convertersUnits'
import { allConverter } from '../../../services/converterService/convert'
import { methodLengthConverter } from '../../../services/methodNames/methods'
import { Box } from '@mui/material'


function LengthConverter(props:any){

    return(
        <UniversalConverterForm 
            pagename="Length Converter Calculator"
            unitsFunnction={test} 
            convertFunction={ allConverter } 
            convertMethod={methodLengthConverter} 
            />
    );
}

export default LengthConverter 