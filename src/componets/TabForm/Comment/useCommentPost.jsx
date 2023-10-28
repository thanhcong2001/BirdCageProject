import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const commentPost = async (obj) => {

    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const { id, rating, reviewText } = obj
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    };
    try {
        const response = await axios.post(`http://tainguyen58-001-site1.ftempurl.com/api/Product/review-product/${id}`, { rating, reviewText }, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

const useCommentPost = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const commentPostCon = useMutation({
        mutationFn: commentPost,
        onSuccess: () => {
            enqueueSnackbar("Đánh giá thành công", { variant: 'info' })
            queryClient.invalidateQueries({ queryKey: ['birdCage'] });
        }
    })
    return { comment: commentPostCon.mutate, isPending: commentPostCon.isPending }
}

export default useCommentPost