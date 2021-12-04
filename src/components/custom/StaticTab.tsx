import React from 'react'
import { Typography } from '@material-ui/core'

import { Font, FontProvider } from '../font'

function StaticTab(props: any) {
  const { className, label } = props
  return (
    <div className={className}>
      <FontProvider fonts={[{ font: 'Varela Round' }]}>
        <Typography className="text-center" variant="subtitle2">
          <Font>{label}</Font>
        </Typography>
      </FontProvider>
    </div>

  )
}

export default StaticTab
