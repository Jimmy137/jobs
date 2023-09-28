import { useState, useEffect } from 'react';
import axios  from 'axios';
// import {API_Key} from '@env'

// const key = API_Key

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': 'ecc94bb1e2mshc35b1e34d431d9bp1c2905jsn40e54d73a0b4',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.request(options);
            setData(response.data.data);
        } catch (error) {
            setError(error)
            console.error(error);
            alert(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const refresh = () => {
        fetchData()
    }

    return {data, isLoading, error, refresh}

}

export default useFetch;


