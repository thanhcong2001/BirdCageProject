import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchVoucherCode = async () => {
    try {
        const response = await axios.get('http://tainguyen58-001-site1.ftempurl.com/api/Voucher');
        console.log(response.data)
        return response.data;
    } catch (error) {

    }
}

const useVoucher = () => {
    const { data: vouchers, isLoading, isError, error } = useQuery({ queryKey: ['voucherCode'], queryFn: fetchVoucherCode });
    return {
        vouchers,
        isLoading,
        isError,
        error,
    }
}

export default useVoucher