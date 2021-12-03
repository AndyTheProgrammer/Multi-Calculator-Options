import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core'

import iconLine from '../../common/assets/line.svg';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    width: '80%',
  }
}));

function CustomDivider(props: any) {
  const { label1, label2 } = props;
  const { label, image } = useStyles()
  return (
    <>
      <Box >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          width: '100%',
          borderRadius: 3,
          textAlign: 'center',
          fontSize: 14,
          color: '#8591B0',
        }}>
          <Box>
            <img className={image} alt="lineIcon" src={iconLine} />
          </Box>

          <p className={label} >
            {label1}
          </p>

          <Box>
            <img className={image} alt="lineIcon" src={iconLine} />
          </Box>

          <p className={label} >
            {label2}
          </p>

          <Box>
            <img className={image} alt="lineIcon" src={iconLine} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CustomDivider
