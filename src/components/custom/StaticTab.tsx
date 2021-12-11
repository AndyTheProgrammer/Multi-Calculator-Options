import React from 'react'
import { Typography, Box } from '@material-ui/core'

import { Font, FontProvider } from '../font'

function StaticTab(props: any) {
  const { className, label } = props

  if (label) {
    return (
      <Box className={className} p={0.5}>
        <FontProvider fonts={[{ font: 'Varela Round' }]}>
          <Typography className="text-center" variant="subtitle2">
            <Font>{label}</Font>
          </Typography>
        </FontProvider>
      </Box>
    )
  } else {
    return (
      <Box className={className} p={1.9}>
      </Box>
    )
  }

}

export default StaticTab
