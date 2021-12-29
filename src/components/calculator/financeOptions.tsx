// import React, { useState } from 'react'
// import { Typography, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

// import { useHistory } from "react-router-dom";
// import iconLine from '../../common/assets/line.svg';

// import { Slide } from '../slider/slider'
// import { ResponsiveSliderSmall }  from '../slider/ResponsiveSlider';

// import invest_and_saving_icon from '../../common/assets/invest_and_savings_icon.svg';
// import money_tax_icon from '../../common/assets/money_tax_icon.svg';
// import mortage_icon from '../../common/assets/mortage_icon.svg';
// import retirement_calc_icon from '../../common/assets/retirement_calc_icon.svg';
// import sales from '../../common/assets/sales.svg';
// import Slider from "react-slick";
// import { financialRoutes } from '../../routes/routes';
// import {
//     slider_box_content_wrapper_style,
//     boxStyle,
//     categoryHeaderShadow
// } from '../../styling/SliderStyle';

// import { CustomNextArrow } from '../custom/sliderArrows/CustomNextArrow';
// import { CustomPrevArrow } from '../custom/sliderArrows/CustomPrevArrow';
// import { parse } from 'path/posix';

// import { mobileText } from '../../styling/textStyle'

// var classNames = require('classnames');

// const settings = {
//     arrows: true,
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     nextArrow: <CustomNextArrow />,
//     prevArrow: <CustomPrevArrow />,
//     responsive:[
//         {
//             breakpoint: 700,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 infinite: true,
//                 dots: false
//             }
//         },
//         {
//             breakpoint: 1000,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 infinite: true,
//                 dots: false
//             }
//         },
//     ]
// };

// function FinanceOptions(){
//     const history = useHistory()


//     return(
//         <>
//             <Box 
//                 sx={{ 
//                     height: 300,
//                     display:{
//                         lg: 'flex',
//                         md: 'flex',
//                         sm: 'none',
//                         xs: 'none'
//                     },
//                     justifyContent: 'center'
//                 }} className="container mt-4">
//                 <Box sx={{ width:'100%' }}>
//                     <Slider {...settings}>
//                         <div>
//                             <Box sx={{ 
//                                 ...slider_box_content_wrapper_style
//                             }}>
                                
//                                 <Box sx={{...boxStyle }}>
//                                     <Box 
//                                         sx={{ 
//                                             ...categoryHeaderShadow
//                                         }}>
//                                         <Box sx={{ height: 30, }}>
//                                             <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
//                                         </Box>
//                                         <Typography>
//                                             <Box
//                                                 sx={{
//                                                     width: 240,
//                                                     paddingRight: 3,
//                                                     paddingLeft: 0.5,
//                                                     paddingTop: 0.5,
//                                                     fontSize: 16,
//                                                     color: '#8591B0',
//                                                     whiteSpace: 'nowrap',
//                                                     overflow: 'hidden', 
//                                                 }}>
//                                                     Investment & Saving Calculators
//                                             </Box>
//                                         </Typography>
                                        
//                                     </Box>
//                                     <Box className="general-text-box app-scroller" sx={{ paddingLeft: 2 }}>
//                                         {
//                                             financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
//                                                 return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} sx={{ width: 230, paddingBottom: 0.5,  fontSize: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {r.name} </Box>);
//                                             })
//                                         }
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </div>
                    
//                         <div>
//                             <Box sx={{ 
//                                 ...slider_box_content_wrapper_style
//                             }}>
//                                 <Box sx={{...boxStyle }}>
                                    
//                                     <Box 
//                                         sx={{ 
//                                             ...categoryHeaderShadow
//                                         }}>
//                                         <Box sx={{ height: 30, }}>
//                                             <img style={{ height: '100%', }} alt="icon" src={money_tax_icon} />
//                                         </Box>
//                                         <Typography>
//                                             <Box
//                                                 sx={{
//                                                     width: 240,
//                                                     paddingRight: 3,
//                                                     paddingLeft: 0.5,
//                                                     paddingTop: 0.5,
//                                                     fontSize: 16,
//                                                     color: '#8591B0',
//                                                     whiteSpace: 'nowrap',
//                                                     overflow: 'hidden', 
//                                                 }}>
//                                                     Money, Pay, & Tax Calculators
//                                             </Box>
//                                         </Typography>
                                        
