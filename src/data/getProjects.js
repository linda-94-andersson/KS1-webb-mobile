import axios from "axios";

export const getProjects = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/projects`
  );
  return data;
};

export const addProject = async (id, name, color, userId) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/projects`,
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
    `http://${import.meta.env.VITE_URL_KEY}/projects/${id}`
  );
  return;
};
