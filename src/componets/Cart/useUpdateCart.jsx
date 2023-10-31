import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useSnackbar } from "notistack"

const updateCartUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/updatecart'

const updateCartQuery = async (value) => {
    try {
        const token = localStorage.getItem('token');
        const formattedToken = token?.replace(/"/g, '');
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        }
        const response = await axios.put(updateCartUrl, value, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

const useUpdateCart = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const updateCartMutation = useMutation({
        mutationFn: updateCartQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItem'] });
            enqueueSnackbar("Updated success", { variant: 'info' })
        },
        onError: () => {
            enqueueSnackbar("Cant update", { variant: 'error', preventDuplicate: true })
        }
    })
    return { updateCart: updateCartMutation.mutate, updatePending: updateCartMutation.isPending }

}

export default useUpdateCart