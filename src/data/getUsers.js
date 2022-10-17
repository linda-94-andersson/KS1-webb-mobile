import axios from "axios";

export const getUsers = async () => {
    const {data} = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/users`);
    console.log(data, " getUsers");
    return data; 
}