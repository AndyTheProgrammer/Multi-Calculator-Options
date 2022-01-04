import React from 'react'

interface FormRowProps {
  children: React.ReactNode;
}

function FormRow(props: FormRowProps) {
  const { children } = props;
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

export default FormRow
