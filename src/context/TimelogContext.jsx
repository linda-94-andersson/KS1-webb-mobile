import React, { useContext, useEffect, useMemo, useState } from "react";
import getTimelogs from "../data/getTimelogs";

const TimelogContext = React.createContext();

export function useTimelog() {
  return useContext(TimelogContext);
}

export function TimelogProvider({ children }) {
  const [timeLog, setTimeLog] = useState(null);

  const value = useMemo(() => ({ timeLog, setTimeLog }), [timeLog, setTimeLog]);

  const getTimeLogData = async () => {
    const data = await getTimelogs();
    setTimeLog(data);
  };

  useEffect(() => {
    getTimeLogData();
  }, []);

  return (
    <TimelogContext.Provider value={value}>{children}</TimelogContext.Provider>
  );
}
