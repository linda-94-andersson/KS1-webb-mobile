import axios from "axios";

export const getTimeLogs = async () => {
  const { data } = await axios.get(
    `http://${import.meta.env.VITE_SOME_KEY}/timelogs`
  );
  console.log(data, " getTimelogs");
  return data;
};

export const addTimeLogs = async (
  id,
  startDate,
  startTime,
  endTime,
  taskId
) => {
  const res = await axios.request({
    method: "post",
    url: `http://${import.meta.env.VITE_SOME_KEY}/timelogs`,
    data: {
      id: id,
      startDate: startDate,
      startTime: startTime,
      endTime: endTime,
      taskId: taskId,
    },
  });
  return res.data;
};

export const deleteTimeLogs = async (id) => {
  const { data } = await axios.delete(
    `http://${import.meta.env.VITE_SOME_KEY}/timelogs/${id}`
  );
  return;
};

export const changeTimeLogs = async (id, startTime, endTime) => {
  const { data } = await axios.request({
    method: "patch",
    url: `http://${import.meta.env.VITE_SOME_KEY}/timelogs/${id}`,
    data: {
      id: id,
      startTime: startTime,
      endTime: endTime,
    },
  });
  return data;
};