//                                     </Box>


//                                 </Box>
//                             </Box>
//                         </div>


//                         <div>
//                             <Box sx={{ 
//                                 ...slider_box_content_wrapper_style
//                             }}>
//                                 <Box sx={{...boxStyle }}>
//                                     <Box 
//                                         sx={{ 
//                                             ...categoryHeaderShadow
//                                         }}>
//                                         <Box sx={{ height: 30, }}>
//                                             <img style={{ height: '100%', }} alt="icon" src={mortage_icon} />
//                                         </Box>
//                                         <Typography>
//                                             <Box
//                                                 sx={{
//                                                     width: 240,
//                                                     paddingRight: 3,
//                                                     paddingLeft: 0.5,
//                                                     paddingTop: 0.5,
//                                                     fontSize: 16,
//                                                     color: '#8591B0',
//                                                     whiteSpace: 'nowrap',
//                                                     overflow: 'hidden', 
//                                                 }}>
//                                                     Loan Calculators
//                                             </Box>
//                                         </Typography>
                                        
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </div>
//                         <div>
//                             <Box sx={{ 
//                                 ...slider_box_content_wrapper_style
//                             }}>
//                                 <Box sx={{...boxStyle }}>
//                                     <Box 
//                                         sx={{ 
//                                             ...categoryHeaderShadow
//                                         }}>
//                                         <Box sx={{ height: 30, }}>
//                                             <img style={{ height: '100%', }} alt="icon" src={retirement_calc_icon} />
//                                         </Box>
//                                         <Typography>
//                                             <Box
//                                                 sx={{
//                                                     width: 240,
//                                                     paddingRight: 3,
//                                                     paddingLeft: 0.5,
//                                                     paddingTop: 0.5,
//                                                     fontSize: 16,
//                                                     color: '#8591B0',
//                                                     whiteSpace: 'nowrap',
//                                                     overflow: 'hidden', 
//                                                 }}>
//                                                     Retirement Calculators
//                                             </Box>
//                                         </Typography>
                                        
//                                     </Box>

//                                 </Box>
//                             </Box>
//                         </div>
//                         <div>
//                             <Box sx={{ 
//                                 ...slider_box_content_wrapper_style
//                             }}>
//                                 <Box sx={{...boxStyle }}>
//                                     <Box 
//                                         sx={{ 
//                                             ...categoryHeaderShadow
//                                         }}>
//                                         <Box sx={{ height: 30, }}>
//                                             <img style={{ height: '100%', }} alt="icon" src={sales} />
//                                         </Box>
//                                         <Typography>
//                                             <Box
//                                                 sx={{
//                                                     width: 240,
//                                                     paddingRight: 3,
//                                                     paddingLeft: 0.5,
//                                                     paddingTop: 0.5,
//                                                     fontSize: 16,
//                                                     color: '#8591B0',
//                                                     whiteSpace: 'nowrap',
//                                                     overflow: 'hidden', 
//                                                 }}>
//                                                     Sales and Retail Calculators
//                                             </Box>
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </div>
//                     </Slider>
//                     <Box >
//                         <Box sx={{
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     p: 1,
//                                     width: '100%',
//                                     borderRadius: 3,
//                                     textAlign: 'center',
//                                     fontSize: 24,
//                                     color: '#8591B0',
//                                 }}>
//                             <Box>
//                                 <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
//                             </Box>
//                             <p style={{ marginLeft: 30, marginRight: 30 }}>Advertisement</p>
//                             <Box>
//                                 <img style={{ width: '100%' }}  alt="lineIcon" src={iconLine} />
//                             </Box>
//                         </Box>
//                     </Box>
//                     <Box sx={{ }}>
//                         <Slide />
//                     </Box>
//                     <Box >
//                         <Box sx={{
//                                     width: '100%',
//                                     borderRadius: 3,
//                                     color: "black",
//                                     paddingBottom: 0.5,
//                                 }}>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>

