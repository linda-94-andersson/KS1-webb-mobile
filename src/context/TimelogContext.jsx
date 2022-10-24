import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getTimeLogs } from "../data/getTimeLogs";

const TimelogContext = React.createContext();
const TimelogDispatchContext = createContext(null);

export function useTimeLog() {
  return useContext(TimelogContext);
}

export function useTimeLogDispatch() {
  return useContext(TimelogDispatchContext);
}

export function TimeLogProvider({ children }) {
  const initialState = [];

  const [timeLogs, setTimeLogs] = useState(null);
  const [timelog, dispatchTimeLog] = useReducer(timeLogReducer, initialState);

  function timeLogReducer(timeLogs, action) {
    switch (action.type) {
      case "added": {
        return [...timeLogs, action.timelogs];
      }
      case "changed": {
        return timeLogs.map((tl) => {
          if (tl === action.timelogs) {
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
    () => ({ timeLogs, setTimeLogs }),
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
    <TimelogContext.Provider value={{ timeLogValue, getTimeLogData }}>
      <TimelogDispatchContext.Provider value={{ dispatchTimeLog }}>
        {children}
      </TimelogDispatchContext.Provider>
    </TimelogContext.Provider>
  );
}
