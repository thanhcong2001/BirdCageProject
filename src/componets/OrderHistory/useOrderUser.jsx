import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const orderUserUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/User/order-history?pageIndex=0&pageSize=10'

const fetchOrderUrl = async () => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    try {
        const response = await axios.get(orderUserUrl, { headers });
        return response.data;
    } catch (error) {

    }
}

const useOrderUser = () => {
    const { data: orderUser, isLoading, isError, error } = useQuery({ queryKey: ['orderUser'], queryFn: fetchOrderUrl });
    return {
        orderUser,
        isLoading,
        isError,
        error,
    }
}

export default useOrderUser