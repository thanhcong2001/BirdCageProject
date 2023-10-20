import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const cartUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart'

const getDataFromCart = async (token) => {
    console.log(token)
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const response = await axios.get(cartUrl, { headers });
    return response.data;
}

const useBirdCart = (token) => {
    const { data: cartItem, isLoading, isError, error } = useQuery({ queryKey: ['cartItem'], queryFn: () => getDataFromCart(token) });
    console.log(cartItem)
    return { cartItem }
}

export default useBirdCart