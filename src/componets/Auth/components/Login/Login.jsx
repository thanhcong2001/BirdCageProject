import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm.jsx';
import useAuth from 'api/apiProduct/useAuth.jsx';
Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {

    const { loginMona } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (value) => {
        const { password, identifier } = value
        try {
            await loginMona({ username: identifier, password })
            const { closeDialog } = props;
            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            console.log('Failed to login', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }



    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;