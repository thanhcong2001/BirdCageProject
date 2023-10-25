import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBirdCageUrl = 'http://tainguyen58-001-site1.ftempurl.com/api/Product/page?pageIndex=0&pageSize=10'

const fetchBirdCage = async () => {
    const response = await axios.get(fetchBirdCageUrl);
    return response.data;
};

const fetchBirdCageById = async (id) => {
    const response = await axios.get(`http://tainguyen58-001-site1.ftempurl.com/api/Product/${id}`);
    return response.data;
}

const useProduct = (id) => {
    const { data: birdCage, isLoading, isError, error: birdCageError } = useQuery({ queryKey: ['product'], queryFn: fetchBirdCage });

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