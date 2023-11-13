// import DiscountIcon from '@mui/icons-material/Discount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useBirdCart from 'api/apiProduct/useBirdCart';
import axios from 'axios';
import { clearProductWithId, updateToCartArr } from 'componets/ProductCompare/productSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Cart/Cart.css';
import CartItem from './CartItem';
import useGetCustomProduct from './useGetCustomProduct';
import useGetEmptyCage from './useGetEmptyCage';
import usePushToShoppingCart from './usePushToShoppingCart';
import useUpdateCart from './useUpdateCart';
export const Cart = () => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const { cartItem } = useBirdCart(formattedToken)
    const cartItems = cartItem?.shoppingCarts
    console.log('CartItems: ', cartItems);
    const totalPrice = cartItems?.reduce((total, item) => total + item.productViewModel.priceAfterDiscount * item.count, 0);
    const shippingFee = 30000
    const queryClient = useQueryClient()
    const nav = useNavigate()

    const { data: emptyCage } = useGetEmptyCage()
    async function deleteItem(itemId) {
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        return axios.delete(`https://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/remove-from-cart/${itemId}`, { headers })
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
    const { updateCartArr } = useSelector(state => state.products)

    const dispatch = useDispatch()
    const onChange = (value, id) => {
        const newOj = {
            productId: id,
            count: value
        }
        dispatch(updateToCartArr(newOj))
    };
    const { updateCart, updatePending } = useUpdateCart()

    const handleUpdatedCart = async () => {
        await updateCart(updateCartArr)
    }

    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }
    const { customData } = useGetCustomProduct()
    const data = customData?.data
    console.log('Fomular: ', customData);
    const { pushCustom } = usePushToShoppingCart()

    const handlePushToCart = async () => {
        if (emptyCage) {
            const pushdata = {
                Model: data[0]?.model,
                Width: data[0]?.width,
                Height: data[0]?.height,
                Material: data[0]?.material,
                Bars: data[0]?.bars,
                PriceDesign: data[0]?.priceDesign
            }
            await pushCustom({ pushdata, id: emptyCage[0]?.id })
        }

    }
    const DetailCustom = ({ i }) => {
        const [showAdd, setShowAdd] = useState(false);

        const openAddNew = () => {
            setShowAdd(true);
        };
        const closeAddNew = () => {
            setShowAdd(false);
        };

        console.log('design: ', i);

        return (
            <>
                <button onClick={openAddNew}>
                    Detail
                </button>
                <div className="App-dash" >
                    {showAdd && (
                        <div className="popup-2">
                            <div className="popup-content-2">
                                <span className="close" onClick={closeAddNew}>
                                    &times;
                                </span>
                                <h2 style={{ marginBottom: 30 }}>Detail Product</h2>
                                <div style={{ color: 'black' }}>Bars: {i.bars}</div>
                                <div>Height: {i.height}</div>
                                <div>Width: {i.width}</div>
                                <div>Material: {i.material}</div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }

    return (
        <div>
            <section className='cart-items'>
                <div className='container d_flex'>
                    {token ? <>
                        <div className='cart-details'>
                            {cartItems?.length > 0 ? <table>
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
                                        <CartItem key={index} i={i} onChange={onChange} handleDelete={handleDelete} deleteItemCart={deleteItemCart} quantityEdit={true} />
                                    ))}
                                    <tr>
                                        <td><button onClick={() => nav('/birdCage')} className='bt-next'>TiẾP TỤC XEM SẢN PHẨM</button></td>

                                        {updateCartArr?.length < 1 ? null : <td><button className='bt-update' onClick={handleUpdatedCart}>
                                            {updatePending ? 'ĐANG CẬP NHẬT...' : 'CẬP NHẬT GIỎ HÀNG'}
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
                                            <td><button onClick={() => nav('/birdCage')} className='bt-next'>QUAY TRỞ LẠI CỬA HÀNG</button></td>
                                        </tr>
                                    </tbody>
                                </table>}

                            <table>
                                <thead>
                                    <td>SẢN PHẨM CUSTOM</td>
                                    <td>CHI TIẾT</td>
                                    <td>TỔNG CỘNG</td>
                                    <td></td>
                                </thead>
                                <tbody>
                                    {data?.map((i) => (
                                        <tr>
                                            <td>{i.model}</td>
                                            <td>
                                                <DetailCustom i={i} />
                                            </td>
                                            <td>{i.priceDesign}</td>
                                        </tr>
                                    ))}

                                </tbody>
                                <button onClick={handlePushToCart}>
                                    Shop now
                                </button>
                            </table>


                        </div>
                        <div className='cart-total'>
                            <div>
                                <div>
                                    <h3>TỔNG SỐ LƯỢNG</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                        <p style={{ fontSize: 19, fontStyle: 'italic' }}>Tổng tiền hàng</p>
                                        <p>{convertVND(totalPrice)}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d8d8d8' }}>
                                        <p style={{ fontSize: 19, fontStyle: 'italic' }}>Giao hàng</p>
                                        <p>{convertVND(shippingFee)}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #d8d8d8' }}>
                                        <p style={{ fontSize: 19, fontStyle: 'italic' }}>Tổng thanh toán</p>
                                        <p>{convertVND(totalPrice + shippingFee)}</p>
                                    </div>
                                    {cartItems?.length > 0 ?
                                        <button onClick={() => nav('/cart/payment')} className='bt-next' style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px' }}>TIẾN HÀNH THANH TOÁN</button>
                                        :
                                        <button disabled={true} style={{ width: '100%', height: '60px', marginTop: '10px', fontSize: '20px', opacity: 0.5 }}>TIẾN HÀNH THANH TOÁN</button>
                                    }
                                </div>

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


