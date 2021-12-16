import React from 'react'
import { Box } from '@mui/material'

export const CustomFormikOptions = (props:any) => (
 
  <Box sx={{
    display: 'flex',
  }}>
    <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box>
    <select 
    style={{
      width:'100%',
      backgroundColor:'#F0F3F6',
      border: 'none',
      borderColor: 'red',
      borderRadius: 7,
      outline: 'none',
      color:'black' 
    }}
    {...props} >
      <option value="Subtraction">Subtraction</option>
      <option value="Multiply">Multiply</option>
    </select>
  </Box>
);

export const CustomFormikForm = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}:any) => (
<Box sx={{
          display: 'flex',
        }}>
          <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box>
          <input
            style={{
              width:'100%',
              backgroundColor:'#F0F3F6',
              border: 'solid',
              borderWidth: 0,
              borderColor: 'red',
              borderRadius: 7,
              outline: 'none'
            }}
            type="text" {...field} {...props}
          />
        </Box>
  // <div>
  //   <input type="text" {...field} {...props} />
  // </div>
);


const CustomForm = (props: any) => {
    return (
        <Box sx={{
          display: 'flex',
        }}>
          <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box>
          <input
            style={{
              width:'100%',
              backgroundColor:'#F0F3F6',
              border: 'solid',
              borderWidth: 0,
              borderColor: 'red',
              borderRadius: 7,
              outline: 'none'
            }}
            name={props.name}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
        </Box>
    );
  }

  export default CustomForm