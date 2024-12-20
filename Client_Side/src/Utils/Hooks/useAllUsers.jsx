import { useQuery } from "@tanstack/react-query";


const useAllUsers = () => {
  const {
    refetch,
    data: users = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_LOCALHOST_KEY}/users`);
      return res.json();
    },
  });
  return [users, refetch, loading];
};

export default useAllUsers;
