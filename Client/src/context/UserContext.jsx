import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);  
  const URL = 'http://localhost:5000';
  const [token , setToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token')  : false);
  const value = {
    isLogin,
    setIsLogin, 
    token,
    setToken,
    URL
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
