import axios from "axios";


// communicate to backend 
//also automatically transforms data to and from JSON
export const commonApi = async(httpRequest , url , reqBody, reqHeader)=>{
    const reqConfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader? reqHeader :{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then((result)=>{
        return result
        
    }).catch((err)=>{
        return err
        
    })
}