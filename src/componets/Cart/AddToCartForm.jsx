import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import { Button } from 'antd';
import LoginForm from 'componets/Auth/components/LoginForm/LoginForm';
import QuantityField from 'componets/form-controls/QuantityField/index.jsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from "yup";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null, isLoading, token, id, handleAddToWishlist, wishlistLoading }) {
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
    const handleLoginCart =()=>{
        Navigate('/login')
    }




    return (
        <div>
            <form style={{ display: 'flex' }} onSubmit={form.handleSubmit(handleSubmit)}>
                <div>
                    <QuantityField name="quantity" label="Quantity" form={form}></QuantityField>
                </div>
                <div>
                    {token ?
                        <>
                            <button
                                style={{ height: 40, marginLeft: 30, backgroundColor: '#8dc63f', marginTop: 15, width: 150, fontSize: 16, fontWeight: 'bold' }}
                                type="submit"
                                variant="contained">
                                {isLoading ? <>
                                    <CircularProgress size={20} color='inherit' />
                                </>
                                    : 'Thêm vào giỏ'}
                            </button>
                            <Button
                                style={{ height: 40, marginLeft: 30, backgroundColor: '#FFD27A', marginTop: 15, width: 180, fontSize: 16, fontWeight: 'bold', color: 'white' }}
                                variant="contained"
                                onClick={() => handleAddToWishlist(id)}>
                                {wishlistLoading ? <>
                                    <CircularProgress size={20} color='inherit' />
                                </>
                                    : 'Thêm vào wishlist'}
                            </Button>
                        </>

                        : <button
                            style={{ height: 40, marginLeft: 30, backgroundColor: '#5b8029', marginTop: 15, fontSize: 16, fontWeight: 'bold' }}
                            type="submit"
                            disabled="true"
                            onClick={handleLoginCart}
                        >
                            Đăng nhập để thêm vào giỏ hàng
                        </button>}


                </div>
            </form>
        </div>
    );
}

export default AddToCartForm;