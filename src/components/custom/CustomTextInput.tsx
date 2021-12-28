import * as React from 'react'
import { Field, ErrorMessage } from 'formik';
import { Typography, Grid, Box } from '@mui/material'

import { COLORS } from "../../common/shared";

interface CustomTextInputProps {
  type: string | any;
  id: string;
  name: string;
  placeholder: any;
  value: any;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
}

const CustomTextInput = (props: any) => {
  const { type, id, name, placeholder, value, onChange } = props
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
          style={{ backgroundColor: COLORS.input, color: '#4072B5' }}
        />
      </Box>
    </div>




  )
}

export default CustomTextInput
