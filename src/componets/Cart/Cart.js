import DiscountIcon from '@mui/icons-material/Discount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useBirdCart from 'api/apiProduct/useBirdCart';
import axios from 'axios';
import '../Cart/Cart.css';
import CartItem from './CartItem';
export const Cart = () => {

    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const { cartItem } = useBirdCart(formattedToken)
    const cartItems = cartItem?.shoppingCarts
    const queryClient = useQueryClient()
    async function deleteItem(itemId) {
        console.log(itemId)
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
        console.log(itemId)
        deleteItemCart.mutate(itemId)
    }
    const onChange = (value, id) => {

        if(value === 0) {
            handleDelete(id)
        }
      };

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
                                {cartItems?.map((i, index)=> (
                                      <CartItem key={index} i={i} onChange={onChange}/>
                                ))}
                               
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
