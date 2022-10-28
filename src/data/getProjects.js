import axios from "axios";

const config = {
  headers: {
    "X-ACCESS-KEY": `${import.meta.env.VITE_API_KEY}`,
    "X-BIN-META": false,
  },
};

export const getProjects = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/projects`,
    config
  );
  return data;
};

export const addProject = async (id, name, color, userId) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/projects`,
    headers: {
      "X-ACCESS-KEY": `${import.meta.env.VITE_API_KEY}`,
      "X-BIN-META": false,
    },
    data: {
      id: id,
      name: name,
      color: color,
      userId: userId,
    },
  });
  return res.data;
};

export const deleteProject = async (id) => {
  const { data } = await axios.delete(
    `http://${import.meta.env.VITE_URL_KEY}/projects/${id}`,
    config
  );
  return;
};
