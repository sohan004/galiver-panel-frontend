import { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";

const useGetCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(`${BACKEND_URL}/api/v1/category/get-category-admin`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data?.categories)
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return [categories, setCategories, loading];
}

 export default useGetCategories;