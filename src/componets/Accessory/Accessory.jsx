import { Box, CircularProgress } from '@mui/material';
import { Pagination } from 'antd';
import apiClient from 'api/apiClient';
import useGetProdById from 'api/apiProduct/useGetProdById';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Accessory/Accessory.css';
export const Accessory = () => {
    const [myCar, setMyCar] = useState("Thứ tự mặc định");
    const [list, setList] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const categoryIdToFilter = 2; // page long chim

    const { data, isLoading, isError, error } = useGetProdById({ pageIndex, id: categoryIdToFilter })
    useEffect(() => {
        apiClient.get('Product/page?pageIndex=0&pageSize=10')
            .then(response => {
                setList(response.data?.items)
            })
    }, [])

    const handleChange = (event) => {
        setMyCar(event.target.value)
    }

    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const filteredData = data?.items
    const handleChangePage = (e) => {
        setPageIndex(() => e - 1)
    }

    return (
        <div className='all'>
            <div style={{ marginLeft: 150 }}>
                <p className='txtCage' style={{ fontWeight: 'bold' }}><span style={{ fontWeight: '200', color: '#666666B3' }}>TRANG CHỦ&nbsp;/</span>&nbsp;LỒNG CHIM</p>
                <div style={{ paddingTop: 15 }}>
                    <p style={{ fontWeight: 600, color: '#353535', fontSize: 16 }}>DANH MỤC SẢN PHẨM</p>
                    <p className='lineCage'></p>
                    <div className='border'>
                        <p style={{ padding: 15, marginTop: 9, fontWeight: '100', fontSize: 14 }}>CHIM CẢNH</p>
                    </div>
                </div>
                <div>
                    <p style={{ fontWeight: 600, color: '#353535', fontSize: 16 }}>LỌC THEO GIÁ</p>
                    <p className='lineCage'></p>
                    <input style={{ width: 210 }} type="range" min="0" max="5" id="customRange2"></input>
                    <button style={{ borderRadius: 20, height: 30, width: 53, fontSize: 14, paddingBottom: 22 }}>Lọc</button>
                </div>
                <div>
                    <p style={{ fontWeight: 600, color: '#353535', fontSize: 16 }}>SẢN PHẨM</p>
                    <p className='lineCage'></p>
                </div>
                <div className='borderBlogOne' style={{ height: 489 }}>
                    {list.slice(1, 7).map((i, index) => (
                        <div className='box-birdCage' key={index}>
                            <div className='blog' >
                                <div>
                                    <img className='imgList' src={i?.productImages[0]?.imageUrl} alt='hinh anh' />
                                </div>
                                <div style={{ justifyContent: 'space-around' }}>
                                    <span className='nameList'>{i?.title}</span>
                                    <br />
                                    <p className='priceProduct'>{convertVND(i.price)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className='result'>
                    {/* <div style={{ fontSize: 16, paddingTop: 20, marginRight: 20 }}>Xem tất cả 9 kết quả</div>
                    <div>
                        <form >
                            <select className='select' value={myCar} onChange={handleChange}>
                                <option value="1">Thứ tự mặc định</option>
                                <option value="2">Thứ tự theo mức độ phổ biến</option>
                                <option value="3">Thứ tự theo điểm đánh giá</option>
                                <option value="4">Thứ tự theo sản phẩm mới</option>
                                <option value="5">Thứ tự theo giá: thấp đến cao</option>
                                <option value="6">Thứ tự theo giá: cao xuống thấp</option>
                            </select>
                        </form>
                    </div> */}
                </div>
                {isLoading ? <Box sx={{ display: 'flex', height: '500px', alignItems: 'center' }}>
                    <CircularProgress />
                </Box> : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden' }}>
                    {filteredData?.map(i => (
                        <div key={i?.id} style={{ marginLeft: 20 }}>
                            <Link to={`/details/${i.id}`}>
                                <div className='card'>
                                    <img className='img-birdCage' src={i.productImages[0]?.imageUrl} alt={`hinh cua id ${i.id}`} />
                                    <p title={i.title} className='truncate-cus1'>{i.title}</p>
                                    <h4>{convertVND(i.price)}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>}
                <Pagination style={{ textAlign: 'center', marginTop: 20 }} defaultCurrent={1} pageSize={10} total={filteredData?.length} onChange={handleChangePage} />
            </div>
        </div>
    )
}
