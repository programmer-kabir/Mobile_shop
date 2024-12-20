import axios from "axios";
import { toast } from "react-toastify";

export const SaveUser = (user, selectStatus) => {
  console.log(user, selectStatus);
  const data = {
    name: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
    status: selectStatus || "Buyers",
  };
  axios
    .post(`${import.meta.env.VITE_LOCALHOST_KEY}/users`, data)
    .then((response) => {
      const result = response.data;
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
