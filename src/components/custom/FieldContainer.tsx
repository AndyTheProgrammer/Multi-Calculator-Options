import { Box } from '@mui/material'
import React from 'react'

interface Props {
  children?: React.ReactNode;
}

function FieldContainer(props: Props) {
  const { children } = props
  return (
    <>
      <Box pr={4} pl={4}>
        {children}
      </Box>
    </>
  )
}

export default FieldContainer
