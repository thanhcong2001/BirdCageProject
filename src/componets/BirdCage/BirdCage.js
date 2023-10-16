import React, { useState, useEffect } from 'react'
import '../BirdCage/BirdCage.css'
import axios from 'axios';
export const BirdCage = () => {
  const [myCar, setMyCar] = useState("Thứ tự mặc định");
  const [data, setdata] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('https://6509117cf6553137159aecfc.mockapi.io/api/v1/Cage')
      .then(res => {
        setdata(res.data)
      })
    axios.get('https://6509117cf6553137159aecfc.mockapi.io/api/v1/foodBird')
      .then(response => {
        setList(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setMyCar(event.target.value)
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
          <input style={{ width: 260 }} type="range" min="0" max="5" id="customRange2"></input>
          <button style={{ borderRadius: 20, height: 30, width: 53, fontSize: 14, paddingBottom: 22 }}>Lọc</button>
        </div>
        <div>
          <p style={{ fontWeight: 600, color: '#353535', fontSize: 16 }}>SẢN PHẨM</p>
          <p className='lineCage'></p>
        </div>
        <div className='borderBlogOne' style={{height: 434}}>
          {list.slice(0, 6).map(i => (
            <div>
              <div className='blog' >
                <div>
                  <img className='imgList' src={i.img} />
                </div>
                <div style={{ justifyContent: 'space-around' }}>
                  <span className='nameList'>{i.name}</span>
                  <br />
                  <p className='priceProduct'>{i.price}đ</p>
                </div>
              </div>
              <div className='lineList'></div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className='result'>
          <div style={{ fontSize: 16, paddingTop: 20, marginRight: 20 }}>Xem tất cả 9 kết quả</div>
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
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden' }}>
          {data.map(i => (
            <div key={i?.id}>
              <div className='card'>
                <img className='img-birdCage' src={i.img} alt="" />
                <p className='nameBirdCage'>{i.name}</p>
                <h4>{i.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
