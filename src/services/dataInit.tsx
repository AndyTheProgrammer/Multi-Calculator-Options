/**
 * 
 * This function preloads data need
 * 
 */

 import { axiosInstance} from "./axiosInstance";

 async function dataInit(){
   
     try{
         const { data } = await axiosInstance.get('/general/getCategories');
         var msg:any = data.statusDescription;

         if(msg === "success"){
          
            // const webdata = JSON.parse(localStorage.webdata)
            // console.log("Localstorage data")
            // console.log(webdata);
            return true
         }else{
             return false
         }
     }
     catch(error){
         return error
     }
 }

 async function dataInit2(){
   
    try{
        const { data } = await axiosInstance.get('/general/getCategories');
        var msg:any = data.statusDescription;

        if(msg === "success"){
           localStorage.webdata = JSON.stringify(data.message);
           // const webdata = JSON.parse(localStorage.webdata)
           // console.log("Localstorage data")
           // console.log(webdata);
           return true
        }else{
            return false
        }
    }
    catch(error){
        return error
    }
}

 
 export { dataInit }