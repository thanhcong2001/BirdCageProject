import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';



const addToCartCustomProduct = async (data) => {
    const { id, dataCustom } = data
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    try {
        const response = await axios.post(`http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/update-cart/${id}?count=1`, dataCustom, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}
const useAddBirdCustom = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const addTocartCustom = useMutation({
        mutationFn: addToCartCustomProduct,
        onSuccess: () => {
            enqueueSnackbar("Add to cart success", { variant: 'info' })
            queryClient.invalidateQueries({ queryKey: ['cartItem'] });
        },
        onError: () => {
            enqueueSnackbar("Can not approve", { variant: 'error', preventDuplicate: true })
        }
    })
    return { addCustom: addTocartCustom.mutate, addCustomPending: addTocartCustom.isPending }

}

export default useAddBirdCustom