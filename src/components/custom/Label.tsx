import { Box, Typography } from '@material-ui/core'
import { Font, FontProvider } from '../font'

interface LabelProps {
  title: string;
  columnLabel?: boolean;
}

const Label = (props: LabelProps) => {
  const { title, columnLabel } = props
  return (
    <FontProvider fonts={[{ font: 'Roboto' }]}>
      <div
        className="form-group col"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='subtitle2'
          style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}
        >
          {columnLabel ? <Font>{title}</Font> : <Font>{title}:</Font>}

        </Typography>
      </div>
    </FontProvider>
  )
}

export default Label
