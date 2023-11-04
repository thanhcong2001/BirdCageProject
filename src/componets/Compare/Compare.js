import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { useLocation } from 'react-router-dom';
import '../Compare/Compare.css'
export default function Compare() {
    const location = useLocation();
    const { compareList } = location.state;
    console.log('Data:', compareList);
    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }
    return (
        <div>
            <div style={{ paddingTop: 30, textAlign: '-webkit-center' }}>
                <table className='borderTable-Compare'>
                    <thead>
                        <tr>
                            <th></th>
                            {compareList.map((i, index) => (
                                <th key={index}>
                                    <img className='CompareList-Image' style={{ height: 200, width: 200, borderRadius: 10 }} src={i.productImages[0]?.imageUrl} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{color:'rgb(100, 190, 67)',fontWeight:'bolder'}}>Mã Sản Phẩm</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.sku}</th>
                            ))}
                        </tr>
                        <tr>
                            <th style={{color:'rgb(100, 190, 67)',fontWeight:'bolder'}}>Tên Sản Phẩm</th>
                            {compareList.map(i => (
                                <th key={i.id} style={{width:100}}>{i.title}</th>
                            ))}
                        </tr>
                        <tr>
                            <th style={{color:'rgb(100, 190, 67)',fontWeight:'bolder'}}>Giá Sản Phẩm</th>
                            {compareList.map(i => (
                                <th key={i.id}>{convertVND(i.price)}</th>
                            ))}
                        </tr>
                        <tr>
                            <th style={{color:'rgb(100, 190, 67)',fontWeight:'bolder'}}>Phụ Kiện 1</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.features[0]?.featureName}</th>
                            ))}
                        </tr>
                        <tr>
                            <th style={{color:'rgb(100, 190, 67)',fontWeight:'bolder'}}>Phụ Kiện 2</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.features[1]?.featureName}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}
