import apiClient from 'api/apiClient'
import React, { useState, useEffect } from 'react'
import '../Customize/CustomCage.css'

export default function CustomCage() {
    const [data, setdata] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [imgCage, setImgCage] = useState();

    useEffect(() => {
        apiClient.get('Product/page?pageIndex=0&pageSize=10')
            .then(response => {
                setdata(response.data?.items)
            })
    }, [])
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        console.log('Check: ', selectedValue);
        apiClient.get(`Product/${selectedValue}`)
            .then(response => {
                setImgCage(response.data?.productImages[0]?.imageUrl)
            })
    };
    return (
        <div>
            <p style={{ fontSize: 30, marginLeft: 600, paddingTop: 30 }}>Thiết Kế Lồng Chim</p>
            <div style={{ marginLeft: 500 }}>
                <button style={{ marginRight: 30, backgroundColor: 'rgb(100, 190, 67)', color: 'white' }}>Chim Sẻ</button>
                <button style={{ marginRight: 30, backgroundColor: 'rgb(100, 190, 67)', color: 'white' }}>Chim Khuyên</button>
                <button style={{ marginRight: 30, backgroundColor: 'rgb(100, 190, 67)', color: 'white' }}>Chim Khướu</button>
                <button style={{ marginRight: 30, backgroundColor: 'rgb(100, 190, 67)', color: 'white' }}>Chim Vẹt</button>
            </div>
            <div className='borderCustom-Input'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ lineHeight: 4 }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 37 }}>
                                <label style={{ marginRight: 10 }}>Chiều Dài:</label>
                                <input style={{ width: 110, height: 30 }} />
                            </div>
                            <div style={{ marginRight: 10 }}>
                                <label style={{ marginRight: 15 }}>Chiều Rộng:</label>
                                <input style={{ width: 100, height: 30 }} />
                            </div>
                        </div>
                        <div>
                            <form>
                                <label>Mẫu Mã:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 20 }} onChange={handleOptionChange}>
                                    {data.map(item => (
                                        <option key={item?.id} value={item?.id}>
                                            <span>{item?.title}</span> <span style={{ marginLeft: 80 }}>{item?.price}</span>
                                        </option>
                                    ))}
                                </select>
                                <input style={{ paddingTop: 10.5, paddingBottom: 9, width: 100, marginLeft: 10 }} />
                            </form>
                            <form>
                                <label>Chất Liệu:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 12 }}>
                                    <option value="1"></option>
                                    <option value="2">Thứ tự theo mức độ phổ biến</option>
                                    <option value="3">Thứ tự theo điểm đánh giá</option>
                                    <option value="4">Thứ tự theo sản phẩm mới</option>
                                    <option value="5">Thứ tự theo giá: thấp đến cao</option>
                                    <option value="6">Thứ tự theo giá: cao xuống thấp</option>
                                </select>
                                <input style={{ paddingTop: 10.5, paddingBottom: 9, width: 100, marginLeft: 10 }} />
                            </form>
                            <form>
                                <label>Số Nan:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 28 }}>
                                    <option value="1"></option>
                                    <option value="2">Thứ tự theo mức độ phổ biến</option>
                                    <option value="3">Thứ tự theo điểm đánh giá</option>
                                    <option value="4">Thứ tự theo sản phẩm mới</option>
                                    <option value="5">Thứ tự theo giá: thấp đến cao</option>
                                    <option value="6">Thứ tự theo giá: cao xuống thấp</option>
                                </select>
                                <input style={{ paddingTop: 10.5, paddingBottom: 9, width: 100, marginLeft: 10 }} />
                            </form>
                            <form>
                                <label>Phụ Kiện:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 17 }}>
                                    <option value="1"></option>
                                    <option value="2">Thứ tự theo mức độ phổ biến</option>
                                    <option value="3">Thứ tự theo điểm đánh giá</option>
                                    <option value="4">Thứ tự theo sản phẩm mới</option>
                                    <option value="5">Thứ tự theo giá: thấp đến cao</option>
                                    <option value="6">Thứ tự theo giá: cao xuống thấp</option>
                                </select>
                                <input style={{ paddingTop: 10.5, paddingBottom: 9, width: 100, marginLeft: 10 }} />
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className='borderMethod-Custom'>
                            <p style={{ margin: 0, fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Lưu ý</p>
                            <p>- Chiều dài , Chiều rộng ( min: <span style={{ color: 'red', fontSize: 20 }}>30</span> , max: <span style={{ color: 'red', fontSize: 20 }}>100</span> ) </p>
                            <p>- Chiều rộng phải nhỏ hơn chiều dài.</p>
                            <p>- Số nan: min<span style={{ color: 'red', fontSize: 25 }}> 130 </span>max <span style={{ color: 'red', fontSize: 25 }}>260</span></p>
                            <p>- Phụ kiện đi kèm: Lọ đồ ăn, khay nước</p>
                            <p>- Giá ước tính: <span style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>924.0000</span></p>
                        </div>
                        <button style={{ width: 400, marginTop: 10, borderRadius: 10, backgroundColor: 'rgb(100, 190, 67)', height: 50 }}>Thêm vào giỏ</button>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Mẫu Mã</p>
                        <img className='pictureOption-Cus' src='' />
                    </div>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Chất Liệu</p>
                        <img className='pictureOption-Cus' src='https://o.remove.bg/downloads/bdaa1a06-95f5-4c40-9b82-a6819c2aa36b/go-lim-removebg-preview.png' />
                    </div>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Số Nan</p>
                        <img className='pictureOption-Cus' src='https://o.remove.bg/downloads/e6121638-c334-40f6-979b-8a0e16ba1542/nan-long-chim-removebg-preview.png' />
                    </div>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Phụ Kiện</p>
                        <img className='pictureOption-Cus' src={imgCage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
