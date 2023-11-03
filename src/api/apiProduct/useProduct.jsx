import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchBirdCageUrl = ''

const fetchBirdCage = async (pageIndex) => {
    const response = await axios.get(`http://tainguyen58-001-site1.ftempurl.com/api/Product/page?pageIndex=${pageIndex}&pageSize=10`);
    return response.data;
};

const fetchBirdCageById = async (id) => {
    const response = await axios.get(`http://tainguyen58-001-site1.ftempurl.com/api/Product/${id}`);
    return response.data;
}

const useProduct = (info) => {
    const { id, pageIndex } = info
    const { data: birdCage, isLoading, isError, error: birdCageError } = useQuery({ queryKey: ['product', pageIndex], queryFn: () => fetchBirdCage(pageIndex), keepPreviousData: true, staleTime: 60000 });

    const { data: bird, isLoading: birdIdLoading, isError: birdIdError, error: birdError } = useQuery({ queryKey: ['birdCage', id], queryFn: () => fetchBirdCageById(id) })
    return {
        //get bird cage
        birdCage,
        isLoading,
        isError,
        birdCageError,
        //get bird by id
        bird,
        birdIdLoading,
        birdIdError,
        birdError
    }

}

export default useProduct