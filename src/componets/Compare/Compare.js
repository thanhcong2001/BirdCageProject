import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { useLocation } from 'react-router-dom';
import '../Compare/Compare.css'
export default function Compare() {
    const location = useLocation();
    const { compareList } = location.state;
    console.log('Data:', compareList);
    return (
        <div>
            <div style={{paddingTop:30}}>
                <table className='borderTable-Compare'>
                    <thead>
                        <tr>
                            <th></th>
                            {compareList.map((i, index) => (
                                <th key={index}>
                                    <img className='CompareList-Image' style={{ height: 200, width: 200,borderRadius:10 }} src={i.productImages[0]?.imageUrl} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Mã Sản Phẩm</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.sku}</th>
                            ))}
                        </tr>
                        <tr>
                            <th>Tên Sản Phẩm</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.title}</th>
                            ))}
                        </tr>
                        <tr>
                            <th>Giá Sản Phẩm</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.price}</th>
                            ))}
                        </tr>
                        <tr>
                            <th>Phụ Kiện 1</th>
                            {compareList.map(i => (
                                <th key={i.id}>{i.features[0]?.featureName}</th>
                            ))}
                        </tr>
                        <tr>
                            <th>Phụ Kiện 2</th>
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
