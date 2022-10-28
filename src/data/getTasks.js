import axios from "axios";

export const getTasks = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/tasks`
  );
  return data;
};

export const addTask = async (id, name, createdDate, projectId) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/tasks`,
    data: {
      id: id,
      name: name,
      createdDate: createdDate,
      projectId: projectId,
    },
  });
  return res.data;
};

export const deleteTask = async (id) => {
  const { data } = await axios.delete(
    `http://${import.meta.env.VITE_URL_KEY}/tasks/${id}`
  );
  return;
};
