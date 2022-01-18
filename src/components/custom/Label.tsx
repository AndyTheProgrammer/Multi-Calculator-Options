import { Box, Typography } from '@material-ui/core'
import { COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const Label = (props: any) => {
  const { title } = props
  return (
    <FontProvider fonts={[{ font: 'Roboto' }]}>
      <div
        className="form-group col-3"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >

        <Typography
          variant='subtitle2'
          style={{ color: COLORS.text, fontSize: 14, fontWeight: 'bold' }}
        >
          <Font>{title}</Font>
        </Typography>

        <Box sx={{ marginRight: 1, color: COLORS.text }}>:</Box>
      </div>
    </FontProvider>
  )
}

export default Label
