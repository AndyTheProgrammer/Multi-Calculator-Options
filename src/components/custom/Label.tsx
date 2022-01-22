import { Box, Typography } from '@material-ui/core'
import { COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const Label = (props: any) => {
  const { title } = props
  return (
    <FontProvider fonts={[{ font: 'Roboto' }]}>
      <div
        className="form-group col-4"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >

        <Typography
          variant='subtitle2'
          style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}
        >
          <Font>{title}:</Font>
        </Typography>

      </div>
    </FontProvider>
  )
}

export default Label
