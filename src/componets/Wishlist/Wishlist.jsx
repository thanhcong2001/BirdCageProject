import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'antd'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import useFetchWishlist from './FetchWishlist/useFetchWishlist'
import WishlistItem from './WishlistItem'

const Wishlist = () => {
    const { enqueueSnackbar } = useSnackbar();

    const nav = useNavigate()
    const { wishlistItems } = useFetchWishlist()
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const queryClient = useQueryClient()
    //http://tainguyen58-001-site1.ftempurl.com/api/Product/remove-product-from-wishlist/1
    async function deleteItem(itemId) {
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        return axios.delete(`http://tainguyen58-001-site1.ftempurl.com/api/Product/remove-product-from-wishlist/${itemId}`, { headers })
    }
    const deleteItemCart = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlistItem'] });
        },
        onError: (error) => {
            console.error('Error while deleting item:', error);
        }
    });

    const handleDelete = (itemId) => {
        deleteItemCart.mutate(itemId)
    }

    async function addItemToCart() {
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        return axios.post(`http://tainguyen58-001-site1.ftempurl.com/api/Product/add-to-cart-from-wishlist`, {}, { headers })
    }
    const handleCart = useMutation({
        mutationFn: addItemToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItem'] });
            queryClient.invalidateQueries({ queryKey: ['wishlistItem'] });
        },
        onError: (error) => {
            enqueueSnackbar(error, { variant: 'error', preventDuplicate: true })
        }
    });

    const handleAddToCart = () => {
        handleCart.mutate()
    }

    return (
        <div>
            {wishlistItems?.length > 0 ?
                <>
                    <table style={{ width: '50%', margin: '0 auto' }}>
                        <thead>
                            <td>ID</td>
                            <td>HÌNH ẢNH</td>
                            <td>SẢN PHẨM</td>
                            <td>GIÁ</td>
                            <td></td>
                        </thead>
                        <tbody>
                            {wishlistItems?.map((i) => (
                                <WishlistItem i={i} handleDelete={handleDelete} />
                            ))}
                        </tbody>
                        <div className='button_cart'>
                        </div>
                    </table>
                    <Button style={{
                        display: 'flex',
                        fontSize: '20px',
                        height: '50px',
                        width: '50%',
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#64BE43',
                        margin: '0 auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} loading={handleCart?.isPending} onClick={handleAddToCart}>
                        Thêm vào giỏ hàng sản phẩm yêu thích
                    </Button>
                </>

                :
                <div style={{ display: 'flex', gap: 20, flexDirection: 'column', height: '60vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
                    Chưa có sản phẩm yêu thích
                    <span>
                        <Button onClick={() => nav('/birdCage')}>Nhấn để thêm</Button>
                    </span>
                </div>}
        </div>
    )
}

export default Wishlist