import axios from "axios";

const getTasks = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/tasks`);
    console.log(data, " getTasks");
    return data;
}

export default getTasks;