import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getTimeLogs } from "../data/getTimeLogs";

const TimeLogContext = React.createContext();
const TimeLogDispatchContext = createContext(null);

export function useTimeLog() {
  return useContext(TimeLogContext);
}

export function useTimeLogDispatch() {
  return useContext(TimeLogDispatchContext);
}

export function TimeLogProvider({ children }) {
  const initialState = [];

  const [timeLogs, setTimeLogs] = useState(null);
  const [_, dispatch] = useReducer(timeLogReducer, initialState);

  function timeLogReducer(timeLogs, action) {
    switch (action.type) {
      case "added": {
        return [...timeLogs, action.timelogs];
      }
      case "changed": {
        return timeLogs.map((tl) => {
          if (tl.id === action.timelogs.id) {
            return action.timelogs;
          } else {
            return tl;
          }
        });
      }
      case "deleted": {
        return timeLogs.filter((tl) => tl !== action);
      }
      default: {
        return timeLogs;
      }
    }
  }

  const timeLogValue = useMemo(
    () => ({ timeLogs: timeLogs, setTimeLogs: setTimeLogs }),
    [timeLogs, setTimeLogs]
  );

  const getTimeLogData = async () => {
    const data = await getTimeLogs();
    setTimeLogs(data);
  };

  useEffect(() => {
    getTimeLogData();
  }, []);

  return (
    <TimeLogContext.Provider value={{ timeLogValue, getTimeLogData }}>
      <TimeLogDispatchContext.Provider value={{ dispatch }}>
        {children}
      </TimeLogDispatchContext.Provider>
    </TimeLogContext.Provider>
  );
}
