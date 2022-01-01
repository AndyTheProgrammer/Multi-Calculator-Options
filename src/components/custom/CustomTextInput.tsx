import * as React from 'react'
import { Field, ErrorMessage } from 'formik';
import { Typography, Grid, Box } from '@mui/material'

import { COLORS } from "../../common/shared";

interface TextInputProps {
  type?: string | any;
  id?: String;
  name?: String;
  placeholder?: any;
  value?: any;
  col?: any;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
}

const CustomTextInput = (props: TextInputProps) => {
  const { type, id, name, placeholder, value, onChange, col } = props

  if (col) {
    return (
      <div className="form-group col-8">
        <Box sx={{
          display: 'flex',
          
        }}>
          <Field
            className="form-control form-control-sm"
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
              backgroundColor: COLORS.newInput,
              // fontWeight: 500,
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              
            }}
          />
        </Box>
      </div>
    )
  } else {
    return (
      <div className="form-group col">
        <Box sx={{
          display: 'flex',
        }}>
          <Field
            className="form-control form-control-sm"
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
              backgroundColor: COLORS.newInput,
              // fontWeight: 500,
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
            }}
          />
        </Box>
      </div>
    )
  }

}

export default CustomTextInput
