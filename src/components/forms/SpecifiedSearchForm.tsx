import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { othersRoutes } from '../../routes/routes'
import List from '@mui/material/List';



var classNames = require('classnames');

function SpecifiedSearchForm(){

    const history = useHistory();

    const converters = othersRoutes.subCategories[5].sub_calculator
    
    const ref:any = useRef();
    const [isSearchOption, setSearchOption] = useState(false)

    const [value, setValue] = useState("");
    const [resultArray, setResultArray] = useState([])

    var dataArray = [...othersRoutes.subCategories[5].sub_calculator]

    useEffect(() => {
        const dataToArray:any = [];
        for(let i = 0; i < dataArray.length; i++){
            var a = dataArray[i].name;
            if(a.toLocaleLowerCase().indexOf(value) > -1 ){
                console.log("VALUES MATCH ", a.toLocaleLowerCase().indexOf(value))
                dataToArray[i] = dataArray[i];
            }
            else{
                
            }
            setResultArray(dataToArray)
        }
        console.log(resultArray)
    }, [value])

    const commonStyles = {
        width: '100%',
        marginRight: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderColor: '#707070', 
        color: '#707070',
        display: 'bloc',
        minHeight: 25,
        paddingLeft: '10px',
        paddingRight: '10px',
        marginBottom: '10px'
      };

    return(
        <Box >
        <Box sx={{ ...commonStyles }}>
            
            <div className="d-flex ">
                <input
                    style={{
                        borderRadius: 25,
                        width: '100%',
                        border: 'none',
                        borderWidth: 1,
                        borderColor: 'red',
                        outline: 'none',
                        fontSize: 14,
                        color:'#707070',
                        height: 30,
                    }}
                    autoComplete='off'
                    id="calc-search"
                    list="data"
                    type="text"
                    placeholder="Search for Calculator"
                    value = {value}
                    onChange = {(e) => {
                        console.log("button is pressed ", e.target.value)
                        setValue(e.target.value)
                    }}
                    />
                 <Box>
                    <SearchIcon sx={{ color: '#3128af' }}/>
                </Box>
            </div>
            
        </Box>
        <Box  sx={{ 
                border: 0, 
                display: 'block',
                marginLeft: 2
            }}>
            {
                resultArray.map((data:any) => {
                    return(
                        <Box sx={[
                            {
                                '&:hover':{
                                    cursor: 'pointer',
                                    backgroundColor: '#F0F3F6'
                                }
                            },
                            {
                                fontSize: 15,
                            }
                        ]}
                            onClick={()=>{ 
                                history.push(data.path); 
                            }}>{ data.name }</Box>
                    )
                })
            }
        </Box>
        </Box>
        );
}

export default SpecifiedSearchForm