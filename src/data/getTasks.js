import axios from "axios";

const config = {
  headers: {
    "X-MASTER-KEY": `${import.meta.env.VITE_MASTER_KEY}`,
    "X-ACCESS-KEY": `${import.meta.env.VITE_API_KEY}`,
    "X-BIN-META": false,
  },
};

export const getTasks = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/tasks`,
    config
  );
  return data;
};

export const addTask = async (id, name, createdDate, projectId) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/tasks`,
    headers: {
      "X-MASTER-KEY": `${import.meta.env.VITE_MASTER_KEY}`,
      "X-ACCESS-KEY": `${import.meta.env.VITE_API_KEY}`,
      "X-BIN-META": false,
    },
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
    `http://${import.meta.env.VITE_URL_KEY}/tasks/${id}`,
    config
  );
  return;
};