//             <OptionsForSmallerScreens/>
//         </>
//     );
// }

// function OptionsForSmallerScreens(){
//     const history = useHistory()
//     const [categoryIndex, setCategoryIndex] = useState([
//         {id: 0, show: true},
//         {id: 1, show: false},
//         {id: 2, show: false},
//         {id: 3, show: false},
//         {id: 4, show: false},
//         {id: 5, show: false},
//         {id: 6, show: false}
//     ])

//     const handleCategoryChange = (e:number)=>{
        
//         const copyOfCategoryIndexData = categoryIndex;
//         console.log(copyOfCategoryIndexData[0].id)
//         for(var i = 0; i < copyOfCategoryIndexData.length; i++){
//             if(copyOfCategoryIndexData[i].id === e){
//                 copyOfCategoryIndexData[i].show = !copyOfCategoryIndexData[i].show
//             }
//             else{
//                 copyOfCategoryIndexData[i].show = false
//             }
//         }
//         setCategoryIndex([...copyOfCategoryIndexData])
//     }
//     return(
//         <>
//             {/* ********************************************** */}
//             {/* ********************************************** */}
//             {/* ********************************************** */}
//             {/* ********************************************** */}

//             {/* mobile */}
//             <Box 
//                 className="container"
//                 sx={{
//                     display:{
//                         lg: 'none',
//                         md: 'none',
//                         sm: 'block',
//                         xs: 'block',
//                     }
                    
//                 }}>
//                 <Box sx={{ minWidth: 120 }} className="container">
//                     <Box>
//                         {
//                             <div>
//                                 <Box sx={{ 
//                                     display: 'flex',
//                                     width: "100%",
//                                     border: 'none',
//                                     justifyContent: 'center',
//                                     borderColor: 'green'
//                                 }}
//                                     onClick={() => { handleCategoryChange(categoryIndex[0].id) }}>
                                    
//                                     <Box sx={{
//                                             border:'none',
//                                             marginBottom: 2,
//                                             backgroundColor: 'transparent',
//                                             width: "100%",
//                                             borderRadius: 3,
//                                             paddingTop: 1,
//                                             paddingBottom: 0.5, }}>
//                                         <Box 
//                                             sx={{ 
//                                                 width:'100%',
//                                                 height: 40, 
//                                                 fontSize: 22,
//                                                 display: 'flex',
//                                                 justifyContent: 'start',
//                                                 backgroundColor: 'white',
//                                                 borderRadius: 5,
//                                                 boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
//                                             }}>
//                                             <Box sx={{ height: 40, }}>
//                                                 <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
//                                             </Box>
//                                             <Typography>
//                                                 <Box
//                                                     sx={{
//                                                         width: "100%",
//                                                         paddingRight: 3,
//                                                         paddingLeft: 0.5,
//                                                         paddingTop: 0.5,
//                                                         fontSize: 18,
//                                                         color: '#8591B0',
//                                                         whiteSpace: 'nowrap',
//                                                         overflow: 'hidden', 
//                                                     }}>
//                                                         Investment & Saving Calculators
//                                                 </Box>
//                                             </Typography>
                                            
//                                         </Box>
//                                         <Box  
//                                             className={classNames({
//                                                 'hidden-text': !categoryIndex[0].show,
//                                                 'reveal-text': categoryIndex[0].show
//                                             })} >
//                                             {
//                                                 (categoryIndex[0].id === 0)?
//                                                 financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
//                                                     return (
//                                                     <Box  
//                                                     onClick={()=>{ history.push(r.path) }} 
//                                                     sx={{ 
//                                                         ...mobileText 
//                                                     }}> {r.name} </Box>);
//                                                 })
//                                                 :null
//                                             }
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </div>
//                         }

//                         {
//                             <div>
//                                 <Box sx={{ 
//                                     display: 'flex',
//                                     width: "100%",
//                                     border: 'none',
//                                     justifyContent: 'center',
//                                     borderColor: 'green'
//                                 }}
//                                     onClick={() => { handleCategoryChange(categoryIndex[1].id) }}
//                                 >
                                    
//                                     <Box sx={{
//                                             border:'none',
//                                             marginBottom: 2,
//                                             backgroundColor: 'transparent',
//                                             width: "100%",
//                                             borderRadius: 3,
//                                             paddingTop: 1,
//                                             paddingBottom: 0.5, }}>
//                                         <Box 
//                                             sx={{ 
//                                                 width:'100%',
//                                                 height: 40, 
//                                                 fontSize: 22,
//                                                 display: 'flex',
//                                                 justifyContent: 'start',
//                                                 backgroundColor: 'white',
//                                                 borderRadius: 5,
//                                                 boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
//                                             }}>
//                                             <Box sx={{ height: 40, }}>
//                                                 <img style={{ height: '100%', }} alt="icon" src={money_tax_icon} />
//                                             </Box>
//                                             <Typography>
//                                                 <Box
//                                                     sx={{
//                                                         width: "100%",
//                                                         paddingRight: 3,
//                                                         paddingLeft: 0.5,
//                                                         paddingTop: 0.5,
//                                                         fontSize: 18,
//                                                         color: '#8591B0',
//                                                         whiteSpace: 'nowrap',
//                                                         overflow: 'hidden', 
//                                                     }}>
//                                                         Money, Pay, & Tax Calculators
//                                                 </Box>
//                                             </Typography>
                                            
//                                         </Box>
//                                         <Box 
//                                         className={classNames({
//                                             'hidden-text': !categoryIndex[1].show,
//                                             'reveal-text': categoryIndex[1].show
//                                         })} >
//                                             {
//                                                 (categoryIndex[1].id === 1)?
//                                                 financialRoutes.subCategories[1].sub_calculator.map((r:any) => {
//                                                     return (
//                                                         <Box  
//                                                         onClick={()=>{ history.push(r.path) }} 
//                                                         sx={{ 
//                                                             ...mobileText 
//                                                         }}> {r.name} </Box>);
//                                                 })
//                                                 :null
//                                             }
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </div>
//                         }
//                         {
//                             <div>
//                                 <Box sx={{ 
//                                     display: 'flex',
//                                     width: "100%",
//                                     border: 'none',
//                                     justifyContent: 'center',
//                                     borderColor: 'green'
//                                 }}
//                                     onClick={() => { handleCategoryChange(categoryIndex[2].id) }}
//                                 >
                                    
//                                     <Box sx={{
//                                             border:'none',
//                                             marginBottom: 2,
//                                             backgroundColor: 'transparent',
//                                             width: "100%",
//                                             borderRadius: 3,
//                                             paddingTop: 1,
//                                             paddingBottom: 0.5, }}>
//                                         <Box 
//                                             sx={{ 
//                                                 width:'100%',
//                                                 height: 40, 
//                                                 fontSize: 22,
//                                                 display: 'flex',
//                                                 justifyContent: 'start',
//                                                 backgroundColor: 'white',
//                                                 borderRadius: 5,
//                                                 boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
//                                             }}>
//                                             <Box sx={{ height: 40, }}>
//                                                 <img style={{ height: '100%', }} alt="icon" src={mortage_icon} />
//                                             </Box>
//                                             <Typography>
//                                                 <Box
//                                                     sx={{
//                                                         width: "100%",
//                                                         paddingRight: 3,
//                                                         paddingLeft: 0.5,
//                                                         paddingTop: 0.5,
//                                                         fontSize: 18,
//                                                         color: '#8591B0',
//                                                         whiteSpace: 'nowrap',
//                                                         overflow: 'hidden', 
//                                                     }}>
//                                                         Loan Calculators
//                                                 </Box>
//                                             </Typography>
                                            
//                                         </Box>
//                                         <Box 
//                                         className={classNames({
//                                             'hidden-text': !categoryIndex[2].show,
//                                             'reveal-text': categoryIndex[2].show
//                                         })} >
//                                             {
//                                                 (categoryIndex[2].id === 2)?
//                                                 financialRoutes.subCategories[2].sub_calculator.map((r:any) => {
//                                                     return (
//                                                         <Box  
//                                                         onClick={()=>{ history.push(r.path) }} 
//                                                         sx={{ 
//                                                             ...mobileText 
//                                                         }}> {r.name} </Box>);
//                                                 })
//                                                 :null
//                                             }
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </div>
//                         }
//                         {
//                             <div>
//                                 <Box sx={{ 
//                                     display: 'flex',
//                                     width: "100%",
//                                     border: 'none',
//                                     justifyContent: 'center',
//                                     borderColor: 'green'
//                                 }}
//                                     onClick={() => { handleCategoryChange(categoryIndex[3].id) }}
//                                 >
                                    
//                                     <Box sx={{
//                                             border:'none',
//                                             marginBottom: 2,
//                                             backgroundColor: 'transparent',
//                                             width: "100%",
//                                             borderRadius: 3,
//                                             paddingTop: 1,
//                                             paddingBottom: 0.5, }}>
//                                         <Box 
//                                             sx={{ 
//                                                 width:'100%',
//                                                 height: 40, 
//                                                 fontSize: 22,
//                                                 display: 'flex',
//                                                 justifyContent: 'start',
//                                                 backgroundColor: 'white',
//                                                 borderRadius: 5,
//                                                 boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
//                                             }}>
//                                             <Box sx={{ height: 40, }}>
//                                                 <img style={{ height: '100%', }} alt="icon" src={retirement_calc_icon} />
//                                             </Box>
//                                             <Typography>
//                                                 <Box
//                                                     sx={{
//                                                         width: "100%",
//                                                         paddingRight: 3,
//                                                         paddingLeft: 0.5,
//                                                         paddingTop: 0.5,
//                                                         fontSize: 18,
//                                                         color: '#8591B0',
//                                                         whiteSpace: 'nowrap',
//                                                         overflow: 'hidden', 
//                                                     }}>
//                                                         Retirement Calculators
//                                                 </Box>
//                                             </Typography>
                                            
//                                         </Box>
//                                         <Box 
//                                         className={classNames({
//                                             'hidden-text': !categoryIndex[3].show,
//                                             'reveal-text': categoryIndex[3].show
//                                         })} >
//                                             {
//                                                 (categoryIndex[3].id === 3)?
//                                                 financialRoutes.subCategories[3].sub_calculator.map((r:any) => {
//                                                     return (
//                                                         <Box  
//                                                         onClick={()=>{ history.push(r.path) }} 
//                                                         sx={{ 
//                                                             ...mobileText 
//                                                         }}> {r.name} </Box>);
//                                                 })
//                                                 :null
//                                             }
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </div>
//                         }
//                         {
//                             <div>
//                                 <Box sx={{ 
//                                     display: 'flex',
//                                     width: "100%",
//                                     border: 'none',
//                                     justifyContent: 'center',
//                                     borderColor: 'green'
//                                 }}
//                                     onClick={() => { handleCategoryChange(categoryIndex[4].id) }}
//                                 >
                                    
//                                     <Box sx={{
//                                             border:'none',
//                                             marginBottom: 2,
//                                             backgroundColor: 'transparent',
//                                             width: "100%",
//                                             borderRadius: 3,
//                                             paddingTop: 1,
//                                             paddingBottom: 0.5, }}>
//                                         <Box 
//                                             sx={{ 
//                                                 width:'100%',
//                                                 height: 40, 
//                                                 fontSize: 22,
//                                                 display: 'flex',
//                                                 justifyContent: 'start',
//                                                 backgroundColor: 'white',
//                                                 borderRadius: 5,
//                                                 boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
//                                             }}>
//                                             <Box sx={{ height: 40, }}>
//                                                 <img style={{ height: '100%', }} alt="icon" src={sales} />
//                                             </Box>
//                                             <Typography>
//                                                 <Box
//                                                     sx={{
//                                                         width: "100%",
//                                                         paddingRight: 3,
//                                                         paddingLeft: 0.5,
//                                                         paddingTop: 0.5,
//                                                         fontSize: 18,
//                                                         color: '#8591B0',
//                                                         whiteSpace: 'nowrap',
//                                                         overflow: 'hidden', 
//                                                     }}>
//                                                         Sales and Retail Calculators
//                                                 </Box>
//                                             </Typography>
                                            
