import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrderUrl = async (info) => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    try {
        const response = await axios.get(`https://tainguyen58-001-site1.ftempurl.com/api/User/order-history?pageIndex=${info}&pageSize=10`, { headers });
        return response.data;
    } catch (error) {

    }
}

const useOrderUser = (info) => {
    const { data: orderUser, isLoading, isError, error } = useQuery({ queryKey: ['orderUser', info], queryFn: () => fetchOrderUrl(info), keepPreviousData: true, staleTime: 60000 });
    return {
        orderUser,
        isLoading,
        isError,
        error,
    }
}

export default useOrderUser