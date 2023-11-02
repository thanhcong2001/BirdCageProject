import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSnackbar } from "notistack"

const loginURL = 'http://tainguyen58-001-site1.ftempurl.com/api/Authentication/login'

const loginQuery = async ({ username, password }) => {
    try {
        const response = await axios.post(loginURL, { username, password })
        const { token } = response.data
        console.log("login: ",response.data);  
        localStorage.setItem('token', JSON.stringify(token));
        return response.data
    } catch (error) {
        throw error
    }
}

const useAuth = () => {
    const { enqueueSnackbar } = useSnackbar();
    const loginMutation = useMutation({
        mutationFn: loginQuery,
        onSuccess: () => {
            enqueueSnackbar("Login success", { variant: 'info' })
            window.location.reload();
        },
        onError: () => {
            enqueueSnackbar("Wrong username or password", { variant: 'error', preventDuplicate: true })
        }
    })
    return { loginMona: loginMutation.mutate, loginPending: loginMutation.isPending }

}

export default useAuth