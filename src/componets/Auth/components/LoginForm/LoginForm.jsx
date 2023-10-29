import { yupResolver } from '@hookform/resolvers/yup';
import { SetMealRounded } from '@mui/icons-material';
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
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const defaultTheme = createTheme();

function LoginForm(props) {

    const schema = yup.object().shape({
        identifier: yup.string()
            .required('Please enter your username.'),
        password: yup.string()
            .required('Please enter your password.'),
    });

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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

    const { setMode, MODE } = props
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
                                <InputField name="identifier" label="Username" form={form}></InputField>
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField name="password" label="Password" form={form}></PasswordField>
                            </Grid>

                        </Grid>
                        {props.loginPending ? <Button
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
                            Đăng nhập
                        </Button>}

                    </form>
                    <Button onClick={() => setMode(MODE.OTP)}>Quên mật khẩu</Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginForm;