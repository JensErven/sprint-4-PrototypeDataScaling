import "./App.css";
import AppBar from "./components/shared/AppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <div className="App h-screen w-screen">
        <Routes>
          {" "}
          <Route exact path="/welcome" element={<Welcome />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
        </Routes>
        {/* <AppBar /> */}
      </div>
    </Router>
    // <div className="App bg-slate-800 h-screen w-screen">
    //   <AppBar />
    //   <div id="content-container"></div>
    // </div>
  );
}

export default App;
