import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice.js';
import RegisterForm from '../RegisterForm/index.jsx';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (value) => {
        console.log('Form Submit: ', value);

        try {
            //auto set username = email
            value.username = value.email;

            const action = register(value);
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction);

            //close dialog
            const { closeDialog } = props;
            if (closeDialog) {
                closeDialog();
            }

            // console.log('New user', user);
            enqueueSnackbar('Register successfully!!! 🎊', { variant: 'success' });
        } catch (error) {
            console.log('Failed to register', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;