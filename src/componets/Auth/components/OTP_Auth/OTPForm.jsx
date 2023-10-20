import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress, Typography } from '@mui/material';
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

    const schema = yup.object().shape({
        code: yup.string()
            .matches(/^\d{6}$/, 'Please enter a 6-digit code.')
            .required('Please enter your code.'),
        username: yup.string()
            .required('Please enter your username.')
    });
    const form = useForm({
        defaultValues: {
            code: ''
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
                        We've sent you a code in your email
                    </Typography>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <InputField name="username" label="Username" form={form}></InputField >
                            </Grid>
                            <Grid item xs={12}>
                                <InputField name="code" label="Code" form={form}></InputField >
                            </Grid>
                        </Grid>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Xác thực
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default OTPForm