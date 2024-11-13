import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/ContextShare'

function Auth({register}) {

  const {setLoginResponse} = useContext(loginResponseContext)
  //for nagivate pages in jsx
  const navigate= useNavigate()

  //to register person
  const [userdetails, setuserdetails] = useState({
    username:"",
    email:"",
    password:""
  })

  // console.log(userdetails);

  const handleRegister = async()=>{
    const {username , email , password} = userdetails
    if(!username || !email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result =await registerApi(userdetails)
      // console.log(result);
      if(result.status== 200){
        setLoginResponse(true)
        toast.success('Registered successfully')
        setuserdetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
       
      }
      else{
        toast.error('Something went wrong')
      }
    }
  }
  

  // to login
  const handleLogin = async()=>{
    const {email,password} = userdetails
    if(!email || !password){
      toast.warning('Plaese fill the form')
    }
    else{
      const result = await loginApi({email,password})
      // console.log(result);

      if(result.status==200){
        toast.info('Login successfully')

        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        setuserdetails({
          username:"",
          email:"",
          password:""   
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
        
      }
      else if(result.status==406){
        //incorrect pass or email
        toast.warning(result.response.data)
        setuserdetails({
          username:"",
          email:"",
          password:""
        })
      }
      else{
        toast.error('Something went wrong')
      }
    }
  }

  
  return (
    <>
      <div className="container-fluid ">

        <div className="row p-5 d-flex align-items-center justify-content-center m-5 bg-success" style={{ borderRadius: '15px' }}>
          <Link to={'/'} style={{ textDecoration: 'none', marginTop: '-130px' }} ><h5>← Back to home</h5></Link>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <div className='row '>
              <div className="col-md-6 align-items-center justify-content-center">
                <img src="https://cdn-icons-png.flaticon.com/512/1161/1161386.png" alt="no image" className='w-75 h-50' />
              </div>
              <div className="col-md-6 mt-4 mt-md-0">
                <h4 className='text-white text-center '><FontAwesomeIcon icon={faStackOverflow} />Project Fair</h4>
                
                {!register ? <h5 className='text-white text-center mb-5'>Sign In to Your Account</h5>: 
                <h5 className='text-white text-center mb-5'>Sign Up to Your Account</h5>}
                <div className=''>
                  {register && <div><input type="text" placeholder='Username' className='form-control my-3 rounded-0' value={userdetails.username} onChange={(e)=>setuserdetails({...userdetails,username:e.target.value})} /></div>}  
                  <div><input type="text" placeholder='mail' className='form-control my-3 rounded-0' value={userdetails.email}  onChange={(e)=>setuserdetails({...userdetails,email:e.target.value})} /></div>
                 <div> <input type="text" placeholder='password' className='form-control my-3 rounded-0'  value={userdetails.password} onChange={(e)=>setuserdetails({...userdetails,password:e.target.value})}/></div>
                  {!register &&<div><button onClick={handleLogin} className='btn btn-warning rounded-0 w-100'>Login</button></div>}
                  {register && <div><button onClick={handleRegister} className='btn btn-warning rounded-0 w-100'>Register</button></div>}
                </div>
                {!register && <p className='text-white my-3 text-center'> New User? Click Here To<Link to={'/register'} className='text-danger '> Register</Link></p>}
                {register && <p className='text-white my-3 text-center'> Already a User? Click Here To<Link to={'/login'} className='text-danger '> login</Link></p>}
              </div>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Auth