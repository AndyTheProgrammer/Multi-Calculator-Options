import { axiosInstance, converterRoute } from "../axiosInstance";
import { GeneralConverterInterface } from '../types/converterTypes'


async function allConverter(dataObject:GeneralConverterInterface){
    try{
        const { data } = await axiosInstance.post(converterRoute, dataObject);
        var msg:any = data.statusDescription;
        console.log("Monkey", data)
        if(msg === "success"){
            return data
        }else{
            return false
        }
    }
    catch(error){
        return error
    }
}

export { allConverter }