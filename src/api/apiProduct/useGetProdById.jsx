import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const fetchProdById = async (data) => {
    const { pageIndex, id } = data
    const response = await axios.get(`https://tainguyen58-001-site1.ftempurl.com/api/Product/by-category/${id}?pageIndex=${pageIndex}&pageSize=10`);
    return response.data;
}


const useGetProdById = (data) => {
    return useQuery({ queryKey: ['prod', data], queryFn: () => fetchProdById(data) })
}

export default useGetProdById