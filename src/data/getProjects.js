import axios from "axios";

const getProjects = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/projects`);
    console.log(data, " getProjects");
    return data;
}

export default getProjects;