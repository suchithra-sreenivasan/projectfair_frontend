import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import image from '../assets/home.png'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'

function Home() {

  const [isLogin , setIsLogin]=useState(false)

  //get 3 project in home page
  const [homeProject , setHomeProject]=useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectApi()
    console.log(result);
    setHomeProject(result.data)
  }
  console.log(homeProject);
  

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem('token')){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  },[])
  return (
    <>
    <div style={{ height: '100vh' }} className='bg-success p-5 d-flex justify-content-center align-items-center'>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <div>
                                <h1 style={{ fontSize: '70px', color: 'white' }}>Project Fair</h1>
                                <p>one stop destination for all software projects</p>
                               { isLogin==false   ? 
                               <Link to={'/login'}><button className='btn border text-light p-2 mt-3 ms-3'>Get Started <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffffff", }} /></button></Link>
                               :
                               <Link to={'/dashboard'}> <button className='btn border text-light p-2 mt-3 ms-3'>Manage Project <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffffff", }} /></button></Link>
                               }
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <img src={image} className='w-100' alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div >
              <h1 className='text-center my-5'>Explore Our Projects</h1>
              <div className='container'>
                <div className="row">
                  {homeProject?.map((item)=>(
                     <div className="col-md-4">
                     <ProjectCard project = {item}/>
                    </div>
                  ))
                   }
                </div>
                <Link to={'/projects'} className='text-danger'><p className='text-center my-4'>See more projects</p></Link>
              </div>
            </div>
    </>
  )
}

export default Home