import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputField from 'componets/form-controls/InputField/index.jsx';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import VoucherCode from "./Voucher/VoucherCode";

const PaymentForm = (props) => {

    const schema = yup.object().shape({
        phone: yup.string()
            .required('Please enter your phone number.')
            .matches(/^0\d{8,10}$/, 'Please enter a valid phone number start with 0.'),
        streetAddress: yup.string()
            .required('Please enter your street address.'),
        city: yup.string()
            .required('Please enter your city.'),
        name: yup.string()
            .required('Please enter your name.'),
    });

    const form = useForm({
        defaultValues: {
            phone: '',
            streetAddress: '',
            city: '',
            name: '',
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
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <InputField name="phone" label="Phone Number" form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField name="streetAddress" label="Address" form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField name="city" label="City" form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField name="name" label="Name" form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <VoucherCode />
                    </Grid>
                </Grid>
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Đặt hàng
                </Button>
            </form>
        </Box>
    )
}

export default PaymentForm