import apiClient from 'api/apiClient'
import React, { useState, useEffect } from 'react'
import '../Customize/CustomCage.css'

export default function CustomCage() {
    const [data, setdata] = useState([])
    const [selectedOption, setSelectedOption] = useState(1);
    const [imgCage, setImgCage] = useState();
    const [cageType, setcageType] = useState([])
    const [loadData, setSelectedData] = useState([]);
    const [material, setMaterial] = useState([])
    const [active, setActive] = useState(null)

    const handleButtonClick = (buttonId) => {
        apiClient.get(`Formula/${buttonId}`)
            .then(response => {
                handleOptionChange(null)
                setSelectedData(response.data?.data)
                setActive(buttonId)
                const tmpData = response.data?.data.filter(i => {
                    if (i?.code == response.data?.data[0]?.code) return i
                })
                setMaterial(tmpData)
                setSelectedOption(tmpData[0])
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
        const selectedValue = event?.target?.value
        const tmpData = loadData.filter(i => {
            if (i?.code == selectedValue) return i
        })
        setMaterial(tmpData)
        setSelectedOption(tmpData[0]);
    };
    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const handleBlur = () => {
        const value = parseFloat(inputValue);
        if (value > selectedOption?.maxHeight || value < selectedOption?.minHeight) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const [inputWidth, setInputWidth] = useState('');
    const [isWidth, setIsWidth] = useState(true);
    const handleWidth = () => {
        const value = parseFloat(inputWidth);
        if (value > selectedOption?.maxWidth || value < selectedOption?.minWidth) {
            setIsWidth(false);
        } else {
            setIsWidth(true);
        }
    };

    const [inputNan, setInputNan] = useState('');
    const [isNan, setIsNan] = useState(true);
    const handleNan = () => {
        const value = parseFloat(inputNan);
        if (value > selectedOption?.maxBars || value < selectedOption?.minBars) {
            setIsNan(false);
        } else {
            setIsNan(true);
        }
    };

    return (
        <div>
            <p className='header-custom'>Thiết Kế Lồng Chim</p>
            <div className='borderCustom-Input'>
                <div style={{ textAlign: 'center', display: 'flex', marginLeft: 150, marginBottom: 30 }}>
                    {cageType.map(item => (
                        <div key={item?.id}>
                            <button onClick={() => handleButtonClick(item?.id)} style={{
                                marginRight: 30,
                                backgroundColor: active === item?.id ? 'lightBlue' : 'rgb(100, 190, 67)',
                                color: 'white'
                            }}>{item?.typeName}</button>
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
                                        <option key={item?.id} value={item?.code}>
                                            <span>{item?.code}</span>
                                        </option>
                                    ))}
                                </select>
                            </form>
                            <form>
                                <label>Chất Liệu:</label>
                                <select className='select-optionCutom' style={{ marginLeft: 12 }}>
                                    {material.map(item => (
                                        <option key={item?.id} value={item?.id}>
                                            <span>{item?.material}</span>
                                        </option>
                                    ))}
                                </select>
                            </form>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 26 }}>
                                <label style={{ marginRight: 12 }}>Chiều Dài:</label>
                                <input type="number" style={{ width: 110, height: 30, paddingLeft: 3 }}
                                    value={inputValue}
                                    onBlur={handleBlur}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                {isValid ? null : <p style={{ color: 'red', fontSize: 12, lineHeight: 0, margin: 0, marginLeft: 85 }}>Chiều dài không hợp lệ!</p>}
                            </div>
                            <div style={{ marginRight: 5 }}>
                                <label style={{ marginRight: 10 }}>Chiều Rộng:</label>
                                <input type="number" style={{ width: 100, height: 30, paddingLeft: 3 }}
                                    value={inputWidth}
                                    onBlur={handleWidth}
                                    onChange={(e) => setInputWidth(e.target.value)}
                                />
                                {isWidth ? null : <p style={{ color: 'red', fontSize: 12, lineHeight: 0, margin: 0, marginLeft: 85 }}>Chiều rộng không hợp lệ!</p>}
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 37 }}>
                                <label style={{ marginRight: 29 }}>Số Nan:</label>
                                <input type="number" style={{ width: 110, height: 30, paddingLeft: 3 }}
                                    value={inputNan}
                                    onBlur={handleNan}
                                    onChange={(e) => setInputNan(e.target.value)}
                                />
                                {isNan ? null : <p style={{ color: 'red', fontSize: 12, lineHeight: 0, margin: 0, marginLeft: 85 }}>Số nan không hợp lệ!</p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='borderMethod-Custom' >
                            <p style={{ marginBottom: 10, marginTop: 0, fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Lưu ý</p>
                            <div style={{ marginLeft: 30 }}>
                                <p>- Chiều dài( min: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.minHeight}</span> , max: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.maxHeight}</span> ) </p>
                                <p>- Chiều rộng ( min: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.minWidth}</span> , max: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.maxWidth}</span> ) </p>
                                <p>- Số nan ( min: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.minBars}</span>, max: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.maxBars}</span> )</p>
                                <p>- Ngày dự tính giao hàng: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bolder' }}>{selectedOption?.constructionTime}</span> ngày</p>
                                <p>- Giá ước tính: <span style={{ color: 'red', fontSize: 25, fontWeight: 'bold' }}>{convertVND(selectedOption?.price)}</span></p>
                            </div>
                        </div>
                        <button style={{ width: 400, marginTop: 10, borderRadius: 10, backgroundColor: 'rgb(100, 190, 67)', height: 50 }}>Thêm vào giỏ
                        </button>
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