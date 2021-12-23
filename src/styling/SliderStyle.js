import react from 'react';

// wrapps <Box> which has boxStyle css
export const slider_box_content_wrapper_style = {
    display: 'flex',
    width: {
        ld: 350,
        md: 350,
        sm: '100%',
        xs: '100%'
    },

    border: 'none',
    justifyContent: 'center',
    borderColor: 'green'
}

// main wrapper for content inside slider
export const boxStyle = {
    border:'none',
    marginBottom: 2,
    backgroundColor: 'transparent',
    maxWidth: {
        lg: 280,
        md: 280,
        sm: 280,
        xs: "100%"
    },
    height: 250,
    borderRadius: 3,
    paddingTop: 1,
    paddingBottom: 0.5,
    // boxShadow: ' 0 10px 8px 0px rgba(0, 0, 0, 0.2)'
  }

  //
  export const categoryHeaderShadow = {
    width:'100%',
    height: 30, 
    fontSize: 22,
    display: 'flex',
    justifyContent: 'start',
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
  }

