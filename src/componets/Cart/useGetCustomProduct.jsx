import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';


const fetch = async () => {
    try {
        const token = localStorage.getItem('token');
        const formattedToken = token?.replace(/"/g, '');
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        }
        const decodedToken = jwtDecode(formattedToken);
        const userId = decodedToken.Id;
        const response = await axios.get(`https://tainguyen58-001-site1.ftempurl.com/api/Design/${userId}`, { headers })
        return response.data
    } catch (error) {
        throw error
    }

}

const useGetCustomProduct = () => {
    const fetchCustom = useQuery({ queryKey: ['orderUserDetail'], queryFn: fetch })
    const { data: customData, isLoading } = fetchCustom
    return {
        customData,
        isLoading,
    }
}

export default useGetCustomProduct