import React from "react"
import { Navbar, Container, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addbook")
  }
  const handleButton=()=>{
    sessionStorage.clear();
    navigate("/")
  }
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#">Book Store</Navbar.Brand>
        <Button variant="primary" type="submit" onClick={handleClick} >Add Book</Button>
        <Button variant="primary" type="submit" onClick={handleButton}>Logout</Button>
      </Container>
    </Navbar>
  );
}