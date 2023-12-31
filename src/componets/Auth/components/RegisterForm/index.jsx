import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress, LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputField from 'componets/form-controls/InputField/index.jsx';
import PasswordField from 'componets/form-controls/PasswordField/index.jsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";


RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

const defaultTheme = createTheme();

function RegisterForm(props) {
    const { registerPending } = props
    const schema = yup.object().shape({
        fullName: yup.string()
            .required('Please enter your  name.'),
        email: yup.string()
            .required('Please enter your email.')
            .email('Please enter an valid email address.'),
        password: yup.string()
            .required('Please enter your password.')
            .min(6, 'Please enter at least 6 characters.'),
        retypePassword: yup.string()
            .required('Please retype your password.')
            .oneOf([yup.ref('password')], 'Password does not match.')
    });

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema)
    })
    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    }

    const { isSubmitting } = form.formState


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                {isSubmitting && <LinearProgress />}
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Create account
                    </Typography>

                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <InputField name="fullName" label="User Name" form={form}></InputField>
                            </Grid>
                            <Grid item xs={12}>
                                <InputField name="email" label="Email" form={form}></InputField>
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField name="password" label="Password" form={form}></PasswordField>
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField name="retypePassword" label="Retype Password" form={form}></PasswordField>
                            </Grid>
                        </Grid>
                        {registerPending ? <Button
                            disabled={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, opacity: 0.5 }}
                        >
                            <CircularProgress size={20} color='inherit' />
                        </Button> : <Button
                            disabled={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>}

                        {/* <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid> */}
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default RegisterForm;