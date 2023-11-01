import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const orderUserUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/Order/page?pageIndex=0&pageSize=50'

const fetchOrderUrl = async () => {
    try {
        const response = await axios.get(orderUserUrl);
        return response.data;
    } catch (error) {

    }
}

const useFetchOrder = () => {
    const { data: order, isLoading, isError, error } = useQuery({ queryKey: ['order'], queryFn: fetchOrderUrl });
    return {
        order,
        isLoading,
        isError,
        error,
    }
}

export default useFetchOrder