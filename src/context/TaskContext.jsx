import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getTasks } from "../data/getTasks";

const TaskContext = React.createContext();
const TaskDispatchContext = createContext(null);

export function useTask() {
  return useContext(TaskContext);
}

export function useTaskDispatch() {
  return useContext(TaskDispatchContext);
}

export function TaskProvider({ children }) {
  const initialState = [];

  const [task, setTask] = useState(null);
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  function taskReducer(task, action) {
    switch (action.type) {
      case "added": {
        return task.push();
      }
      case "changed": {
        return task.map((t) => {
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
      }
      case "deleted": {
        return task.filter((t) => t.id !== action.id);
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  const value = useMemo(() => ({ task, setTask }), [task, setTask]);

  const getTaskData = async () => {
    const data = await getTasks();
    setTask(data);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <TaskContext.Provider value={{ value, getTaskData }}>
      <TaskDispatchContext.Provider value={{ dispatch }}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}
