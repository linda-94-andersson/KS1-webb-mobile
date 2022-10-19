import axios from "axios";

export const getTasks = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/tasks`);
    console.log(data, " getTasks");
    return data;
}

export const addTask = async (id, name, projectId) => {
    const res = await axios.request({
        method: "post",
        url: `http://${import.meta.env.VITE_SOME_KEY}/tasks`,
        data: {
            id: id,
            name: name,
            projectId: projectId,
        },
    });
    return res.data;
}