import * as React from 'react'
import { Field, ErrorMessage } from 'formik';

interface CustomTextInputProps {
  type: string | any;
  id: string;
  name: string;
  placeholder: any,
}

const CustomTextInput = (props: any) => {
  const { type, id, name, placeholder } = props
  return (
    <div className="form-group col">
      <Field
        className="form-control"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  )
}

export default CustomTextInput
