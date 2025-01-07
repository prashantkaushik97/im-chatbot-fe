import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }

  &:active {
    background-color: #2a5f99;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://35.172.179.144:8081/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 

      const { token } = response.data; // Assuming the backend sends the token in `response.data.token`
      // console.log(response)
      // Store the token and user details in local storage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userEmail", email);
      
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Heading>Login</Heading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Login</Button>
    </LoginForm>
  );
}

export default Login;
