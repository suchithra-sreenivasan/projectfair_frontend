import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import { updateUserProfileApi } from '../services/allApi';
import Collapse from 'react-bootstrap/Collapse';


function Profile() {
  const [open, setOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({

    username: "",
    email: "",
    password: "",
    profile: "",
    github: "",
    linkedin: "",
  })
  // console.log(userDetails);

  const [existingImage, setExistingImage] = useState("")

  const [preview, setPreview] = useState("")

  const [updateStatus, setUpdateStatus] = useState({})

  const handlefile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
  }

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      console.log(user);
      setUserDetails({
        ...userDetails,
        // id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        github: user.github,
        linkedin: user.linkedin
      })
      setExistingImage(user.profile)
    }

  }, [updateStatus])


  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  }, [userDetails.profile])



  const handleUpdate = async() => {
    const { username, email, password, github, linkedin, profile } = userDetails
    console.log( username, email, password, github, linkedin, profile );
    
    if (!github || !linkedin) {
      toast.info("Please add github and linkedIn")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("username", username),
        reqBody.append('email', email),
        reqBody.append('password', password),
        reqBody.append('github', github),
        reqBody.append('linkedin', linkedin),
        preview ? reqBody.append('profile', profile) : reqBody.append('profile', existingImage)

      const token = sessionStorage.getItem("token")
      if (preview) {

        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await updateUserProfileApi(reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('Successfully Updated')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setUpdateStatus(result)
        }
        else{
          toast.error('something went wrong')
        }


      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProfileApi(reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('Successfully Updated')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setUpdateStatus(result)
        }
        else{
          toast.error('something went wrong')
        }
      }
    }
  }
    // console.log(preview);

    return (
      <>
        <div className="p-4 shadow">
          <div className="d-flex justify-content-between">
            <h3 style={{ color: 'rgb(62,179,24)' }}>Profile</h3>
            <button className='btn'   onClick={() => setOpen(!open)} style={{ borderColor: 'rgb(160,98,192)', color: 'rgb(160,98,192)' }}>{open==true ?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />}</button>
          </div>

          <Collapse in={open}>
           <div>
              <div className="d-flex justify-content-center align-items-center flex-column mt-3">
                <label htmlFor="profileImage" className='mb-4 d-flex justify-content-center align-items-center'>
                  <input type="file" id='profileImage' style={{ display: 'none' }} onChange={(e) => handlefile(e)} />
                  {existingImage == "" ?
                    <img src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/5675/5675152.png"} alt="" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                    :
                    <img src={preview ? preview : `${serverUrl}/upload/${existingImage}`} alt="" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />}
                </label>
    
                <div className="w-100">
                  <div className="mb-3">
                    <input type="text" placeholder='gitHub' className='form-control' onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} value={userDetails?.github} />
                  </div>
                  <div className="mb-3">
                    <input type="text" placeholder='LinkedIn' className='form-control' onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} value={userDetails?.linkedin} />
                  </div>
                  <div className="mb-3">
                    <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                  </div>
                </div>
              </div>
           </div>
          </Collapse>
        </div>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </>
    )
  }

  export default Profile