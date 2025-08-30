// src/hooks/UserTypeContext.js
import React, { createContext, useContext, useState } from "react";

const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const [type, setType] = useState(null);

  return (
    <UserTypeContext.Provider value={{ type, setType }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => useContext(UserTypeContext);
