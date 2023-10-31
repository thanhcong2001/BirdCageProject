import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputField from 'componets/form-controls/InputField/index.jsx';
import PasswordField from 'componets/form-controls/PasswordField/index.jsx';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const defaultTheme = createTheme();

function ResetPasswordForm(props) {

    const { resetLoading } = props

    const schema = yup.object().shape({
        token: yup.string()
            .required('Please enter your token received in your email.'),
        password: yup.string()
            .required('Please enter your password.')
            .min(6, 'Please enter at least 6 characters.'),
        confirmPassword: yup.string()
            .required('Please confirm your password.')
            .oneOf([yup.ref('password')], 'Password does not match.')
    });

    const form = useForm({
        defaultValues: {
            token: '',
            password: '',
            confirmPassword: '',
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
                    <Typography component="h2" variant="h5">
                        Điền thông tin cần thiết
                    </Typography>

                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <InputField name="token" label="Token" form={form}></InputField>
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField name="password" label="Password" form={form}></PasswordField>
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField name="confirmPassword" label="Confirm Password" form={form}></PasswordField>
                            </Grid>
                        </Grid>

                        {resetLoading ? <Button
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
                            Xác nhận
                        </Button>}

                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ResetPasswordForm;