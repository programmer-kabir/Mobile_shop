import axios from "axios";
import { toast } from "react-toastify";

export const SaveUser = (user) => {
  const data = {
    name: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
  };
axios.post(`${import.meta.env.VITE_LOCALHOST_KEY}/users`,data)
.then(response=>{
    const result = response.data
})
.catch(error=>{
    toast.error(error.message)
})
};