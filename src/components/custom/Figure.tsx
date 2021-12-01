import FIGURE from './../../common/assets/image-placeholder.jpg'
import useStyles from './../../styling/CustomStyles'

function Figure() {
  const classes = useStyles();
  return (
    <div className='form-group col'>
      <img src={FIGURE} alt="figure" className='img-fluid img-thumbnail' style={{ height: 150 }} />
    </div>
  )
}

export default Figure
