import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.nav`
  width: 100%;
  background: #6a11cb;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: white;
    text-decoration: none;
    font-size: 1em;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #ffd700;
    }
  }
`;

const Button = styled.button`
  background: #ffd700;
  color: #6a11cb;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ffc107;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/dashboard");
  };

  return (
    <NavbarContainer>
      <Logo>TravelBot</Logo>
      <NavLinks>
      
        <Button onClick={handleLogout}>Logout</Button>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
