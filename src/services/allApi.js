import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register
export const registerApi = async(reqBody)=>{
    // /register is taken from router 
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//to add projects
export const addProjectApi = async(reqBody , reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

// get home project
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}

// get all project 
// query parameter = baseUrl?Key=value
export const allProjectApi = async(searchKey,reqHeader)=>{
    //query parameter = baseUrl?key=value
    // path parameter = baseUrl/id= baseUrl/:id
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}

//get user projects
export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

// to remove user project
export const removeUserProjectApi=async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
} 

// to update userprojects
export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userproject/${id}`,reqBody,reqHeader)
}

//update 
export const updateUserProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}