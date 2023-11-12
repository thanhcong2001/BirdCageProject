import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
const postVoucherURL = 'https://tainguyen58-001-site1.ftempurl.com/api/Voucher'

const addVoucher = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const formattedToken = token?.replace(/"/g, '');
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        }
        const response = await axios.post(postVoucherURL, data, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

const useAddVoucher = () => {
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate()
    const queryClient = useQueryClient()
    const addVoucherCodeForUser = useMutation({
        mutationFn: addVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['voucher'] });
            nav('/dashboard')
            enqueueSnackbar("Added success", { variant: 'info' })
        },
        onError: () => {
            enqueueSnackbar("Cant add new code", { variant: 'error', preventDuplicate: true })
        }
    })
    return { addVoucher: addVoucherCodeForUser.mutate, addVoucherPending: addVoucherCodeForUser.isPending }
}

export default useAddVoucher