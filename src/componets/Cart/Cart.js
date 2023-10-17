import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DiscountIcon from '@mui/icons-material/Discount';
import '../Cart/Cart.css';
export const Cart = () => {
    return (
        <div>
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
                                        {/* <HighlightOffIcon /> */}
                                        <img className='img_cart' src="http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/06-7-300x300.jpg" alt="" />
                                    </td>
                                    <td>LỒNG TÀU TRÚC ĐEN</td>
                                    <td>5,050,000 ₫</td>
                                    <td>2</td>
                                    <td>10,100,000 ₫</td>
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
                                    <p>10,100,000</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                    <p>Giao hàng 1</p>
                                    <p>10,100,000</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #d8d8d8' }}>
                                    <p>Tổng cộng</p>
                                    <p>10,100,000</p>
                                </div>
                                <button className='bt-next' style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px' }}>TIẾN HÀNH THANH TOÁN</button>
                            </div>
                            <div>
                                <h5><DiscountIcon /> Mã ưu đãi</h5>
                                <div style={{ borderTop: '3px solid #d8d8d8' }}>

                                </div>
                                <input style={{ width: '97%', height: '30px', marginTop: '15px' }} type="text" placeholder="Mã ưu đãi" />
                                <button style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px' }}>Áp dụng mã ưu đãi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
