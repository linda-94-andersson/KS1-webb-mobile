import axios from "axios";

const config = {
  headers: {
    "x-api-key": `${import.meta.env.VITE_URL_KEY}`,
    "X-BIN-META": false,
  },
};

export const getUsers = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/users`,
    config
  );
  return data;
};

export const addUser = async (id, name) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/users`,
    headers: {
      "x-api-key": `${import.meta.env.VITE_API_KEY}`,
      "X-BIN-META": false,
    },
    data: {
      id: id,
      name: name,
    },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(
    `http://${import.meta.env.VITE_URL_KEY}/users/${id}`,
    config
  );
  return;
};
