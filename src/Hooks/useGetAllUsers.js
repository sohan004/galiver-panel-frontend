import { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";

const useGetAllUsers = (skip = 0, search) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    let searchQuery = `skip=${skip}`;
    if (search) {
        searchQuery += `&search=${search}`;
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/api/v1/user/get-all-user?${searchQuery}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [skip, search]);

    return [users, setUsers, loading, totalUsers, setTotalUsers];
}

export default useGetAllUsers;