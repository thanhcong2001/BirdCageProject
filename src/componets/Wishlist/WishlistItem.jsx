import { Button } from 'antd'
import React from 'react'

const WishlistItem = ({ i, handleDelete }) => {

    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    return (
        <tr key={i.id}>
            <td>
                {i.id}
            </td>
            <td className='product-img'>
                <img className='img_cart' src={i.productImages[0].imageUrl} alt="" />
            </td>
            <td>{i.title}</td>
            <td>{convertVND(i.priceAfterDiscount)}</td>
            <td>
                <Button color="error" onClick={() => handleDelete(i.id)}>Xóa</Button>
            </td>
        </tr>
    )
}

export default WishlistItem



