import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
`;

function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <HomeContainer>
      {isLogin ? <Login /> : <Signup />}
      <button
        style={{ marginTop: "20px", background: "transparent", border: "none", color: "white" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </HomeContainer>
  );
}

export default Home;
