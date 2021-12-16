import react from 'react'
import { Button } from '@mui/material'
import form_btn from '../../common/assets/calc_btn.svg'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material'
function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path id="Icon_awesome-calculator-3" data-name="Icon awesome-calculator" d="M17.857,0H2.143A2.074,2.074,0,0,0,0,1.875v16.25A2.074,2.074,0,0,0,2.143,20H17.857A2.074,2.074,0,0,0,20,18.125V1.875A2.074,2.074,0,0,0,17.857,0ZM5.714,17a.58.58,0,0,1-.571.5H3.429a.58.58,0,0,1-.571-.5V15.5a.58.58,0,0,1,.571-.5H5.143a.58.58,0,0,1,.571.5Zm0-5a.58.58,0,0,1-.571.5H3.429a.58.58,0,0,1-.571-.5V10.5a.58.58,0,0,1,.571-.5H5.143a.58.58,0,0,1,.571.5Zm5.714,5a.58.58,0,0,1-.571.5H9.143a.58.58,0,0,1-.571-.5V15.5a.58.58,0,0,1,.571-.5h1.714a.58.58,0,0,1,.571.5Zm0-5a.58.58,0,0,1-.571.5H9.143a.58.58,0,0,1-.571-.5V10.5a.58.58,0,0,1,.571-.5h1.714a.58.58,0,0,1,.571.5Zm5.714,5a.58.58,0,0,1-.571.5H14.857a.58.58,0,0,1-.571-.5V10.5a.58.58,0,0,1,.571-.5h1.714a.58.58,0,0,1,.571.5V17Zm0-10a.58.58,0,0,1-.571.5H3.429A.58.58,0,0,1,2.857,7V3a.58.58,0,0,1,.571-.5H16.571a.58.58,0,0,1,.571.5Z" transform="translate(169 13)" fill="#fff"/>
      </SvgIcon>
    );
  }

export function CustomFormBtn(props:any){
    return(
        <Button
        sx={{ paddingTop:1, textTransform: 'none', borderRadius: 15, width: 100, height: 25, fontSize:12, color: 'white', backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)' }} 
            type={props.type}
            onClick={props.handleClick}>
            { props.name }
        </Button>
    );
}

export function CustomFormImageBtn(props:any){
    return(
        <button 
            style={{ 
                    paddingLeft: 3,
                    paddingRight: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    textTransform: 'none', 
                    border:'none',
                    borderRadius: 15, 
                    
                    width: 100, 
                    height: 25, 
                    color: 'white',
                    textAlign: 'center', 
                    backgroundImage: 'linear-gradient(to left, #499FB8, #3128AF)' 
                }} 
                type={props.type}
                onClick={props.handleClick}>
                <Typography>
                    <Box sx={{ fontSize:12, paddingTop: 0.5 }}>Calculate</Box>
                </Typography>
                <Box sx={{width: 20}}>
                    <img style={{width: '100%', height:'100%'}} alt="icon" src={form_btn}/>
                </Box>
        </button>
    );
}