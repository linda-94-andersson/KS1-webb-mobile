import axios from "axios";

export const getProjects = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/projects`);
    console.log(data, " getProjects");
    return data;
}

export const addProject = async (id, name, color, userId) => {
    const res = await axios.request({
        method: "post",
        url: `http://${import.meta.env.VITE_SOME_KEY}/projects`,
        data: {
            id: id,
            name: name,
            color: color,
            userId: userId,
        },
    });
    return res.data;
};