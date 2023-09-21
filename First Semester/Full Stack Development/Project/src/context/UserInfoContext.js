import { createContext, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {
  const [userEmail, setUserInfo] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userEmail, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
