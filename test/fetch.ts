import axios from "axios"

export const fetch = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1")
    return res.data
}