//                                         </Box>
//                                         <Box 
//                                         className={classNames({
//                                             'hidden-text': !categoryIndex[4].show,
//                                             'reveal-text': categoryIndex[4].show
//                                         })} >
//                                             {
//                                                 (categoryIndex[4].id === 4)?
//                                                 financialRoutes.subCategories[4].sub_calculator.map((r:any) => {
//                                                     return (
//                                                         <Box  
//                                                         onClick={()=>{ history.push(r.path) }} 
//                                                         sx={{ 
//                                                             ...mobileText 
//                                                         }}> {r.name} </Box>);
//                                                 })
//                                                 :null
//                                             }
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </div>
//                         }
                        
//                     </Box>
//                 </Box>
//             </Box>
//             <ResponsiveSliderSmall/>
//         </>
//     );
// }

// export { FinanceOptions }

import React, { useState } from 'react'
import { Typography, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

import { useHistory } from "react-router-dom";
import iconLine from '../../common/assets/line.svg';

import { Slide } from '../slider/slider'
import { ResponsiveSliderSmall }  from '../slider/ResponsiveSlider';

import invest_and_saving_icon from '../../common/assets/invest_and_savings_icon.svg';
import money_tax_icon from '../../common/assets/money_tax_icon.svg';
import mortage_icon from '../../common/assets/mortage_icon.svg';
import retirement_calc_icon from '../../common/assets/retirement_calc_icon.svg';
import sales from '../../common/assets/sales.svg';
import Slider from "react-slick";
import { financialRoutes } from '../../routes/routes';
import {
    slider_box_content_wrapper_style,
    boxStyle,
    categoryHeaderShadow
} from '../../styling/SliderStyle';

import { CustomNextArrow } from '../custom/sliderArrows/CustomNextArrow';
import { CustomPrevArrow } from '../custom/sliderArrows/CustomPrevArrow';
import { parse } from 'path/posix';

import { mobileText } from '../../styling/textStyle'

var classNames = require('classnames');

const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive:[
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
    ]
};

