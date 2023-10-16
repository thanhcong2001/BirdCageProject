import React,{useState} from 'react'
import '../BirdCage/BirdCage.css'
export const BirdCage = () => {
  const [myCar, setMyCar] = useState("Thứ tự mặc định");

  const handleChange = (event) => {
    setMyCar(event.target.value)
  }

  return (
    <div className='all'>
      <div style={{marginLeft:150}}>
        <p className='txtCage' style={{fontWeight:'bold'}}><span style={{fontWeight:'200',color:'#666666B3'}}>TRANG CHỦ&nbsp;/</span>&nbsp;LỒNG CHIM</p>
        <div style={{paddingTop:15}}>
          <p style={{fontWeight:600,color:'#353535',fontSize:16}}>DANH MỤC SẢN PHẨM</p>
          <p className='lineCage'></p>
          <div className='border'>
            <p style={{padding:15,marginTop:9,fontWeight:'100',fontSize:14}}>CHIM CẢNH</p>
          </div>
        </div>
        <div>
          <p style={{fontWeight:600,color:'#353535',fontSize:16}}>LỌC THEO GIÁ</p>
          <p className='line'></p>
        </div>
      </div>
      <div className='result'>
        <div style={{fontSize:16,paddingTop:20,marginRight:20}}>Xem tất cả 9 kết quả</div>
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
    </div>
  )
}
