import React, {useState} from 'react'
import { Box } from '@mui/material'
import percentage from '../../common/assets/percentage.png'

export const CustomFormikOptions = (props:any) => (
 
  <Box sx={{
    display: 'flex',
    paddingLeft: '5px',
    paddingRight: '5px',
    width:'100%'
    
  }}>
    <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box>
    <select 
    style={{
      width:'100%',
      // backgroundColor:'#F0F3F6',
      backgroundColor:'#EEEEEE',
      border: 'solid',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 3,
      // outline: 'none'
    }}
    {...props} >
      <option value="Subtraction">Subtraction</option>
      <option value="Multiply">Multiply</option>
    </select>
  </Box>
);


export function CustomFormikOptionsFractions({
  field,
  changeStateValue,
  //value,
  //onChange,
  statevalue, // { name, value, onChange, onBlur }
  ...props
}:any){

  const[value, setValue] = useState("addition")

  const handleChange = (e:any) => {
    setValue(e.target.value)
    changeStateValue(e.target.value)
  }
  changeStateValue(statevalue)
  console.log("*************************" )
  return(
    <Box sx={{
      display: 'flex',
      paddingLeft: '5px',
      paddingRight: '5px',
      width:'100%'
    }}>
      <select 
      style={{
        width:'100%',
        // backgroundColor:'#F0F3F6',
        backgroundColor:'#EEEEEE',
        border: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        // outline: 'none'
      }}
      value={value}
      onChange={handleChange}
      {...props} >
        <option value="addition">+</option>
        <option value="subtraction">-</option>
        <option value="multiply">x</option>
        <option value="divide">/</option>
      </select>
    </Box>
  );
}

export const PercentageOptions = (props:any) => (
 
  <Box sx={{
    display: 'flex',
    paddingLeft: '5px',
    paddingRight: '5px',
    width:'100%'
  }}>
    {/* <Box sx={{ marginRight:1, color:'#4072B5'  }}>:</Box> */}
    <select 
    style={{
      width:'100%',
      // backgroundColor:'#F0F3F6',
      backgroundColor:'#EEEEEE',
      border: 'solid',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 3,
      height: 30
      // outline: 'none'
    }}
    {...props} >
      <option value=""> </option>
      <option value="increase">increase</option>
      <option value="decrease">decrease</option>
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
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%'
        }}>
          <input
            style={{
              width:'100%',
              // backgroundColor:'#F0F3F6',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              // outline: 'none
            }}
            type="text" {...field} {...props}
          />
        </Box>
);

export const CustomFormikFormPlain = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}:any) => (
<Box sx={{
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%'
        }}>
          <input
            style={{
              width:'100%',
              // backgroundColor:'#F0F3F6',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              // outline: 'none
            }}
            type="text" {...field} {...props}
          />
        </Box>
);


export const CustomFormikFormFraction = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}:any) => (
<Box sx={{
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%'
        }}>
          <input
            style={{
              width:'100%',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
            }}
            type="text" {...field} {...props}
          />
        </Box>
);


export const CustomFormikFormFraction2 = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}:any) => (
<Box sx={{
          display: 'flex',
          paddingLeft: '0px',
          paddingRight: '0px',
          width:'100%'
        }}>
          <input
            style={{
              width:'100%',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
            }}
            type="text" {...field} {...props}
          />
        </Box>
);


/** displays percentage symbol in input field */
export const CustomFormikFormPercentage = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}:any) => (
<Box sx={{
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%',
        }}>
          <input
            style={{
              width:'100%',
              backgroundImage: `url(${percentage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '12px',
              backgroundColor:'#EEEEEE',
              backgroundPositionX:'calc(100% - 3px)',
              backgroundPositionY: 'center',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              paddingRight:20
            }}
            type="text" {...field} {...props}
          />
        </Box>
);

export const CustomFormikFormRatio = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}:any) => (
<Box sx={{
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%'
        }}>
          
          <input
            style={{
              // backgroundColor:'#F0F3F6',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              width:'100%'
              // outline: 'none'
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
        paddingLeft: '5px',
        paddingRight: '5px',
        width:'100%'
      }}>
        <input
          style={{
            width:'100%',
              // backgroundColor:'#F0F3F6',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              // outline: 'none'
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

export const CustomFormPercentage = (props: any) => {
  return (
      <Box sx={{
        display: 'flex',
        paddingLeft: '5px',
        paddingRight: '5px',
        width:'100%'
      }}>
        <input
          style={{
              width:'100%',
              backgroundImage: `url(${percentage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '12px',
              backgroundColor:'#EEEEEE',
              backgroundPositionX:'calc(100% - 3px)',
              backgroundPositionY: 'center',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              paddingRight:20
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

  export const CustomFormFraction = (props: any) => {
    return (
        <Box sx={{
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%'
        }}>
          <input
            style={{
              width:'100%',
              // backgroundColor:'#F0F3F6',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              // outline: 'none'
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

  export const CustomFormFraction2 = (props: any) => {
    return (
        <Box sx={{
          display: 'flex',
          paddingLeft: '5px',
          paddingRight: '5px',
          width:'100%'
        }}>
          <input
            style={{
              width:'100%',
              // backgroundColor:'#F0F3F6',
              backgroundColor:'#EEEEEE',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 3,
              // outline: 'none'
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