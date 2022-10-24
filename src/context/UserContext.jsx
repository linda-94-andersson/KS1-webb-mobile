import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import { getUsers } from "../data/getUsers";

const UserContext = React.createContext();
const UserDispatchContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

export function UserProvider({ children }) {
  const initialState = [];

  const [users, setUser] = useState(null);
  const [user, dispatch] = useReducer(userReducer, initialState);

  function userReducer(users, action) {
    switch (action.type) {
      case "added": {
        return [...users, action.user];
      }
      case "changed": {
        return users.map((u) => {
          if (u.id === action.user.id) {
            return action.user;
          } else {
            return u;
          }
        });
      }
      case "deleted": {
        return users.filter((u) => u !== action);
      }
      default: {
        return users;
      }
    }
  }

  const userValue = useMemo(() => ({ users, setUser }), [users, setUser]);

  const getUserData = async () => {
    const data = await getUsers();
    setUser(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userValue, getUserData }}>
      <UserDispatchContext.Provider value={{ dispatch }}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
