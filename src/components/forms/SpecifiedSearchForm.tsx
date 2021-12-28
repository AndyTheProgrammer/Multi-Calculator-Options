import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { othersRoutes, mathRoutes } from '../../routes/routes'
import List from '@mui/material/List';
var classNames = require('classnames');

function SpecifiedSearchForm(props:any){

    const history = useHistory();

    //Math list
    const fractionsLists = mathRoutes.subCategories[0].sub_calculator
    const generalList = mathRoutes.subCategories[1].sub_calculator
    const algebraList = mathRoutes.subCategories[2].sub_calculator
    const statisticsList = mathRoutes.subCategories[3].sub_calculator
    const geometryList = mathRoutes.subCategories[4].sub_calculator

    // other list
    const converterList = othersRoutes.subCategories[6].sub_calculator


    const ref:any = useRef();
    const [isSearchOption, setSearchOption] = useState(false)

    const [value, setValue] = useState("");
    const [resultArray, setResultArray] = useState([])

    var dataArray = [
        ...fractionsLists,
        ...generalList,
        ...algebraList,
        ...statisticsList,
        ...geometryList
    ]

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
        <Box 
            sx={{ 
                width:'100%',
                display: 'flex',
                height: 30,
                justifyContent: 'start',
                backgroundColor: 'white',
                borderRadius: 5,
                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
            }}>
            <Box sx={{ height: 30, }}>
                <img style={{ height: '100%', }} alt="icon" src={props.searchimage} />
            </Box>
            <Typography sx={{width: '100%'}}>
                <Box
                    sx={{
                        width: '100%',
                        paddingRight: 3,
                        paddingLeft: 0.5,
                        paddingTop: 0.5,
                    }}>
                        {props.searchname}
                </Box>
            </Typography>
            
        </Box>
        <Box
            className="general-text-box app-scroller"  
            sx={{ 
                border: 0, 
                display: 'block',
                height: 170,
                overflowY: 'scroll'
            }}>
            {
                (value)?
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
                :<Box>
                    {
                        (props.searchkey === 'fractions')?
                        <Box>
                            {
                                fractionsLists.map((data:any) => {
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
                        :<Box></Box>
                    }
                    {
                        (props.searchkey === 'general')?
                        <Box>
                            {
                                generalList.map((data:any) => {
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
                        :<Box></Box>
                    }
                    {
                        (props.searchkey === 'algebra')?
                        <Box>
                            {
                                algebraList.map((data:any) => {
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
                        :<Box></Box>
                    }
                    {
                        (props.searchkey === 'statistics')?
                        <Box>
                            {
                                statisticsList.map((data:any) => {
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
                        :<Box></Box>
                    }
                    {
                        (props.searchkey === 'converter')?
                        <Box>
                            {
                                converterList.map((data:any) => {
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
                        :<Box></Box>
                    }
                </Box>
            }
        </Box>
        </Box>
        );
}

export default SpecifiedSearchForm