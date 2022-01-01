import { Typography } from '@material-ui/core'
import { COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const Label = (props: any) => {
  const { title } = props
  return (

    <FontProvider fonts={[{ font: 'Roboto, Helvetica' }]}>
      <Typography
        variant='subtitle2'
        style={{ color: COLORS.text, fontWeight: 'bold', }}
      >
        <Font>{title}</Font>
      </Typography>
    </FontProvider>

  )
}

export default Label
