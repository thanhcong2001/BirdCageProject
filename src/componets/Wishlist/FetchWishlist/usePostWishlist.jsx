import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const token = localStorage.getItem('token');
const formattedToken = token?.replace(/"/g, '');
const headers = {
    Authorization: `Bearer ${formattedToken}`
};
const postWishlist = async (id) => {
    try {
        const response = await axios.post(`http://tainguyen58-001-site1.ftempurl.com/api/Product/add-to-wishlist/${id}`, {}, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

const usePostWishlist = () => {
    const { enqueueSnackbar } = useSnackbar();
    const postWish = useMutation({
        mutationFn: postWishlist,
        onSuccess: () => {
            enqueueSnackbar("add wishlist success", { variant: 'info' })
        },
        onError: (error) => {
            enqueueSnackbar("add wishlist failed" + error, { variant: 'error', preventDuplicate: true })
        }
    })
    return { wishlist: postWish.mutate, wishlistLoading: postWish.isPending }

}
export default usePostWishlist