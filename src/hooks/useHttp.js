import { useState, useEffect } from "react";

const useHttp = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res;
            try {
                res = await fetch(url)
            } catch (err) {
                if (err) return console.log(`${err.name}: ${err.message}`)
            };
            const data = await res.json();
            setFetchedData(data);
            setIsLoading(false);
        };
        fetchData();
    }, [url, dependencies])
    
    return [isLoading, fetchedData]
}

export default useHttp