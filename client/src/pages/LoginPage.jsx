import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import plants_background from "../assets/plants.jpg";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect to desired page upon successful login
    } catch (error) {
      console.error("Login failed: ", error);
      // Handle login failure, display error message, etc.
    }
  };
  const handleGoToRegister = () => {
    navigate("/register");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{ backgroundColor: "#0A393C" }}
    >
      <div className="absolute top-0 h-screen -z-1">
        <img
          src={plants_background}
          alt="Description"
          className="w-screen  object-cover bg-gradient-to-b  to-blue-[#11493e] h-full"
        />
      </div>
      <form
        onSubmit={handleLogin}
        className="w-4/5 bg-white p-6 rounded-lg flex flex-col gap-4 lg:w-1/4 md:w-1/2 shadow-xl shadow-teal-950 z-10"
        style={{ color: "#055F67" }}
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          />
          <button
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full px-2 text-black border border-gray-300"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <button
          type="submit"
          className="bg-[#055F67] text-white py-2 px-4 rounded w-full hover:bg-[#11493e] transition duration-300"
        >
          Login
        </button>
        <div>
          <p className="text-stone-700">
            No account yet?{" "}
            <span
              className="underline cursor-pointer"
              onClick={handleGoToRegister}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
