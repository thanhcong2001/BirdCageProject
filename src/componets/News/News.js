import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import '../News/News.css';
export const News = () => {
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
      .then(response => {
        setdata(response.data)
      })
  }, [])

  return (
    <div>
      <Header />
      <div>
        <p className='txt'>CATEGORY ARCHIVES: TIN TỨC</p>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className='news'>
          {
            data.map(item => (
              <div className='newsDiv' key={item?.id}>
                <img className='newsImage' src={item?.img} alt='hinh anh'/>
                <p className='titleNews'> {item.title}</p>
                <div className='lineBlog' style={{marginLeft:20}}></div>
                <p className='desNews'>{item.description}</p>
                <div className='line'></div>
              </div>
            ))
          }
        </div>
        <div style={{ width: '30%' }}>
          <form className="search-bar">
            <input className='input-search'
              type="text"
              placeholder="Tìm kiếm..."
            />
            <button style={{ backgroundColor: '#64be43' }}>
              <SearchIcon style={{ paddingTop: 1 }} />
            </button>
          </form>
          <p className='blog'>BÀI VIẾT MỚI</p>
          <div className='lineBlog'></div>
          <div className='borderBlog' style={{height: 543}}>
            {data.slice(0,5).map(i => (
              <div>
                <div style={{ display: 'flex', marginLeft: 20 }} key={i?.id}>
                  <img className='imgCircle' src={i.img} alt='hinh anh'/>
                  <p className='test'>
                    {i.title}</p>
                </div>
                <div className='lineCircle'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
