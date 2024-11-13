import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'

function Projects() {

  const [allProject , setAllProject ]= useState([])
  const [token , setToken] = useState("")
  const [searchKey , setSearchKey] = useState("")

  
  const getAllProject= async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectApi(searchKey,reqHeader)
      // console.log(result);
      setAllProject(result.data);
    }
   
  }

  console.log(allProject);

  console.log(token);

  console.log(searchKey);
  
  
  useEffect(()=>{
    getAllProject()
  },[searchKey])
  
  useEffect(()=>{
    
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
      <Header />
      <div >
        <h2 className='text-center my-5'>All Projects</h2>

        {/* not login */}

        {!token ? <div className='container-fluid'>
          <div className='row'>
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" className='w-25' alt="" />
              <h5 className='text-danger my-5'>Please <Link to={'/login'}>Login</Link> to see more projects</h5>
            </div>
            <div className="col-md-3"></div>

          </div>

        </div>

          :
          // {/* logged-in */}


          <div className='container-fluid my-5 pb-3'>
            <div className='row'>
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex ">
                <input type="text" placeholder='Search by Technologies' className='shadow form-control' onChange={(e)=>setSearchKey(e.target.value)} name="" id="" />
                <FontAwesomeIcon size='xl' icon={faMagnifyingGlass} style={{ marginLeft: '-35px', marginTop: '7px', color: 'lightgray' }} />

              </div>
              <div className="col-md-4"></div>

            </div>

          </div>}


        <div className="container-fluid p-md-5 p-4 mt-5">
          <div className="row">

            {allProject?.map((item) => (
              <div className="col-md-3">
                <ProjectCard project={item} />
              </div>
            ))
            }

          </div>
        </div>

      </div>
    </>

  )
}

export default Projects