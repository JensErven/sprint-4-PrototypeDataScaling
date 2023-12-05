import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/authService";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await AuthService.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  };

  const register = async (username, email, password) => {
    const newUser = await AuthService.register(username, email, password);
    setUser(newUser);
    // Store user data in local storage after registration if needed
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    // Clear user data from local storage on logout
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
