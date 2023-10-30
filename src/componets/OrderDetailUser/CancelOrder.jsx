import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const CancelOrder = ({ orderDetail, handleClickCancelOrder, loading }) => {
    return (
        <div>
            {orderDetail.orderStatus === 'Pending' ?
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: '2rem'
                }}>
                    <Typography>Chỉ có thể hủy khi trạng thái đơn hàng là Pending</Typography>
                    {loading ? <Button fullWidth variant='contained' color='warning' sx={{ height: '35px', opacity: 0.5 }}>
                        <CircularProgress size={20} color='inherit' />
                    </Button> : <Button fullWidth variant='contained' color='warning' sx={{ height: '35px' }} onClick={handleClickCancelOrder}>
                        Hủy đơn hàng
                    </Button>}
                </Box> : null
            }
        </div>
    )
}
export default CancelOrder