import { Button } from "@mui/material";
import { InputNumber } from "antd";

const CartItem = ({ i, onChange, handleDelete, quantityEdit }) => {
    const imgCartItem = i.productViewModel.productImages[0].imageUrl
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
            <td>{i.productViewModel.title}</td>
            <td>{convertVND(i.productViewModel.priceAfterDiscount)}</td>
            {quantityEdit ? <td><InputNumber min={0}
                defaultValue={i.count}
                onChange={(value) => onChange(value, i.productViewModel.id)} /></td> : <td>{i.count}</td>}
            <td>{convertVND(i.productViewModel.priceAfterDiscount * i.count)}</td>
            <td>
                <Button color="error" onClick={() => handleDelete(i.productViewModel.id)}>Xóa</Button>
            </td>
        </tr>
    )
}

export default CartItem