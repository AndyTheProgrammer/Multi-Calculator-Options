import React, { useState } from 'react'
import { Box } from '@mui/material'

function CustomInputField(props){
    const [value, setValue] = useState('')

    const handleChange = (e) => {
      setValue(e.target.value)
      console.log(props.id)
      props.getValue(e.target.value, props.id)     
    }

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
            type="text" 
            name="courses" 
            placeholder="courses"
            value={value} 
            onChange={handleChange}
          />
        </Box>
    );
}

export default function DynamicForm(props){
    return(
        <>
        </>
    );
}