import { Typography } from '@material-ui/core'
import { COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const Label = (props: any) => {
  const { title } = props
  return (
    <div className="form-group col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
      <FontProvider fonts={[{ font: 'Roboto, Helvetica' }]}>
        <Typography
          variant='subtitle2'
          style={{ color: COLORS.text, fontWeight: 'bold', }}
        >
          <Font>{title}</Font>
        </Typography>
      </FontProvider>
    </div>
  )
}

export default Label
