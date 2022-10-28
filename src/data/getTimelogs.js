import axios from "axios";

export const getTimeLogs = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_URL_KEY}/timelogs`
  );
  return data;
};

export const addTimeLogs = async (id, startTime, endTime, taskId) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_URL_KEY}/timelogs`,
    data: {
      id: id,
      startTime: startTime,
      endTime: endTime,
      taskId: taskId,
    },
  });
  return res.data;
};

export const deleteTimeLogs = async (id) => {
  const { data } = await axios.delete(
    `http://${import.meta.env.VITE_URL_KEY}/timelogs/${id}`
  );
  return;
};

export const changeTimeLogs = async (id, endTime) => {
  const { data } = await axios.request({
    method: "patch",
    url: `http://${import.meta.env.VITE_URL_KEY}/timelogs/${id}`,
    data: {
      id: id,
      endTime: endTime,
    },
  });
  return data;
};
