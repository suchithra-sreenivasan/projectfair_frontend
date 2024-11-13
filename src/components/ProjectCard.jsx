import React from 'react'
import Card from 'react-bootstrap/Card';

import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

import { Col, Container, Row } from 'react-bootstrap';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Card style={{ width: '100%' }} className='shadow mt-4  border-0 rounded-0 '>
      <Card.Img variant="top" src={`${serverUrl}/upload/${project?.projectImage}`} onClick={handleShow} className='w-100' style={{height:'250px'}}/>
      <Card.Body>
        <Card.Title className='text-center'>{project?.title}</Card.Title>
      </Card.Body>
    </Card>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col md={6}>
              <img src={`${serverUrl}/upload/${project?.projectImage}`} alt="no image"  className='w-100'/></Col>
              <Col md={6}>
              <h4>Description</h4>
              <p>{project?.overview}</p>
              <h4>Techologies</h4>
              <p>{project?.language}</p>
              </Col>
            </Row>
          </Container>
          
        </Modal.Body>
        <Modal.Footer>
          <div className='me-auto d-flex '>
          <Link to={project?.website} target='_blank'><FontAwesomeIcon icon={faLink} className='fa-2x m-2 text-dark' /></Link>
          <Link to={project?.github}  target='_blank'><FontAwesomeIcon icon={faGithub} className='fa-2x m-2 text-dark'/></Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard