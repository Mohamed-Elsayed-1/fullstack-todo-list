import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";

export const useCustomQuery = ({ queryKey, url, config }) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);
      return data.data;
    },
  });
};
