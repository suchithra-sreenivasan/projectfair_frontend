import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';

function Header() {
  const { setLoginResponse} = useContext(loginResponseContext)
  const nagviate = useNavigate()
  const [token ,setToken] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const handleLogout=()=>{
    setLoginResponse(false)
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    nagviate('/')

  }
  return (
    <>
    <Navbar className="bg-success d-flex align-items-center">
    <Container>
      <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand className='text-white'>
          <span className='fs-3 ms-4'><FontAwesomeIcon icon={faStackOverflow} />
           PROJECT FAIR</span>
          </Navbar.Brand>
      </Link>
      <button className='btn btn-warning ms-auto rounded-0' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} /> Log out</button>
    </Container>
  </Navbar></>
  )
}

export default Header