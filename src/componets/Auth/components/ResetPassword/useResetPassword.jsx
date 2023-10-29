import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { clearEmail } from "componets/ProductCompare/productSlice";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const resetUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/Authentication/reset-password'

const resetQuery = async (value) => {

    try {
        const response = await axios.post(resetUrl, value)
        return response.data
    } catch (error) {
        throw error
    }
}

const useResetPassword = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate()
    const resetPasss = useMutation({
        mutationFn: resetQuery,
        onSuccess: (data) => {
            enqueueSnackbar("Reset success", { variant: 'success' })
            dispatch(clearEmail())
            nav('/intro')
        },
        onError: (error) => {
            enqueueSnackbar("Reset failed " + error, { variant: 'error', preventDuplicate: true })
        }
    })
    return { reset: resetPasss.mutate, resetLoading: resetPasss.isPending }
}

export default useResetPassword