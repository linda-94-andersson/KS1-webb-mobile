import React, { useState, useMemo, useEffect, useContext } from "react";
import getUsers from "../data/getUsers";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const testing = async () => {
    const data = await getUsers();
    console.log(data, " this is useUser data");
    setUser(data);
  };
  
  useEffect(() => {
    testing();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