function FinanceOptions(){
    const history = useHistory()


    return(
        <>
            <Box 
                sx={{ 
                    height: 300,
                    display:{
                        lg: 'flex',
                        md: 'flex',
                        sm: 'none',
                        xs: 'none'
                    },
                    justifyContent: 'center',
                    width:'100%'
                }} className="container mt-4">
                <Box sx={{ width:'100%' }}>
                    <Slider {...settings}>
                        <div style={{ width: '330px' }}>
                            <Box sx={{ 
                                    display: 'flex',
                                    maxWidth: '100%',
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                            }}>
                                
                                <Box sx={{    
                                        border:'none',
                                        marginBottom: 2,
                                        backgroundColor: 'transparent',
                                        maxWidth: '100%',
                                        height: 250,
                                        borderRadius: 3,
                                        paddingTop: 1,
                                        paddingBottom: 0.5, }}>
                                    <Box 
                                        sx={{ 
                                            maxWidth:'100%',
                                            height: 30, 
                                            fontSize: 22,
                                            display: 'flex',
                                            justifyContent: 'start',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Investment & Saving Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller" >
                                        {
                                            financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    
                        <div style={{ width: '370px' }}>
                            <Box sx={{ 
                                    display: 'flex',
                                    width: '100%',
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                            }}>
                                
                                <Box sx={{    
                                        border:'none',
                                        marginBottom: 2,
                                        backgroundColor: 'transparent',
                                        maxWidth: '100%',
                                        height: 250,
                                        borderRadius: 3,
                                        paddingTop: 1,
                                        paddingBottom: 0.5, }}>
                                    <Box 
                                        sx={{ 
                                            width:'100%',
                                            height: 30, 
                                            fontSize: 22,
                                            display: 'flex',
                                            justifyContent: 'start',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Money, Pay, Expenditure & Tax Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller" >
                                        {
                                            financialRoutes.subCategories[1].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>


                        <div style={{ width: '370px' }}>
                            <Box sx={{ 
                                    display: 'flex',
                                    maxWidth: '100%',
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                            }}>
                                
                                <Box sx={{    
                                        border:'none',
                                        marginBottom: 2,
                                        backgroundColor: 'transparent',
                                        maxWidth: '100%',
                                        height: 250,
                                        borderRadius: 3,
                                        paddingTop: 1,
                                        paddingBottom: 0.5, }}>
                                    <Box 
                                        sx={{ 
                                            width:'100%',
                                            height: 30, 
                                            fontSize: 22,
                                            display: 'flex',
                                            justifyContent: 'start',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Loan Calculators
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller" >
                                        {
                                            financialRoutes.subCategories[2].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>

                        <div>
                            <Box sx={{ 
                                    display: 'flex',
                                    width: '100%',
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                            }}>
                                
                                <Box sx={{    
                                        border:'none',
                                        marginBottom: 2,
                                        backgroundColor: 'transparent',
                                        maxWidth: '100%',
                                        height: 250,
                                        borderRadius: 3,
                                        paddingTop: 1,
                                        paddingBottom: 0.5, }}>
                                    <Box 
                                        sx={{ 
                                            width:'100%',
                                            height: 30, 
                                            fontSize: 22,
                                            display: 'flex',
                                            justifyContent: 'start',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Retirement Calculators 
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller" >
                                        {
                                            financialRoutes.subCategories[3].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>

                        <div>
                            <Box sx={{ 
                                    display: 'flex',
                                    width: '100%',
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                            }}>
                                
                                <Box sx={{    
                                        border:'none',
                                        marginBottom: 2,
                                        backgroundColor: 'transparent',
                                        maxWidth: '100%',
                                        height: 250,
                                        borderRadius: 3,
                                        paddingTop: 1,
                                        paddingBottom: 0.5, }}>
                                    <Box 
                                        sx={{ 
                                            width:'100%',
                                            height: 30, 
                                            fontSize: 22,
                                            display: 'flex',
                                            justifyContent: 'start',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                        }}>
                                        <Box sx={{ height: 30, }}>
                                            <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
                                        </Box>
                                        <Typography sx={{width: '100%'}}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    paddingRight: 3,
                                                    paddingLeft: 0.5,
                                                    paddingTop: 0.5,
                                                    fontSize: 16,
                                                }}>
                                                    Sales and Retail Calculators 
                                            </Box>
                                        </Typography>
                                        
                                    </Box>
                                    <Box className="general-text-box app-scroller" >
                                        {
                                            financialRoutes.subCategories[4].sub_calculator.map((r:any) => {
                                                return (<Box className="div-link" onClick={()=>{ history.push(r.path) }} 
                                                sx={{ width: '100%', paddingBottom: 0.5,  fontSize: 16 }}> {r.name} </Box>);
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </Slider>
                    <Box>
                        <Slide />
                    </Box>
                    <Box >
                        <Box sx={{
                                    width: '100%',
                                    borderRadius: 3,
                                    color: "black",
                                    paddingBottom: 0.5,
                                }}>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <OptionsForSmallerScreens/>
        </>
    );
}

function OptionsForSmallerScreens(){
    const history = useHistory()
    const [categoryIndex, setCategoryIndex] = useState([
        {id: 0, show: true},
        {id: 1, show: false},
        {id: 2, show: false},
        {id: 3, show: false},
        {id: 4, show: false},
        {id: 5, show: false},
        {id: 6, show: false}
    ])

    const handleCategoryChange = (e:number)=>{
        
        const copyOfCategoryIndexData = categoryIndex;
        console.log(copyOfCategoryIndexData[0].id)
        for(var i = 0; i < copyOfCategoryIndexData.length; i++){
            if(copyOfCategoryIndexData[i].id === e){
                copyOfCategoryIndexData[i].show = !copyOfCategoryIndexData[i].show
            }
            else{
                copyOfCategoryIndexData[i].show = false
            }
        }
        setCategoryIndex([...copyOfCategoryIndexData])
    }
    return(
        <>
            {/* ********************************************** */}
            {/* ********************************************** */}
            {/* ********************************************** */}
            {/* ********************************************** */}

            {/* mobile */}
            <Box 
                className="container"
                sx={{
                    display:{
                        lg: 'none',
                        md: 'none',
                        sm: 'block',
                        xs: 'block',
                    }
                    
                }}>
                <Box sx={{ minWidth: 120 }} className="container">
                    <Box>
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[0].id) }}>
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={invest_and_saving_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Investment & Saving Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box  
                                            className={classNames({
                                                'hidden-text': !categoryIndex[0].show,
                                                'reveal-text': categoryIndex[0].show
                                            })} >
                                            {
                                                (categoryIndex[0].id === 0)?
                                                financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
                                                    return (
                                                    <Box  
                                                    onClick={()=>{ history.push(r.path) }} 
                                                    sx={{ 
                                                        ...mobileText 
                                                    }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }

                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[1].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={money_tax_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Money, Pay, & Tax Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box 
                                        className={classNames({
                                            'hidden-text': !categoryIndex[1].show,
                                            'reveal-text': categoryIndex[1].show
                                        })} >
                                            {
                                                (categoryIndex[1].id === 1)?
                                                financialRoutes.subCategories[1].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[2].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={mortage_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Loan Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box 
                                        className={classNames({
                                            'hidden-text': !categoryIndex[2].show,
                                            'reveal-text': categoryIndex[2].show
                                        })} >
                                            {
                                                (categoryIndex[2].id === 2)?
                                                financialRoutes.subCategories[2].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[3].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={retirement_calc_icon} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Retirement Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box 
                                        className={classNames({
                                            'hidden-text': !categoryIndex[3].show,
                                            'reveal-text': categoryIndex[3].show
                                        })} >
                                            {
                                                (categoryIndex[3].id === 3)?
                                                financialRoutes.subCategories[3].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        {
                            <div>
                                <Box sx={{ 
                                    display: 'flex',
                                    width: "100%",
                                    border: 'none',
                                    justifyContent: 'center',
                                    borderColor: 'green'
                                }}
                                    onClick={() => { handleCategoryChange(categoryIndex[4].id) }}
                                >
                                    
                                    <Box sx={{
                                            border:'none',
                                            marginBottom: 2,
                                            backgroundColor: 'transparent',
                                            width: "100%",
                                            borderRadius: 3,
                                            paddingTop: 1,
                                            paddingBottom: 0.5, }}>
                                        <Box 
                                            sx={{ 
                                                width:'100%',
                                                height: 40, 
                                                fontSize: 22,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                boxShadow: '0px 5px 20px 1px rgba(0, 0, 0, 0.1)',
                                            }}>
                                            <Box sx={{ height: 40, }}>
                                                <img style={{ height: '100%', }} alt="icon" src={sales} />
                                            </Box>
                                            <Typography>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        paddingRight: 3,
                                                        paddingLeft: 0.5,
                                                        paddingTop: 0.5,
                                                        fontSize: 18,
                                                        color: '#8591B0',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden', 
                                                    }}>
                                                        Sales and Retail Calculators
                                                </Box>
                                            </Typography>
                                            
                                        </Box>
                                        <Box 
                                        className={classNames({
                                            'hidden-text': !categoryIndex[4].show,
                                            'reveal-text': categoryIndex[4].show
                                        })} >
                                            {
                                                (categoryIndex[4].id === 4)?
                                                financialRoutes.subCategories[4].sub_calculator.map((r:any) => {
                                                    return (
                                                        <Box  
                                                        onClick={()=>{ history.push(r.path) }} 
                                                        sx={{ 
                                                            ...mobileText 
                                                        }}> {r.name} </Box>);
                                                })
                                                :null
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        }
                        
                    </Box>
                </Box>
            </Box>
            <ResponsiveSliderSmall/>
        </>
    );
}

export { FinanceOptions }