import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/ContextShare';

function Addproject() {

    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
      handleCancel()
    }
    const handleShow = () => setShow(true);

    const {setAddResponse}= useContext(addResponseContext)
    const [ projectDetails , setProjectDeatails]=useState({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })
    console.log(projectDetails);

    //preview
    const [preview , setPreview] = useState("")
    console.log(preview);

    //token
    const [token , setToken]= useState("")
    console.log(token);
    
    //key form project-image
    const [key , setKey] = useState(1)

    const handleFile = (e)=>{
      console.log(e.target.files[0]);
      setProjectDeatails({...projectDetails,projectImage:e.target.files[0]})
    }

    useEffect(()=>{
      if(projectDetails.projectImage){
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])


    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[])

     const handleCancel =()=>{
      setProjectDeatails({
        title:"",
        language:"",
        github:"",
        website:"",
        overview:""
      })
      setPreview("")

      // to clear the image 
      if(key==1){
        setKey(0)
      }
      else{
        setKey(1)
      }
     }
    
     const handleAdd= async()=>{
      const {title, language, github, website, overview,projectImage} = projectDetails
      if(!title || !language || !github || !website || !overview || !projectDetails || !projectImage) {
        toast.info('plaease fill the form')
      }
      else{

        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projectImage",projectImage)



       if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
          if(result.status==200){
           toast.success('Added Successfully')
           setTimeout(()=>{
            handleClose()
           },2000)
           setAddResponse(result)
          
          }
          else if(result.status==406){
            toast.warning(result.response.data)
            handleClose()
          }
          else{
            toast.error('something went wrong')
            handleClose()
          }
        
         
       }
       else{
        toast.warning('Please login')
       }
        
      }
     }
    
  
  return (
    <>
    <button className='btn btn-warning rounded-0'  onClick={handleShow}>Add Project</button>


    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="contain-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="projectImage">
                            <input id='projectImage' type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)}  />
                            <img src={preview?preview:"https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-image-upload_516790-2259.jpg"} alt=""  className='w-100' />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 mt-2">
                            <input type="text" placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e)=>setProjectDeatails({...projectDetails,title:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e)=>{setProjectDeatails({...projectDetails,language:e.target.value})}} />
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='GitHub' className='form-control' value={projectDetails.github} onChange={(e)=>{setProjectDeatails({...projectDetails,github:e.target.value})}}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e)=>{setProjectDeatails({...projectDetails,website:e.target.value})}} />
                        </div>
                        <div className="mb-3">
                            <textarea rows={5} className='form-control' placeholder='Overview'  value={projectDetails.overview} onChange={(e)=>{setProjectDeatails({...projectDetails,overview:e.target.value})}}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
      </Modal>

     
    </>
  )
}

export default Addproject