import { faFacebook, faGithub, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <>
    <div className='container-fluid bg-success mt-5'>
        <div className="row p-5">
            <div className="col-md-4 ps-0 ps-md-1  mt-3 mt-md-0">
                <h3 className='text-white  '>
                    <FontAwesomeIcon icon={faStackOverflow} />Project Fair</h3>
                    <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum labore provident iste necessitatibus minus laudantium nostrum laborum veniam, commodi eaque doloremque fugit porro aspernatur explicabo expedita corporis placeat ullam quaerat.</p>
            </div>
            <div className="col-md-2 ps-0 ps-md-4  mt-3 mt-md-0">
                <h3 className='text-white'>Links</h3>
                <div>Home</div>
                <div>Projects</div>
                <div>DashBoard</div>
            </div>
            <div className="col-md-2 ps-1 ps-md-1  mt-3 mt-md-0">
            <h3 className='text-white'>Guides</h3>
                <div>React</div>
                <div>React Bootstrap</div>
                <div>React Bootswatch</div>
            </div>
            <div className="col-md-4 ps-0 ps-md-1  mt-3 mt-md-0">
                <h3 className='text-white '>Contact Us</h3>
                <div className='d-flex align-items-center justify-space-between'>
                    <input type="text" placeholder='Enter E-Mail' className='form-control' />
                    <button className='btn btn-warning ms-3'>Subscribe</button>
                    </div>
                    <div className='text-white d-flex align-items-center justify-content-evenly fs-3 mt-3'>
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faGithub} />
                    </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer