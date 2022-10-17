import axios from "axios";

export const getTimelogs = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/timelogs`);
    console.log(data, " getTimelogs");
    return data;
}