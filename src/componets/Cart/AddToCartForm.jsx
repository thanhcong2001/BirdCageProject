import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from 'componets/form-controls/QuantityField/index.jsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

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
        <div>
            <form style={{ display: 'flex' }} onSubmit={form.handleSubmit(handleSubmit)}>
                <div>
                    <QuantityField name="quantity" label="Quantity" form={form}></QuantityField>
                </div>
                <div>
                    <button
                        style={{ height: 40, marginLeft: 30, backgroundColor: '#8dc63f', marginTop: 15, fontSize: 16, fontWeight: 'bold', }}
                        type="submit"
                        variant="contained">
                        Thêm vào giỏ
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddToCartForm;