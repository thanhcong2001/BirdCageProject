import { Box, CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useProduct from 'api/apiProduct/useProduct';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Details/Details.css';
import TabForm from '../TabForm/TabForm';
import AddToCartForm from './../Cart/AddToCartForm';
import usePostWishlist from 'componets/Wishlist/FetchWishlist/usePostWishlist';
import apiClient from 'api/apiClient';

Details.propTypes = {

};

function Details() {

    const { id } = useParams()

    const { bird, birdIdLoading } = useProduct({ id })
    console.log('details: ', bird);
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const { wishlist, wishlistLoading } = usePostWishlist()
    const addBirdCageToCart = async (birdCageToCart) => {
        const { id, quantity } = birdCageToCart

        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        const response = await apiClient.post(`ShoppingCart/update-cart/${id}?count=${quantity}`, birdCageToCart, { headers });
        return response.data;
    };
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: addBirdCageToCart,
        onSuccess: () => {
            enqueueSnackbar("Thêm vào giỏ hàng thành công", { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: 'center' } });
            queryClient.invalidateQueries({ queryKey: ['cartItem'] })
        },
    });
    const [borderBlogOne, setBorderBlogOne] = useState()
    const [list, setList] = useState([])
    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    const handleAddToCartSubmit = ({ quantity }) => {
        const birdCageToCart = {
            id: bird?.id,
            quantity
        }
        mutate(birdCageToCart)
    }

    const handleAddToWishlist = async (id) => {
        await wishlist(id)
    }

    useEffect(() => {
        apiClient.get('Product/page?pageIndex=0&pageSize=10')
            .then(response => {
                setList(response.data?.items)
                console.log("Cong: ", response.data?.items);
            })
    }, [])
    return (
        <div className='container'>
            <div>
                <p className='listProduct'>SẢN PHẨM</p>
                <div className='lineCircleOne'></div>
                <div className='borderBlogOne'>
                    {list.slice(0, 4).map(i => (
                        <div className='box-birdCage' key={i?.id}>
                            <Link to={`/details/${i.id}`}>
                                <div className='blog' >
                                    <div>
                                        <img className='imgList' src={i?.productImages[0]?.imageUrl} alt='hinh anh' />
                                    </div>
                                    <div style={{ justifyContent: 'space-around' }}>
                                        <span title={i?.title} className='nameList'>{i?.title}</span>
                                        <br />
                                        <p className='priceProduct'>{convertVND(i?.priceAfterDiscount)}</p>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
                
            </div>
            {birdIdLoading ? <Box sx={{ display: 'flex', height: '500px', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box> : <div style={{ marginLeft: 38 }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img className='picProduct' src={bird.productImages[0]?.imageUrl} alt={`hinh anh ${bird?.id}`} />
                    </div>
                    <div>
                        <div style={{ marginTop: 25, textDecoration: 'none' }}>
                            <a href='/intro'>Trang Chủ  /</a>
                            <a href='/birdCage'>Lồng Chim</a>
                        </div>
                        {/* title here */}
                        <h1 style={{ fontSize: 27 }}>{bird?.title}<br /> MSP: {bird?.sku}</h1>
                        {/* price here */}
                        <p className='priceProduct' style={{ fontSize: 27, paddingTop: 0, textAlign: 'center' }}>{convertVND(bird?.priceAfterDiscount)}</p>
                        {/* descipriton here */}
                        {/* <p style={{ color: '#353535', fontSize: 18 }}>{bird?.description}</p> */}
                        <p style={{ color: '#353535', lineHeight: 2.2, fontSize: 18, marginTop: 2, marginBottom: 0 }}>
                            {bird?.description}
                        </p>
                        <div>
                            <AddToCartForm isLoading={isPending} onSubmit={handleAddToCartSubmit} token={token} id={id} handleAddToWishlist={handleAddToWishlist} wishlistLoading={wishlistLoading} />
                        </div>
                        <div className='horizontaline' style={{ width: 427, marginTop: 30, marginBottom: 10 }}></div>
                        <span style={{ color: '#353535' }}>Danh Mục: <a href='/birdCage' className='type'>Lồng Chim</a></span>
                    </div>
                </div>
                <TabForm id={id} reviews={bird?.productReviews} />
                {/* <div className='horizontaline' style={{ width: 885,marginTop: 40}}></div> */}
            </div>}

        </div>
    )
}

export default Details;