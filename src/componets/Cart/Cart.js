// import DiscountIcon from '@mui/icons-material/Discount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useBirdCart from 'api/apiProduct/useBirdCart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Cart/Cart.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductWithId, updateToCartArr } from 'componets/ProductCompare/productSlice';
import useUpdateCart from './useUpdateCart';
export const Cart = () => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    console.log(formattedToken)
    const { cartItem } = useBirdCart(formattedToken)
    const cartItems = cartItem?.shoppingCarts
    const totalPrice = cartItems?.reduce((total, item) => total + item.productViewModel.price*item.count, 0);
    const shippingFee = 30000
    const queryClient = useQueryClient()
    const nav = useNavigate()
    async function deleteItem(itemId) {
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        return axios.delete(`http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/remove-from-cart/${itemId}`, {headers})
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
        dispatch(clearProductWithId(itemId))
        deleteItemCart.mutate(itemId)
    }

    // const simplifiedItemsCart = cartItems?.map(({ id, count }) => ({ id, count }));
    const {updateCartArr} = useSelector(state => state.products)

    const dispatch = useDispatch()
    const onChange = (value, id) => {
        const newOj = {
            productId:  id,
            count: value
        }
        dispatch(updateToCartArr(newOj))
    };
    const {updateCart ,updatePending} = useUpdateCart()

    const handleUpdatedCart =  async () => {
        await updateCart(updateCartArr)
    }
     
    return (
        <div>
            <section className='cart-items'>
                <div className='container d_flex'>
                    {token ? <>
                        <div className='cart-details'>
                        {cartItems?.length > 0 ?  <table>
                            <thead>
                                <td>SẢN PHẨM</td>
                                <td></td>
                                <td>GIÁ</td>
                                <td>SỐ LƯỢNG</td>
                                <td>TỔNG CỘNG</td>
                                <td></td>
                            </thead>
                            <tbody>
                                {cartItems?.map((i, index)=> (
                                      <CartItem key={index} i={i} onChange={onChange} handleDelete={handleDelete} deleteItemCart={deleteItemCart} quantityEdit={true}/>
                                ))}
                                <tr>
                                    <td><button onClick={()=>nav('/payment')} className='bt-next'>TiẾP TỤC XEM SẢN PHẨM</button></td>

                                    {updateCartArr?.length < 1 ? null : <td><button className='bt-update' onClick={handleUpdatedCart}>
                                        {updatePending ? 'ĐANG CẬP NHẬT...':'CẬP NHẬT GIỎ HÀNG' }
                                        </button></td>}
                                </tr>
                            </tbody>
                            <div className='button_cart'>
                            </div>
                        </table> : 
                         <table>
                            <tbody>
                                <tr>
                                    <td><p>Chưa có sản phẩm nào trong giỏ hàng.</p></td>
                                    <td><button onClick={()=>nav('/birdCage')} className='bt-next'>QUAY TRỞ LẠI CỬA HÀNG</button></td>
                                </tr>
                            </tbody>
                        </table>}

                       
                        </div>
                    <div className='cart-total'>
                        <div>
                            <div>
                                <h3>TỔNG SỐ LƯỢNG</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                    <p>Tổng tiền hàng</p>
                                    <p>{totalPrice} đ</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                    <p>Giao hàng {cartItem?.total}</p>
                                    <p>{shippingFee} đ</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #d8d8d8' }}>
                                    <p>Tổng thanh toán</p>
                                    <p>{totalPrice + shippingFee} đ</p>
                                </div>
                                {cartItems?.length > 0 ?
                                <button onClick={()=>nav('/cart/payment')} className='bt-next' style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px'}}>TIẾN HÀNH THANH TOÁN</button>
                                : 
                                <button  disabled={true} style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px', opacity: 0.5 }}>TIẾN HÀNH THANH TOÁN</button>
                                }
                            </div>
                            {/* <div>
                                <h5><DiscountIcon /> Mã ưu đãi</h5>
                                <div style={{ borderTop: '3px solid #d8d8d8' }}>

                                </div>
                                <input style={{ width: '97%', height: '30px', marginTop: '15px' }} type="text" placeholder="Mã ưu đãi" />
                                <button style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px' }}>Áp dụng Voucher</button>
                            </div> */}
                        </div>
                    </div>
                    </> : <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh'
                    }}>
                    Đăng nhập để thấy giỏ hàng
                    </div>}
                   
                </div>
            </section>
        </div>
    )
}


