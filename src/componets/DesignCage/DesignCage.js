import React, { useEffect, useState } from 'react'
import '../DesignCage/DesignCage.css'
import axios from 'axios'
import TabForm from '../TabForm/TabForm'
import Dropdown from 'react-dropdown-select';
export const DesignCage = ({ initialQuantity, onQuantityChange, clicked }) => {
    const options = [
        { label: '50x80', value: '50x80', price: 1500000 },
        { label: '60x80', value: '60x80', price: 1600000 },
        { label: '60x90', value: '60x90', price: 1700000 },
    ];
    const optionsNan = [
        { label: '50', value: '50x80',price:50000 },
        { label: '60', value: '60x80',price:60000 },
        { label: '70', value: '60x90',price:70000 },
    ];
    const optionsColor = [
        { label: 'Black', value: 'Black' },
        { label: 'Violet', value: 'Violet' },
        { label: 'Orange', value: 'Orange' },
    ];

    function convertVND(price) {
        if (price != null && price != undefined && price != '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }
    function Button({ text, clicked, onClick }) {
        return (
            <div className={`borderColor ${clicked ? 'clicked' : ''} txt-design`} onClick={onClick}>
                <p>{text}</p>
            </div>
        );
    }
    const [buttons, setButtons] = useState([
        { id: 1, clicked: false, text: 'Red' },
        { id: 2, clicked: false, text: 'Blue' },
        { id: 3, clicked: false, text: 'Yellow' },
        { id: 4, clicked: false, text: 'Grey' },

    ]);
    const handleButtonClick = (id) => {
        const updatedButtons = buttons.map((button) =>
            button.id === id ? { ...button, clicked: true } : { ...button, clicked: false }
        );
        setSelectedColor(null)
        setButtons(updatedButtons);
    };
    // -----------------------------------------------------------------------
    const [sizePrice, setSizePrice] = useState(null);
    const [size, setSize] = useState([
        { id: 1, clicked: false, text: '20x40', price: 1000000 },
        { id: 2, clicked: false, text: '40x35', price: 1200000 },
        { id: 3, clicked: false, text: '40x60', price: 1300000 },
        { id: 4, clicked: false, text: '50x70', price: 1400000 },

    ]);
    const handleSizeClick = (id) => {
        const updatedButtons = size.map((size) =>
            size.id === id ? { ...size, clicked: true } : { ...size, clicked: false }

        );
        setSelectedOption(null)
        setSize(updatedButtons);
        const selectedSizePrice = size.find((size) => size.id === id);
        setSizePrice(selectedSizePrice.price);
    };
    const [selectedOption, setSelectedOption] = useState(null);
    const onChangeData = (value) => {
        setSelectedOption(value);
        setSizePrice(value[0].price);
    };
    // -----------------------------------------------------------------------

    const [nanPrice, setNanPrice] = useState(null);
    const [nanNumber, setNanNumber] = useState([
        { id: 1, clicked: false, text: '20', price: 20000 },
        { id: 2, clicked: false, text: '25', price: 25000 },
        { id: 3, clicked: false, text: '30', price: 30000 },
        { id: 4, clicked: false, text: '40', price: 40000 },
    ]);
    const handleNanNumberClick = (id) => {
        const updatedButtons = nanNumber.map((nanNumber) =>
            nanNumber.id === id ? { ...nanNumber, clicked: true } : { ...nanNumber, clicked: false }
        );
        setSelectedNan(null)
        setNanNumber(updatedButtons);
        const selectedNanPrice = nanNumber.find((nanNumber) => nanNumber.id === id);
        setNanPrice(selectedNanPrice.price);
    };
    const [selectedNan, setSelectedNan] = useState(null);
    const onChangeNan = (value) => {
        setSelectedNan(value);
        setNanPrice(value[0].price);
    };


    const [data, setdata] = useState([])
    const [quantity, setQuantity] = useState(initialQuantity || 1);
    const [list, setList] = useState([])

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
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



    const [selectedColor, setSelectedColor] = useState(null);
    const onChangeColor = (value) => {
            setSelectedColor(value);
    };

    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        // Kiểm tra xem cả hai giá trị đã được lấy
        if (nanPrice !== null && sizePrice !== null) {
            // Tính tổng
            const sum = nanPrice + sizePrice;
            // Cập nhật giá trị tổng
            setTotalPrice(sum);
        }
        else if (nanPrice !== null && sizePrice == null) {
            setTotalPrice(900000 + nanPrice);
        }
        else if (nanPrice == null && sizePrice !== null) {
            setTotalPrice(sizePrice);
        }
        else {
            setTotalPrice(900000);
        }
    }, [nanPrice, sizePrice]);
    return (
        <div className='container-design'>
            <div>
                <p className='listProduct-Design'>SẢN PHẨM</p>
                <div className='lineCircleOne-Design'></div>
                <div className='borderBlogOne-Design'>
                    {list.slice(0, 5).map(i => (
                        <div className='box-designCage'>
                            <div className='blog-Design'>
                                <div>
                                    <img className='imgList-Design' src={i.img} />
                                </div>
                                <div style={{ justifyContent: 'space-around' }}>
                                    <span className='nameList-Design'>{i.name}</span>
                                    <br />
                                    <p className='priceProduct-Design'>{convertVND(i.price)}</p>
                                </div>
                            </div>
                            {/* <div className='lineList-Design'></div> */}
                        </div>
                    ))}
                </div>
                <p className='listProduct'>BÀI VIẾT MỚI NHẤT</p>
                <div className='lineCircleOne'></div>
                <div className='borderBlogOne'>
                    {data.slice(0, 4).map(i => (
                        <div className='box-blogDesignCage'>
                            <div style={{ display: 'flex' }} key={i?.id}>
                                <img className='imgCircle' src={i.img} />
                                <p className='test'>
                                    {i.title}</p>
                            </div>
                            {/* <div className='lineCircle-Design'></div> */}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{marginRight:66}}>
                <div style={{ display: 'flex', marginBottom: 30 }}>
                    <div>
                        <img className='picProduct-Design' src='http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/4-9.jpg' />
                    </div>
                    <div>
                        {/* <div style={{ marginTop: 25, textDecoration: 'none' }}>
                                <a href=''>Trang Chủ  /</a>
                                <a href=''>Thiết kế lồng</a>
                            </div> */}
                        <h1 style={{ fontSize: 27, lineHeight: 1.3 }}>Lồng bầu chạm Biên Hòa<br />{convertVND(totalPrice)}</h1>
                        {/* <div className='lineCircleOne-Design' style={{ marginBottom: 10 }}></div> */}
                        <div>
                            <div>
                                <p style={{ fontWeight: 'bold' }}>Kích Thước Của Lồng:</p>
                                <div className='button-option' style={{ display: 'flex', marginBottom: 20 }}>
                                    {size.map((size) => (
                                        <Button
                                            key={size.id}
                                            text={size.text}
                                            clicked={selectedOption === null ? size.clicked : false}
                                            onClick={() => handleSizeClick(size.id)}
                                            disabled={true}
                                        />
                                    ))}
                                    <Dropdown
                                        options={options}
                                        onChange={onChangeData}
                                        placeholder="Others"
                                        style={{
                                            width: 90,
                                            height: 52,
                                            borderColor: 'black',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            backgroundColor: selectedOption !== null ? 'rgba(131, 131, 199, 0.381)' : 'white', // Thay đổi màu nền tùy theo trạng thái
                                        }}
                                        className="custom-dropdown"
                                    />
                                </div>

                            </div>
                            <div>
                                <p style={{ fontWeight: 'bold' }}>Số Nan Của Lồng:</p>
                                <div className='button-option' style={{ display: 'flex' }}>
                                    {nanNumber.map((nanNumber) => (
                                        <Button
                                            key={nanNumber.id}
                                            text={nanNumber.text}
                                            clicked={selectedNan === null ? nanNumber.clicked : false}
                                            onClick={() => handleNanNumberClick(nanNumber.id)}
                                        />
                                    ))}
                                    <Dropdown
                                        options={optionsNan}
                                        onChange={onChangeNan}
                                        placeholder="Others"
                                        style={{
                                            width: 90,
                                            height: 52,
                                            borderColor: 'black',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            backgroundColor: selectedNan !== null ? 'rgba(131, 131, 199, 0.381)' : 'white', // Thay đổi màu nền tùy theo trạng thái
                                        }}
                                        className="custom-dropdown1"
                                    />
                                </div>
                            </div>
                            <div>
                                <p style={{ fontWeight: 'bold' }}>Màu:</p>
                                <div className='button-option' style={{ display: 'flex', marginBottom: 20 }}>
                                    {buttons.map((button) => (
                                        <Button
                                            key={button.id}
                                            text={button.text}
                                            clicked={selectedColor === null ? button.clicked : false}
                                            onClick={() => handleButtonClick(button.id)}
                                        />
                                    ))}
                                    <Dropdown
                                        options={optionsColor}
                                        placeholder="Others"
                                        onChange={onChangeColor}
                                        style={{
                                            width: 90,
                                            height: 52,
                                            borderColor: 'black',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            backgroundColor: selectedColor !== null ? 'rgba(131, 131, 199, 0.381)' : 'white',
                                        }}
                                        className="custom-dropdown"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: 200, marginTop: 37 }}>
                            <button style={{ backgroundColor: '#f1f1f1', color: 'black', height: 40, width: 30, borderRadius: 0, borderWidth: 1, borderStyle: 'solid', borderColor: '#dddddd' }} onClick={handleDecrease}>-</button>
                            <span style={{ paddingLeft: 18, paddingRight: 18, borderTopWidth: 1, borderStyle: 'solid', borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingBottom: 12, paddingTop: 9, borderColor: '#dddddd' }}>{quantity}</span>
                            <button style={{ backgroundColor: '#f1f1f1', color: 'black', height: 40, width: 32, borderRadius: 0, borderWidth: 1, borderStyle: 'solid', borderColor: '#dddddd' }} className='quatity' onClick={handleIncrease}>+</button>
                            <button style={{ height: 40, backgroundColor: '#8dc63f', marginLeft: 20, fontSize: 16, fontWeight: 'bold' }}>Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                    </div>
                </div>

                <TabForm />
                {/* <div className='horizontaline' style={{ width: 885,marginTop: 40}}></div> */}
            </div>
        </div>
    )
}
