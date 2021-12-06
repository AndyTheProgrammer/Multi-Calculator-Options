import { Typography } from '@material-ui/core'
import { COLORS } from '../../common/shared'
const Label = (props: any) => {
  const { title } = props
  return (
    <div className="form-group col">
      <Typography variant='subtitle2' style={{ color: COLORS.text, fontWeight: 'bold' }}>{title}</Typography>
    </div>
  )
}

export default Label
