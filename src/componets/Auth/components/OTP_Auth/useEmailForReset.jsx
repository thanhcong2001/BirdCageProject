import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { clearEmail, setEmail } from "componets/ProductCompare/productSlice";
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function encodeAtSymbol(email) {
    return email.replace(/@/g, "%40");
}
const emailAccountQuery = async (value) => {

    try {
        const { email } = value
        const newEmail = await encodeAtSymbol(email)
        const response = await axios.post(`http://tainguyen58-001-site1.ftempurl.com/api/Authentication/forgot-password?email=${newEmail}`)
        return response.data
    } catch (error) {
        throw error
    }
}

const takeOutEmail = (text) => {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    const emailMatch = text.match(emailPattern);
    let emailVariable = null;
    if (emailMatch) {
        emailVariable = emailMatch[0];
    }
    return emailVariable
}

const useEmailForReset = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const getEmail = useMutation({
        mutationFn: emailAccountQuery,
        onSuccess: (data) => {
            const email = takeOutEmail(data.message)
            console.log(email)
            dispatch(setEmail(email))
            enqueueSnackbar(data.message, { variant: 'success', preventDuplicate: true })
            nav('/reset')
        },
        onError: () => {
            enqueueSnackbar("Email not valid", { variant: 'error', preventDuplicate: true })
            dispatch(clearEmail())
        }
    })
    return { getEmailForReset: getEmail.mutate, getEmailForResetPending: getEmail.isPending }
}

export default useEmailForReset