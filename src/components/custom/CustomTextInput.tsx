import * as React from 'react'
import { Field, ErrorMessage } from 'formik';

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
      <Field
        type={type}
        className="form-control form-control-sm"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ backgroundColor: COLORS.input }}
      />
    </div>
  )
}

export default CustomTextInput
