import React from "react";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <Navbar />
      <Chatbot />
    </DashboardContainer>
  );
}

export default Dashboard;
