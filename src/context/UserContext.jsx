import React, { useState, useMemo, useEffect, useContext } from "react";
import getUsers from "../data/getUsers";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const data = getUsers();
    setUser(data)
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
