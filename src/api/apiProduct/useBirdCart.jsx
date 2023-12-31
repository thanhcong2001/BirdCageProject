import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const cartUrl = 'https://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart'

const getDataFromCart = async (token) => {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const response = await axios.get(cartUrl, { headers });
    return response.data;
}

const useBirdCart = (token) => {
    const { data: cartItem } = useQuery({ queryKey: ['cartItem'], queryFn: () => getDataFromCart(token) });
    return { cartItem }
}

export default useBirdCart