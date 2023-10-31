import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const registerUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/User/register'

const registerQuery = async (data) => {
    try {
        const { email, fullName, password } = data
        const dataa = {
            userName: fullName,
            email,
            password
        }
        const response = await axios.post(registerUrl, dataa)
        return response.data
    } catch (error) {
        throw error
    }
}

const useRegister = () => {
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate()
    const registerMutation = useMutation({
        mutationFn: registerQuery,
        onSuccess: () => {
            enqueueSnackbar('Register successfully!!! 🎊', { variant: 'success' });
            nav('/')
        },
        onError: () => {
            enqueueSnackbar("Some thing wrong", { variant: 'error', preventDuplicate: true })
        }
    })
    return { registerMona: registerMutation.mutate, registerPending: registerMutation.isPending }

}

export default useRegister