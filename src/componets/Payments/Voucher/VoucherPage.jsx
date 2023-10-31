import React from 'react'
import useVoucher from './useVoucher'
import { Box } from '@mui/material'
import { DateTime } from 'luxon'
import { useDispatch } from 'react-redux'
import { setVoucherCode } from 'componets/ProductCompare/productSlice'
import { useNavigate } from 'react-router-dom'

const VoucherPage = () => {

    const { vouchers, isLoading } = useVoucher()
    console.log(vouchers)
    const convertDate = (date) => {
        const dateTime = DateTime.fromISO(date);
        const formattedDateTime = dateTime.toFormat('dd/MM/yyyy');
        return formattedDateTime
    }
    const dispatch = useDispatch()
    const nav = useNavigate()
    const handleChooseVoucherDone = (i) => {
        dispatch(setVoucherCode(i.voucherCode))
        nav('/cart/payment')
    }
    if (isLoading) {
        return <div>
            Loading...
        </div>
    }
    return (
        <Box>
            {vouchers?.map((i, index) => (
                <Box
                    onClick={() => handleChooseVoucherDone(i)}
                    key={index}
                    sx={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        padding: '10px',
                        width: 'fit-content',
                        cursor: 'pointer'
                    }}>
                    <Box><span>Tên voucher: </span> {i.voucherCode}</Box>
                    <Box><span>Giảm giá đơn hàng</span> {i.discountPercent * 100}%</Box>
                    <Box><span>Có giá trị đến</span> {convertDate(i.expirationDate)}</Box>
                </Box>
            ))}

        </Box>
    )
}

export default VoucherPage