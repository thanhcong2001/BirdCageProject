import { Button } from "@mui/material";
import { InputNumber } from "antd";

const CartItem = ({ i, onChange, handleDelete, quantityEdit }) => {
    const imgCartItem = i.productViewModel.productImages[0].imageUrl
    return (
        <tr key={i.id}>
            <td className='product-img'>
                {/* <HighlightOffIcon /> */}
                <img className='img_cart' src={imgCartItem} alt="" />
            </td>
            <td>{i.productViewModel.title}</td>
            <td>{i.productViewModel.price}₫</td>
            {quantityEdit ? <td><InputNumber min={0} defaultValue={i.count} onChange={(value) => onChange(value, i.productViewModel.id)} /></td> : <td>{i.count}</td>}



            <td>{i.productViewModel.price * i.count}đ</td>
            <td>
                <Button color="error" onClick={() => handleDelete(i.productViewModel.id)}>Xóa</Button>
            </td>
        </tr>
    )
}

export default CartItem