import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { othersRoutes } from '../../routes/routes'
import List from '@mui/material/List';

var classNames = require('classnames');

function SearchForm(){

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
            if(a.toLocaleLowerCase().indexOf(value) > -1 && value !== ""){
                console.log("VALUES MATCH ", a.toLocaleLowerCase().indexOf(value))
                dataToArray[i] = dataArray[i];
            }
            else{
                
            }
            setResultArray(dataToArray)
        }
        console.log(resultArray)
    }, [value])



    useEffect(() => {
        const checkIfClickedOutside = (e: { target: any; }) => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (isSearchOption && ref.current && !ref.current.contains(e.target)) {
            setSearchOption(false)
          }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isSearchOption])

    const overLayStyleClasses = classNames({
        'app-over-lay': isSearchOption
    })

    const appOverLayDisplay = classNames({
        'app-over-lay-display': isSearchOption
    })

    const commonStyles = {
        width: 300,
        marginRight: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderColor: '#707070', 
        color: '#707070',
        display: 'bloc'
      };

    return(
        <div>
        <Box sx={{ ...commonStyles }}>
        <div className={overLayStyleClasses} ></div>
            
            <div className="form-group d-flex justify-content-center">
                <input
                    onFocus = { ()=> { setSearchOption(true) }}
                    id="calc-search"
                    list="data"
                    type="text"
                    placeholder="search for calculator"
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
        <Box  ref={ref} className={appOverLayDisplay} sx={{ display: 'block' }}>
            {
                isSearchOption?
                (
                    resultArray.map((data:any) => {
                        return(
                            <Box id="" className="div-link link-search"
                            onClick={()=>{ 
                                history.push(data.path); 
                            }}>{ data.name }</Box>
                        )
                    })
                ): ""
            }
        </Box>
        </div>
        );
}

export { SearchForm }