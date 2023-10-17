import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'componets/form-controls/QuantityField/index.jsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { Box } from '@mui/material';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter quantity').min(1, 'Please enter at least 1').typeError('Please enter a number'),
    });

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema)
    })
    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    }

    return (

        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" label="Quantity" form={form}></QuantityField>
            <button
                style={{ height: 40, backgroundColor: '#8dc63f', marginTop: 18, fontSize: 16, fontWeight: 'bold',}}
                type="submit"
                variant="contained"
            >
                Thêm vào giỏ
            </button>
        </form>
    );
}

export default AddToCartForm;