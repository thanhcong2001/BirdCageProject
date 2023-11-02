import { Box, CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useProduct from 'api/apiProduct/useProduct';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Details/Details.css';
import TabForm from '../TabForm/TabForm';
import AddToCartForm from './../Cart/AddToCartForm';
import usePostWishlist from 'componets/Wishlist/FetchWishlist/usePostWishlist';
import apiClient from 'api/apiClient';

Details.propTypes = {

};

function Details() {

    const { id } = useParams()

    const { bird, birdIdLoading } = useProduct(id)
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const { wishlist, wishlistLoading } = usePostWishlist()
    const addBirdCageToCart = async (birdCageToCart) => {
        const { id, quantity } = birdCageToCart

        const headers = {
            Authorization: `Bearer ${formattedToken}`
        };
        const response = await apiClient.post(`http://tainguyen58-001-site1.ftempurl.com/api/ShoppingCart/update-cart/${id}?count=${quantity}`, birdCageToCart, { headers });
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
        axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
            .then(response => {
                setBorderBlogOne(response.data)
            })
        axios.get('https://6509117cf6553137159aecfc.mockapi.io/api/v1/Cage')
            .then(response => {
                setList(response.data)
            })
    }, [])
    return (
        <div className='container'>
            <div>
                <p className='listProduct'>SẢN PHẨM</p>
                <div className='lineCircleOne'></div>
                <div className='borderBlogOne'>
                    {list?.slice(0, 5).map((i, index) => (
                        <div className='box' key={index}>
                            <div className='blog'>
                                <div>
                                    <img className='imgList' src={i.img} alt={`hinh anh`} />
                                </div>
                                <div style={{ marginTop: 2 }}>
                                    <span className='nameList'>{i.name}</span>
                                    <br />
                                    <p className='priceProduct'>{convertVND(i.price)}</p>
                                </div>
                            </div>
                            {/* <div className='lineList'></div> */}
                        </div>
                    ))}
                </div>
                <p className='listProduct'>BÀI VIẾT MỚI NHẤT</p>
                <div className='lineCircleOne'></div>
                <div className='borderBlogOne'>
                    {borderBlogOne?.slice(0, 4).map((i, index) => (
                        <div key={index}>
                            <div style={{ display: 'flex' }} key={i?.id}>
                                <img className='imgCircle' src={i.img} alt='hinh anh cam' />
                                <p className='test'>
                                    {i.title}</p>
                            </div>
                            <div className='lineCircle'></div>
                        </div>
                    ))}
                </div>
            </div>
            {birdIdLoading ? <Box sx={{ display: 'flex', height: '500px', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box> : <div>
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
                        <span className='priceProduct' style={{ fontSize: 24,marginLeft:147 }}>{convertVND(bird?.price)} ₫</span>
                        {/* descipriton here */}
                        {/* <p style={{ color: '#353535', fontSize: 18 }}>{bird?.description}</p> */}
                        <p style={{ color: '#353535', lineHeight: 2.2, fontSize: 18, marginTop: 2, marginBottom: 0 }}>– Phù hợp với nuôi chào mào có tật bu lồng, ngoái, lộn.
                            <br />
                            – Móc lồng bằng tre, cứng, đẹp.
                            <br />

                            – Thanh lồng mảnh, cứng tuyệt đối.
                            <br />

                            – Đi kèm bộ nan cao cấp.
                            <br />

                            – Đáy lồng làm bằng tre, đẹp, sang trọng.</p>
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