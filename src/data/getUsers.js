import axios from "axios";

export const getUsers = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/users`
  );
  return data;
};

export const addUser = async (id, name) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/users`,
    data: {
      id: id,
      name: name,
    },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(
    `http://${import.meta.env.VITE_URL_KEY}/users/${id}`
  );
  return;
};
