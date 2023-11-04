import apiClient from 'api/apiClient'
import React, { useState, useEffect } from 'react'
import '../Customize/CustomCage.css'

export default function CustomCage() {
    const [data, setdata] = useState([])
    const [selectedOption, setSelectedOption] = useState(1);
    const [imgCage, setImgCage] = useState();
    const [cageType, setcageType] = useState([])
    const [loadData, setSelectedData] = useState([]);
    const [active, setActive] = useState(null)
    const handleButtonClick = (buttonId) => {
        apiClient.get(`Formula/${buttonId}`)
            .then(response => {
                setSelectedData(response.data?.data)
                setActive(buttonId)
            })
    };
    useEffect(() => {
        apiClient.get('Product/page?pageIndex=0&pageSize=10')
            .then(response => {
                setdata(response.data?.items)
            })
        apiClient.get('BirdCageType/get-all')
            .then(response => {
                setcageType(response.data?.data)
                if (response.data?.data && response.data.data.length > 0) {
                    handleButtonClick(response.data.data[0].id);
                }
            })

    }, [])
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };
    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }
    return (
        <div>
            <p className='header-custom'>Thiết Kế Lồng Chim</p>
            <div className='borderCustom-Input'>
                <div style={{ textAlign: 'center', display: 'flex', marginLeft: 150,marginBottom:30 }}>
                    {cageType.map(item => (
                        <div key={item?.id}>
                            <button onClick={() => handleButtonClick(item?.id)} style={{ marginRight: 30, backgroundColor: 'rgb(100, 190, 67)', color: 'white' }}>{item?.typeName}</button>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='borderMethod-Custom1' style={{ lineHeight: 4 }}>
                        <div>
                            <form>
                                <label>Mẫu Mã:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 20 }} onChange={handleOptionChange}>
                                    {loadData.map(item => (
                                        <option key={item?.id} value={selectedOption}>
                                            <span>{item?.code}</span>
                                        </option>
                                    ))}
                                </select>
                            </form>
                            <form>
                                <label>Chất Liệu:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 12 }}>
                                    {loadData.map(item => (
                                        <option key={item?.id} value={item?.id}>
                                            <span>{item?.material}</span>
                                        </option>
                                    ))}
                                </select>
                            </form>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 37 }}>
                                <label style={{ marginRight: 5 }}>Chiều Dài:</label>
                                <input type="number" style={{ width: 110, height: 30 }} />
                            </div>
                            <div style={{ marginRight: 5 }}>
                                <label style={{ marginRight: 10 }}>Chiều Rộng:</label>
                                <input type="number" style={{ width: 100, height: 30 }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 37 }}>
                                <label style={{ marginRight: 25 }}>Số Nan:</label>
                                <input type="number" style={{ width: 110, height: 30 }} />
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='borderMethod-Custom' >
                            <p style={{ marginBottom: 30, marginTop: 0, fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Lưu ý</p>
                            <div style={{ marginLeft: 30 }}>
                                <p>- Chiều dài( min: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{loadData[selectedOption - 1]?.minHeight}</span> , max: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{loadData[selectedOption - 1]?.maxHeight}</span> ) </p>
                                <p>- Chiều rộng ( min: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{loadData[selectedOption - 1]?.minWidth}</span> , max: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{loadData[selectedOption - 1]?.maxWidth}</span> ) </p>
                                <p>- Số nan ( min: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{loadData[selectedOption - 1]?.minBars}</span>, max: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{loadData[selectedOption - 1]?.maxBars}</span> )</p>
                                <p>- Giá ước tính: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bold' }}>{convertVND(loadData[selectedOption - 1]?.price)}</span></p>
                            </div>
                        </div>
                        <button style={{ width: 400, marginTop: 10, borderRadius: 10, backgroundColor: 'rgb(100, 190, 67)', height: 50 }}>Thêm vào giỏ</button>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Mẫu Mã</p>
                        <img className='pictureOption-Cus' src='https://i.pinimg.com/736x/85/0a/b4/850ab445663bf066acb5a1aec94d62c9.jpg' />
                    </div>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Chất Liệu</p>
                        <img className='pictureOption-Cus' src='https://img.ws.mms.shopee.vn/625a1207f2bb993ac1c47b915d0af756' />
                    </div>
                    <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Số Nan</p>
                        <img className='pictureOption-Cus' src='https://vn-test-11.slatic.net/p/5c55ab1e77b5c51fbdb8e339ca7effe8.jpg' />
                    </div>
                    {/* <div className='borderExam-Cus'>
                        <p style={{ marginLeft: 80, fontWeight: 'bold' }}>Phụ Kiện</p>
                        <img className='pictureOption-Cus' src={imgCage} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
