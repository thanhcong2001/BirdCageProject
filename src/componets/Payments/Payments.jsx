import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Radio, Space } from 'antd';
import useBirdCart from 'api/apiProduct/useBirdCart';
import axios from 'axios';
import CartItem from 'componets/Cart/CartItem';
import { useEffect, useState } from 'react';
import './payment.css';
import PaymentForm from './PaymentForm';
import usePayment from './usePayment';
import { useNavigate } from 'react-router-dom';



const Payments = () => {

    const token = localStorage.getItem('token');
    const queryClient = useQueryClient()
    const formattedToken = token?.replace(/"/g, '');
    const { cartItem } = useBirdCart(formattedToken)
    const cartItems = cartItem?.shoppingCarts
    const nav = useNavigate()
    async function deleteItem(itemId) {
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        return axios.delete(`http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/remove-from-cart/${itemId}`, { headers })
    }
    const deleteItemCart = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItem'] });
        },
        onError: (error) => {
            console.error('Error while deleting item:', error);
        }
    });
    const handleDelete = (itemId) => {
        console.log(itemId)
        deleteItemCart.mutate(itemId)
    }

    const onChange = (value, id) => {

        if (value === 0) {
            handleDelete(id)
        }
    };


    const totalPrice = cartItems?.reduce((total, item) => total + item.productViewModel.price * item.count, 0);
    const shippingFee = 30000
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const onChangeRadio = (e) => {
        setPaymentMethod(e.target.value);
    };
    const { checkout, isLoading } = usePayment()

    const handleSubmit = async (value) => {
        const { phone, streetAddress, city } = value
        const infoS = {
            phone,
            streetAddress,
            city,
            paymentMethod
        }
        try {
            await checkout(infoS)
        } catch (error) {
            console.log('Failed to login', error);
        }
    }
    if (!token || !cartItems?.length > 0) {
        nav('/cart')
    }

    return (
        <div className="payment-container">
            <div className="payment-wrapper">
                <div className='payment-title'>
                    <h2 className='title-main'>Thanh toán</h2>
                </div>
                {/* liet ke don hang */}
                <div className="cart-info">
                    <div className="cart-tilte">
                        1. Tóm tắt đơn hàng
                    </div>
                    <div className='line-bottom'></div>
                    <div>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <td>SẢN PHẨM</td>
                                <td></td>
                                <td>GIÁ</td>
                                <td>SỐ LƯỢNG</td>
                                <td>TỔNG CỘNG</td>
                                <td></td>
                            </thead>
                            <tbody>
                                {cartItems?.map((i, index) => (
                                    <CartItem key={index} i={i} onChange={onChange} handleDelete={handleDelete} />
                                ))}
                            </tbody>
                            <div className='button_cart'>
                            </div>
                        </table>
                        <div className='price-total'>
                            <div>Tổng giá đơn hàng</div>
                            <div>
                                {totalPrice + shippingFee} VNĐ
                            </div>
                        </div>
                        <div className='line-bottom'></div>
                    </div>
                </div>
                {/* phuong thuc thanh toan */}
                <div className="payment-method">
                    <div className="method-tilte">
                        2. Phương thức thanh toán
                    </div>
                    <div className="method-confirm">
                        <Radio.Group onChange={onChangeRadio} value={paymentMethod}>
                            <Space direction="vertical">
                                <Radio value={'COD'}>Thanh toán khi nhận hàng</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
                {/* thong tin giao hang */}
                <div className='payment-information'>
                    <div className='line-bottom'></div>
                    <div className="information-tilte">
                        3. Thông tin nhận hàng
                    </div>
                    <div className='line-bottom'></div>
                    <div className='information-form'>
                        <PaymentForm onSubmit={handleSubmit} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payments