import React from "react";
import styled from "styled-components";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup logic goes here!");
  };

  return (
    <SignupForm onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </SignupForm>
  );
}

export default Signup;
