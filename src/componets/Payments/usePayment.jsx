import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom";

const checkoutURL = 'http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/checkout'

const checkoutQuery = async (data) => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    };
    try {
        const response = await axios.post(checkoutURL, data, { headers })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

const usePayment = (data) => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate()
    const checkoutMutation = useMutation({
        mutationFn: checkoutQuery,
        onSuccess: (data) => {
            if (data.sessionId) {
                window.location.href = data.redirectTo;
            } else {
                enqueueSnackbar("Đặt hàng thành công", { variant: 'info' })
                queryClient.invalidateQueries({ queryKey: ['cartItem'] });
                nav('/intro')
            }
        }
    })
    return { checkout: checkoutMutation.mutate, isLoading: checkoutMutation.isPending }

}

export default usePayment