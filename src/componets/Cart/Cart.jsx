import React, { useState } from 'react';
import './Cart.css';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DiscountIcon from '@mui/icons-material/Discount';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

Cart.propTypes = {

};

function Cart({ initialQuantity, onQuantityChange }) {

    const [data, setdata] = useState([])
    const [quantity, setQuantity] = useState(initialQuantity || 1);
    const [list, setList] = useState([])

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div>
            <>
                <section className='cart-items'>
                    <div className='container d_flex'>
                        <div className='cart-details'>
                            <table>
                                <thead>
                                    <td>SẢN PHẨM</td>
                                    <td></td>
                                    <td>GIÁ</td>
                                    <td>SỐ LƯỢNG</td>
                                    <td>TỔNG CỘNG</td>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='product-img'>
                                            <HighlightOffIcon />
                                            <img className='img_cart' src="http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/06-7-300x300.jpg" alt="" />
                                        </td>
                                        <td>LỒNG TÀU TRÚC ĐEN</td>
                                        <td className='money'>5,050,000 ₫</td>
                                        <td>
                                            <button style={{ backgroundColor: '#f1f1f1', color: 'black', height: 40, width: 30, borderRadius: 0, borderWidth: 1, borderStyle: 'solid', borderColor: '#dddddd' }} onClick={handleDecrease}>-</button>
                                            <span style={{ paddingLeft: 18, paddingRight: 18, borderTopWidth: 1, borderStyle: 'solid', borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingBottom: 12, paddingTop: 9, borderColor: '#dddddd' }}>{quantity}</span>
                                            <button style={{ backgroundColor: '#f1f1f1', color: 'black', height: 40, width: 32, borderRadius: 0, borderWidth: 1, borderStyle: 'solid', borderColor: '#dddddd' }} className='quatity' onClick={handleIncrease}>+</button>
                                        </td>
                                        <td className='money'>10,100,000 ₫</td>
                                    </tr>
                                    <tr>
                                        <td><button className='bt-next'>TiẾP TỤC XEM SẢN PHẨM</button></td>
                                        <td><button className='bt-update'>CẬP NHẬT GIỎ HÀNG</button></td>
                                    </tr>
                                </tbody>
                                <div className='button_cart'>
                                </div>
                            </table>
                        </div>
                        <div className='cart-total'>
                            <div>
                                <div>
                                    <h3>TỔNG SỐ LƯỢNG</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                        <p>Tổng cộng</p>
                                        <p className='money'>10,100,000</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                        <p>Giao hàng</p>
                                        <p>Giao hàng miễn phí</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #d8d8d8' }}>
                                        <p>Tổng cộng</p>
                                        <p className='money'>10,100,000</p>
                                    </div>
                                    <button className='bt-next' style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px' }}>TIẾN HÀNH THANH TOÁN</button>
                                </div>
                                <div>
                                    <h5><DiscountIcon /> Mã ưu đãi</h5>
                                    <div style={{ borderTop: '3px solid #d8d8d8' }}>

                                    </div>
                                    <input style={{ width: '97%', height: '30px', marginTop: '15px' }} type="text" placeholder="Mã ưu đãi" />
                                    <button className='btn-voucher' style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px' }}>Áp dụng mã ưu đãi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </div>
    );
}

export default Cart;