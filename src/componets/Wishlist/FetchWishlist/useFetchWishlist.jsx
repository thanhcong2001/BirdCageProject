import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const orderUserUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/User/order-history?pageIndex=0&pageSize=10'

const fetchWishlistUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/Product/from-wishlist'

const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    try {
        const response = await axios.get(fetchWishlistUrl, { headers });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const useFetchWishlist = () => {
    const { data: wishlistItems, isLoading, isError, error } = useQuery({ queryKey: ['wishlistItem'], queryFn: fetchWishlist });
    return {
        wishlistItems,
        isLoading,
        isError,
        error,
    }
}

export default useFetchWishlist