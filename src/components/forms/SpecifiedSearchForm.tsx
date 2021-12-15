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
        display: 'bloc'
      };

    return(
        <Box >
        <Box sx={{ ...commonStyles }}>
            
            <div className="d-flex justify-content-center">
                <input
                    id="calc-search"
                    list="data"
                    type="text"
                    placeholder="search"
                    className="search-input"
                    value = {value}
                    onChange = {(e) => {
                        console.log("button is pressed ", e.target.value)
                        setValue(e.target.value)
                    }}
                    />
                 <Button type="button">
                    <SearchIcon/>
                </Button>
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
                                fontSize: 16,
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