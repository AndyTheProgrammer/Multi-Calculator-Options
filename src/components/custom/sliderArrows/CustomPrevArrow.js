import prev_arrow from '../../../common/assets/prev_arrow.svg';
export function CustomPrevArrow(props){
    const { className, style, onClick } = props;
    return (
      <div
        style={{ 
            position: 'absolute',
            top: 0,
            left: -55,
            display: "block", 
            background: "none",
            zIndex: 50,
            width: 50

        }}
        onClick={onClick}>
            <img style={{ width: '100%', height:'100%' }} src={prev_arrow}/>
      </div>
    );
}