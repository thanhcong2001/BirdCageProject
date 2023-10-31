import React, { useState, useEffect } from 'react'
import '../BirdCage/BirdCage.css'
import axios from 'axios';
import useProduct from 'api/apiProduct/useProduct';
import { Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { clear } from '@testing-library/user-event/dist/clear';
export const BirdCage = () => {
  const navigate = useNavigate()
  const [myCar, setMyCar] = useState("Thứ tự mặc định");
  const [list, setList] = useState([])
  const [compareList, setCompareList] = useState([])
  const { birdCage, isLoading, isError, birdCageError } = useProduct();
  const [tmpList, setTmpList] = useState([1, 2, 3])
  const [disabledButtons, setDisabledButtons] = useState([]);
  useEffect(() => {
    axios.get('https://6509117cf6553137159aecfc.mockapi.io/api/v1/foodBird')
      .then(response => {
        setList(response.data)
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
    return <h2>{birdCageError.message}</h2>
  }
  const categoryIdToFilter = 1; // page long chim

  const filteredData = birdCage?.items.filter(item => item.categoryId === categoryIdToFilter);


  const addItemToCompareList = (i) => {
    if (compareList.length == 3 || disabledButtons.includes(i.id)) return
    setCompareList([...compareList, i])
    setTmpList((item) => item.filter((_, index) => index !== 0))
    setDisabledButtons([...disabledButtons, i.id]);
  }

  const clear = () => {
    setTmpList([1, 2, 3])
    setCompareList([])
    setDisabledButtons('')
  }
  console.log(compareList);
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
          {list.slice(0, 6).map((i, index) => (
            <div className='box-birdCage' key={index}>
              <div className='blog' >
                <div>
                  <img className='imgList' src={i.img} alt='hinh anh' />
                </div>
                <div style={{ justifyContent: 'space-around' }}>
                  <span className='nameList'>{i.name}</span>
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
          <div style={{ fontSize: 16, paddingTop: 20, marginRight: 20 }}>Xem tất cả 9 kết quả</div>
          <div>
            <form>
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
        {isLoading ? <Box sx={{ display: 'flex', height: '500px', alignItems: 'center' }}>
          <CircularProgress />
        </Box> : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden' }}>
          {filteredData?.map(i => (
            <div key={i?.id}>
              <div className='card'>
                <img className='img-birdCage' src={i.productImages[0]?.imageUrl} alt={`hinh cua id ${i.id}`} onClick={() => navigate(`/details/${i.id}`)} />
                <p className='nameBirdCage'>{i.title}</p>
                <h3 className='discount'>{convertVND(i.priceAfterDiscount)}</h3>
                <h4 className='price'>{convertVND(i.price)}</h4>
                <button onClick={() => addItemToCompareList(i)} disabled={disabledButtons.includes(i.id)}>So sánh</button>
              </div>
            </div>
          ))}
        </div>}
      </div>
      {compareList.length > 0 ? <div className='bottomList'>
        <div style={{ display: 'flex' }}>
          {compareList.map((i, index) => (
            <div key={index}>
              <div className='compare-card' style={{ paddingBottom: 15 }}>
                <div>
                  <img className='img-compare' src={i.productImages[0]?.imageUrl} alt='hinh anh' />
                </div>
                <div style={{ justifyContent: 'space-around' }}>
                  <span className='name-List'>{i.title}</span>
                </div>
              </div>
            </div>
          ))}
          {tmpList.map(i => (
            <div key={i}>
              <div className='container-fake' style={{ paddingBottom: 114 }}>
                <div>
                  <img className='img-addProduct' src='https://cdn-icons-png.flaticon.com/128/1828/1828819.png' alt='hinh anh' />
                </div>
                <div style={{ justifyContent: 'space-around' }}>
                  <span className='name-addProduct'>Thêm Sản phẩm</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginLeft: 70, marginTop: 50 }}>
          <button style={{ marginLeft: 20 }} onClick={() => navigate('/compare', { state: { compareList } })}>So sánh ngay</button>
          <p className='closeTxT-compare' onClick={() => clear()}>Xóa tất cả sản phẩm</p>
        </div>
      </div> : null
      }
    </div >
  )
}
