// Axios
import axios from "axios";

// React
import { useState, useEffect } from "react";

const useAxios = <T = any>(url: string): [T | null, boolean, string | null] => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }

        setLoading(true);

        axios.get(url, config)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                setError(() => {
                    return err.message
                });
            })
            .finally(() => {
                // Forced delay for visual feedback
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
    }, [url])

    return [data, loading, error];
}

export default useAxios;