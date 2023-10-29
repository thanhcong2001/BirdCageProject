import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputField from 'componets/form-controls/InputField/index.jsx';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const defaultTheme = createTheme();


const OTPForm = (props) => {
    const { getEmailForResetPending } = props
    const schema = yup.object().shape({
        email: yup.string()
            .required('Please enter your email.')
            .email('Please enter an valid email address.'),
    });
    const form = useForm({
        defaultValues: {
            email: ''
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
                    <Typography component="h2" variant="h6">
                        Nhập email đã dùng để đăng kí tài khoản
                    </Typography>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <InputField name="email" label="Email" form={form}></InputField >
                            </Grid>
                        </Grid>
                        {getEmailForResetPending ? <Button
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
                            Xác thực
                        </Button>}
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default OTPForm