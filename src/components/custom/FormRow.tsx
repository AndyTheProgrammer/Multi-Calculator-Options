import { Box } from '@mui/material';
import React from 'react'
import CustomBtn from './CustomBtn'
import CustomResetBtn from './CustomResetBtn'

interface FormRowProps {
  children?: React.ReactNode;
  buttons?: boolean;
  reset?: any;
}

function FormRow(props: FormRowProps) {
  const { children, buttons, reset } = props;

  if (buttons) {
    return (
      <div
        className='form-row'
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CustomResetBtn
          onHandleClick={() => reset()}
        />
        <CustomBtn />
      </div>
    )
  } else {
    return (
      <div
        className='form-row'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: "0.5px !important",
          marginRight: "0.5px !important",
        }}
      >
        {children}
      </div>
    )
  }

}

export default FormRow
