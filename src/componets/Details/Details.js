import React, { useEffect, useState } from 'react'
import '../Details/Details.css'
import axios from 'axios'
import TabForm from '../TabForm/TabForm'
import AddToCartForm from './../Cart/AddToCartForm';
import { useDispatch } from 'react-redux';
import { addToCart } from 'componets/Cart/cartSlice.js';

Details.propTypes = {

};

function Details({ initialQuantity, onQuantityChange }) {
    const [data, setdata] = useState([])
    const [quantity, setQuantity] = useState(initialQuantity || 1);
    const [list, setList] = useState([])

    const dispatch = useDispatch();

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    function convertVND(price) {
        if (price != null && price != undefined && price != '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCartSubmit = ({quantity }) => {
        // console.log('Form Submit', formValues);
        const action = addToCart({
            id: list.id,
            quantity: quantity,
        })
        console.log(action)
        dispatch(action)
    }

    useEffect(() => {
        axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
            .then(response => {
                setdata(response.data)
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
                    {list.slice(0,5).map(i => (
                        <div className='box'>
                            <div className='blog'>
                                <div>
                                    <img className='imgList' src={i.img} />
                                </div>
                                <div style={{marginTop:2}}>
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
                    {data.slice(0, 4).map(i => (
                        <div>
                            <div style={{ display: 'flex' }} key={i?.id}>
                                <img className='imgCircle' src={i.img} />
                                <p className='test'>
                                    {i.title}</p>
                            </div>
                            <div className='lineCircle'></div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img className='picProduct' src='http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/4-9.jpg' />
                    </div>
                    <div>
                        <div style={{ marginTop: 25, textDecoration: 'none' }}>
                            <a href=''>Trang Chủ  /</a>
                            <a href=''>Lồng Chim</a>
                        </div>
                        <h1 style={{ fontSize: 27 }}>Lồng bầu chạm Biên Hòa làm kỹ.<br /> MSP: LB1400</h1>
                        <div className='lineCircleOne' style={{ marginBottom: 17 }}></div>
                        <span className='priceProduct' style={{ fontSize: 24 }}>1,400,000 ₫</span>
                        <p style={{ color: '#353535', fontSize: 18 }}>Sản phẩm được sản xuất từ tre già loại 1.</p>
                        <p style={{ color: '#353535', lineHeight: 2.2, fontSize: 18, }}>– Phù hợp với nuôi chào mào có tật bu lồng, ngoái, lộn.
                            <br />
                            – Móc lồng bằng tre, cứng, đẹp.
                            <br />

                            – Thanh lồng mảnh, cứng tuyệt đối.
                            <br />

                            – Đi kèm bộ nan cao cấp.
                            <br />

                            – Đáy lồng làm bằng tre, đẹp, sang trọng.</p>
                        <div>
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </div>
                        <div className='horizontaline' style={{ width: 427, marginTop: 30, marginBottom: 10 }}></div>
                        <span style={{ color: '#353535' }}>Danh Mục: <a className='type'>Lồng Chim</a></span>
                    </div>
                </div>
                <TabForm />
                {/* <div className='horizontaline' style={{ width: 885,marginTop: 40}}></div> */}
            </div>
        </div>
    )
}

export default Details;
