import axios from 'axios'

const axiosInstance:any = axios.create({ 
    baseURL: 'http://54.69.166.251:7282/api/calculator',
    
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    }
})

const converterRoute = "./converter"
const mathRoute = './math'
const othersRoute = '/other'

export { axiosInstance, converterRoute, mathRoute, othersRoute }