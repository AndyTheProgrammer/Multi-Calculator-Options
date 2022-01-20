import { Box } from '@mui/material'
import React from 'react'

interface ImageProps {
  path: string;
}

function Image(props: ImageProps) {
  const { path } = props
  return (
    <Box
      mt={0}
      mb={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        className="img img-fluid"
        style={{
          width: 150,
          height: 150,
          aspectRatio: 'auto',
        }}
        src={path}
      />
    </Box>
  )
}

export default Image
