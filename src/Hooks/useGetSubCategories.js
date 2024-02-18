import { useEffect, useState } from "react"
import { BACKEND_URL } from "../App"

const useGetSubCategories = (text) => {
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`${BACKEND_URL}/api/v1/sub-category?name=${text || ''}`,{
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSubCategories(data.subCategories)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [text])

    return [subCategories, setSubCategories, loading]
}

export default useGetSubCategories