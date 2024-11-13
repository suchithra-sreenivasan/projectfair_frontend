import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {

  const [userName, setUserName]= useState("")


  useEffect(()=>{
    
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserName(user.username); 


  },[])
   
   
    console.log(userName);
    
    
  return (
    <>
    <Header/>
    <div className='p-4'>
      <h3>Welcome <span className='text-warning'>{userName}</span></h3>
    </div>
    <Container>
      <Row>
        <Col sm={12} md={8}>
        <Myproject/>
        </Col>
        <Col sm={12} md={4}>
        <Profile/>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Dashboard