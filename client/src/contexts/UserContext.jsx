import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = (userData) => {
    setUserProfile(userData);
    if(userData)
      setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ userProfile, isLoggedIn, logIn, logOut,setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
