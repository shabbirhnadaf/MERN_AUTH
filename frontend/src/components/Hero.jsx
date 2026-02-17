import React from 'react'
import { Container, Navbar, Nav, Button } from "react-bootstrap"; 
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <>
        <div className="bg-light py-5 text-center">
        <Container>
          <h1 className="mb-3">Welcome to MERN Authentication</h1>
          <p className="text-muted mb-4">
            Secure authentication system using MongoDB, Express, React, and Node.js
          </p>

          <div className="d-flex justify-content-center gap-3">
            <LinkContainer to='/login'>
            <Button variant="primary">
              Login
            </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
            <Button variant="outline-primary">
              Register
            </Button>
            </LinkContainer>
          </div>
        </Container>
      </div>

    </>
  )
}

export default Hero
