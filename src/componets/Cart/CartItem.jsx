import { Button } from "@mui/material";
import { InputNumber } from "antd";

const CartItem = ({ i, onChange, handleDelete, quantityEdit }) => {
    console.log(i)
    const imgCartItem = i?.productViewModel?.productImages[0]?.imageUrl
    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }
    return (
        <tr key={i.id}>
            <td className='product-img'>
                {/* <HighlightOffIcon /> */}
                <img className='img_cart' src={imgCartItem} alt="" />
            </td>
            <td>{i?.model}</td>
            <td>{convertVND(i?.priceDesign)}</td>
            {quantityEdit ? <td><InputNumber min={0}
                defaultValue={i?.count}
                onChange={(value) => onChange(value, i?.productViewModel?.id)} /></td> : <td>{i?.count}</td>}
            <td>{convertVND(i?.priceDesign*2)}</td>
            <td>
                <Button color="error" onClick={() => handleDelete(i?.applicationUserId)}>Xóa</Button>
            </td>
        </tr>
    )
}

export default CartItem