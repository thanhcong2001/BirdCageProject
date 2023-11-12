import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetch = async () => {
    try {
        const token = localStorage.getItem('token');
        const formattedToken = token?.replace(/"/g, '');
        const headers = {
            Authorization: `Bearer ${formattedToken}`
        }
        const response = await axios.get(`https://tainguyen58-001-site1.ftempurl.com/api/Product`, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

const useGetEmptyCage = () => {
    return useQuery({ queryKey: ['cageEmpty'], queryFn: fetch })
}

export default useGetEmptyCage