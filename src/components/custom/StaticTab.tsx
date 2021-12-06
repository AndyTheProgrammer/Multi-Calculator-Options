import React from 'react'
import { Typography, Box } from '@material-ui/core'

import { Font, FontProvider } from '../font'

function StaticTab(props: any) {
  const { className, label } = props
  return (
    <div className={className}>
      <FontProvider fonts={[{ font: 'Varela Round' }]}>
        {label !== null || undefined ?
          (< Typography className="text-center" variant="subtitle2">
            <Font>{label}</Font>
          </Typography>)
          :
          (<Box style={{ height: '20' }}>{" "}</Box>)
        }
      </FontProvider>
    </div>

  )
}

export default StaticTab
