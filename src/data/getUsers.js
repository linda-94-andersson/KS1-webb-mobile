import axios from "axios";

export const getUsers = async () => {
    const { data } = await axios.get(`http://${import.meta.env.VITE_SOME_KEY}/users`);
    console.log(data, " getUsers");
    return data;
}

export const addUser = async (id, name) => {
    const res = await axios.request({
        method: "post",
        url: `http://${import.meta.env.VITE_SOME_KEY}/users`,
        data: {
            id: id,
            name: name,
        },
    });
    return res.data;
};