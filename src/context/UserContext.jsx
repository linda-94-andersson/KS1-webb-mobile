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

  const [user, setUser] = useState(null);
  const [users, dispatch] = useReducer(userReducer, initialState);

  function userReducer(user, action) {
    switch (action.type) {
      case "added": {
        return user.push();
      }
      case "changed": {
        return user.map((u) => {
          if (u.id === action.user.id) {
            return action.user;
          } else {
            return u;
          }
        });
      }
      case "deleted": {
        return user.filter((u) => u.id !== action.id);
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

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
