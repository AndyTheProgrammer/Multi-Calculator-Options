import next_arrow from '../../../common/assets/next_arrow.svg';

export function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ 
            position: 'absolute',
            top: 0,
            right: -55,
            display: "block", 
            background: "none",
            width: 50
        }}
        onClick={onClick}>
            <img style={{ width: '100%', height:'100%' }} src={next_arrow}/>
      </div>
    );
  }