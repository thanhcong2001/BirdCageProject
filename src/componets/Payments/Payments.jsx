import { useMutation, useQueryClient } from '@tanstack/react-query';
import useBirdCart from 'api/apiProduct/useBirdCart';
import axios from 'axios';
import CartItem from 'componets/Cart/CartItem';
import { setInformation } from 'componets/Cart/cartSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import './payment.css';
import VoucherCode from './Voucher/VoucherCode';



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
        deleteItemCart.mutate(itemId)
    }

    const onChange = (value, id) => {

        if (value === 0) {
            handleDelete(id)
        }
    };

    const { voucherCode } = useSelector(state => state.products)


    const totalPrice = cartItems?.reduce((total, item) => total + item.productViewModel.price * item.count, 0);
    const shippingFee = 30000
    const [totalPriceAfterShip] = useState(totalPrice + shippingFee)

    const dispatch = useDispatch()
    const handleSubmit = async (value) => {
        dispatch(setInformation({ totalPriceAfterShip, vourcherCode: voucherCode, ...value }))
        nav('/cart/payment/payment-methods')
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
                                    <CartItem key={index} i={i} onChange={onChange} handleDelete={handleDelete} quantityEdit={false} />
                                ))}
                            </tbody>
                            <div className='button_cart'>
                            </div>
                        </table>
                        <div className='price-total'>
                            <div>Tổng giá đơn hàng</div>
                            <div>
                                {totalPriceAfterShip} VNĐ
                            </div>
                        </div>
                        <div className='line-bottom'></div>
                    </div>
                </div>
                {/* thong tin giao hang */}
                <div className='payment-information'>
                    <div className="information-tilte">
                        2. Thông tin nhận hàng
                    </div>
                    <div className='line-bottom'></div>
                    <div className='information-form'>
                        <PaymentForm onSubmit={handleSubmit} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <span>Bạn có thể chọn phương thức thanh toán ở bước sau</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payments