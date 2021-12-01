import * as React from 'react'

interface CustomSearchInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: any,
  value: any;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
}

const CustomSearchInput = (props: CustomSearchInputProps) => {
  const { type, id, name, placeholder, value, onChange } = props
  return (
    <div className="form-group col">
      <input
        type={type}
        className="form-control"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default CustomSearchInput
