import "./App.css";
import AppBar from "./components/shared/AppBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Welcome from "./pages/Welcome";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext"; // Update the path accordingly
import { FactsContextProvider } from "./contexts/FactsContext";
import PlantDetails from "./pages/PlantDetails";

function App() {
  const { user } = useContext(AuthContext); // Access the user context variable

  return (
    <Router>
      <div className="App h-screen w-screen">
        <Routes>
          <Route
            exact
            path="/welcome"
            element={user ? <Welcome /> : <Navigate to="/login" />} // Show Welcome page if user is logged in, otherwise redirect to Login
          />
          <Route
            exact
            path="/"
            element={
              user ? (
                <>
                  <FactsContextProvider>
                    <Home />
                  </FactsContextProvider>{" "}
                </>
              ) : (
                <Navigate to="/login" />
              )
            } // Show Home if user is logged in, otherwise redirect to Login
          />
          <Route
            exact
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />} // Show Login if user is not logged in, otherwise redirect to Home
          />
          <Route
            exact
            path="/register"
            element={!user ? <RegisterPage /> : <Navigate to="/" />} // Show Register if user is not logged in, otherwise redirect to Home
          />
          <Route
            exact
            path="/forgot-password"
            element={!user ? <ForgotPasswordPage /> : <Navigate to="/" />} // Show Forgot Password if user is not logged in, otherwise redirect to Home
          />
          <Route
            path="/plantdetails/:id"
            element={user ? <PlantDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>

    // <div className="App bg-slate-800 h-screen w-screen">
    //   <AppBar />
    //   <div id="content-container"></div>
    // </div>
  );
}

export default App;
