import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice.js';
import LoginForm from '../LoginForm/LoginForm.jsx';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (value) => {
        console.log('Form Submit: ', value);

        try {
            const action = login(value);
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction);

            //close dialog
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