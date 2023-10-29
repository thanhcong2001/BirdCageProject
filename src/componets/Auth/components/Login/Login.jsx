import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm.jsx';
import useAuth from 'api/apiProduct/useAuth.jsx';
Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login({ setMode, MODE }) {

    const { loginMona, loginPending } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (value) => {
        const { password, identifier } = value
        try {
            await loginMona({ username: identifier, password })
        } catch (error) {
            console.log('Failed to login', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }



    return (
        <div>
            <LoginForm onSubmit={handleSubmit} loginPending={loginPending} setMode={setMode} MODE={MODE} />
        </div>
    );
}

export default Login;