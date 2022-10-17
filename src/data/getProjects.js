import axios from "axios";

export const getProjects = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/projects`);
    console.log(data, " getProjects");
    return data;
}