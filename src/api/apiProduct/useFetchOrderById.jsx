import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const fetOrderDetailById = async (orderId) => {
    const response = await axios.get(`http://tainguyen58-001-site1.ftempurl.com/api/Order/${orderId}`);
    return response.data;
}


const useFetchOrderById = (orderId) => {

    const orderFetchOrder = useQuery({ queryKey: ['orderUserDetail'], queryFn: () => fetOrderDetailById(orderId) })
    const { data: orderDetail, isLoading } = orderFetchOrder
    return {
        orderDetail,
        isLoading,
    }
}

export default useFetchOrderById