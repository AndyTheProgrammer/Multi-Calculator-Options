import React from 'react'
import { Box } from '@mui/material';

interface Props {
  children?: React.ReactNode;
}

function TabsContainer(props: Props) {
  const { children } = props;
  return (
    <Box
      sx={{
        width: '100%',
        //   display: 'flex',
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default TabsContainer
