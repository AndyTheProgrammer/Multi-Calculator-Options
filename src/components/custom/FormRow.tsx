import React from 'react'

interface FormRowProps {
  children: React.ReactNode;
  buttons?: boolean;
}

function FormRow(props: FormRowProps) {
  const { children, buttons } = props;

  if (buttons) {
    return (
      <div
        className='form-row'
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children}
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
        }}
      >
        {children}
      </div>
    )
  }

}

export default FormRow
