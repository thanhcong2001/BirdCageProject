import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm/index.jsx';
import useRegister from 'api/apiProduct/useRegister.jsx';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    // const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { registerMona, registerPending } = useRegister()

    const handleSubmit = async (value) => {
        try {
            await registerMona(value)
        } catch (error) {
            console.log('Failed to register', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} registerPending={registerPending} />
        </div>
    );
}

export default Register;