import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';



const shipOrder = async (id) => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    try {
        const response = await axios.put(`http://tainguyen58-001-site1.ftempurl.com/api/Order/updateStatusToShipped/${id}`, {}, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}
const usePostShipApprove = (id) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const shipOrderF = useMutation({
        mutationFn: shipOrder,
        onSuccess: () => {
            enqueueSnackbar("Ship order success", { variant: 'info' })
            queryClient.invalidateQueries({ queryKey: ['order'] });

        },
        onError: () => {
            enqueueSnackbar("Can not approve", { variant: 'error', preventDuplicate: true })
        }
    })
    return { shipOrder: shipOrderF.mutate, shipOrderPending: shipOrderF.isPending }

}

export default usePostShipApprove