import React, { useEffect, useState } from 'react'
import { Header } from '../Header/Header'
import '../News/News.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import NewsCard from './NewsCard.jsx';
export const News = () => {
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
      .then(response => {
        setdata(response.data)
      })
  }, [])

  return (
    <div >
      <div >
        <p className='txt'>CATEGORY ARCHIVES: TIN TỨC</p>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <NewsCard/>
        <div style={{ width: '30%', right: '20px' }}>
          <form className="search-bar">
            <input className='input'
              type="text"
              placeholder="Tìm kiếm..."
            />
            <button style={{ backgroundColor: '#64be43' }}>
              <SearchIcon style={{ paddingTop: 1 }} />
            </button>
          </form>
          <p className='blog'>BÀI VIẾT MỚI</p>
          <div className='lineBlog'></div>
          <div className='borderBlog'>
            {data.map(i => (
              <div>
                <div style={{ display: 'flex', marginLeft: 20 }} key={i?.id}>
                  <img className='imgCircle' src={i.img} />
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
