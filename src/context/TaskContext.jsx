import React, { useContext, useEffect, useMemo, useState } from "react";
import getTasks from "../data/getTasks";

const TaskContext = React.createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [task, setTask] = useState(null);

  const value = useMemo(() => ({ task, setTask }), [task, setTask]);

  const getTaskData = async () => {
    const data = await getTasks();
    setTask(data);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
