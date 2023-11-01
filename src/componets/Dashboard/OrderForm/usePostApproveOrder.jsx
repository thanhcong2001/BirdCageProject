import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';



const approveOrder = async (id) => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    try {
        const response = await axios.put(`http://tainguyen58-001-site1.ftempurl.com/api/Order/updateStatusToApproved/${id}`, {}, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}
const usePostApproveOrder = (id) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const approveOrderF = useMutation({
        mutationFn: approveOrder,
        onSuccess: () => {
            enqueueSnackbar("Approve success", { variant: 'info' })
            queryClient.invalidateQueries({ queryKey: ['order'] });

        },
        onError: () => {
            enqueueSnackbar("Can not approve", { variant: 'error', preventDuplicate: true })
        }
    })
    return { approveOrder: approveOrderF.mutate, approveOrderPending: approveOrderF.isPending }

}

export default usePostApproveOrder