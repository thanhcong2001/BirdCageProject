import React from 'react'
import ResetPasswordForm from './ResetPasswordForm';
import { useSelector } from 'react-redux';
import useResetPassword from './useResetPassword';

const ResetPassword = () => {

    const { emailConfirm } = useSelector(state => state.products)


    const { reset, resetLoading } = useResetPassword()

    if (!emailConfirm) {
        return <div>
            You dont have permission to go here
        </div>
    }

    const handleSubmit = async (value) => {
        const { token, password, confirmPassword } = value
        const dataa = {
            token,
            password,
            confirmPassword,
            email: emailConfirm
        }
        try {
            await reset(dataa)
        } catch (error) {
            console.log('Failed to register', error);
            // enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    return (
        <div>
            <ResetPasswordForm onSubmit={handleSubmit} resetLoading={resetLoading} />
        </div>
    )
}

export default ResetPassword
