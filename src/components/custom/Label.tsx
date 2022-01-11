import { Typography } from '@material-ui/core'
import { COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const Label = (props: any) => {
  const { title } = props
  return (
    <div
      className="form-group col"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FontProvider fonts={[{ font: 'Roboto' }]}>
        <Typography
          variant='subtitle2'
          style={{ color: 'black', fontSize: 16 }}
        >
          <Font>{title}</Font>
        </Typography>
      </FontProvider>
    </div>
  )
}

export default Label
