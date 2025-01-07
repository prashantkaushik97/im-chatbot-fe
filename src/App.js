import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ element, isAuthenticated, redirectTo }) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  React.useEffect(() => {
    console.log("isAuthenticated state:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              {/* <button onClick={login}>Login</button>  */}
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <>
                  <Dashboard />
                  <button onClick={logout}>Simulate Logout</button> {/* Debug Logout */}
                </>
              }
              isAuthenticated={isAuthenticated}
              redirectTo="/"
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
