import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../Hooks/useGetAllUsers";
import moment from "moment";
import BottomLoading from "../../components/BottomLoading/BottomLoading";

const Users = () => {
    const [skip, setSkip] = useState(0)
    const [search, setSearch] = useState('')
    const searchInputRef = useRef()

    const [users, setUsers, loading, totalUsers, setTotalUsers] = useGetAllUsers(skip, search)

    const handleSearch = () => {
        setSearch(searchInputRef.current.value)
    }


    return (
        <div>
            <div className="flex justify-end">
                <div className="relative">
                    <input
                        ref={searchInputRef}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        type="text"
                        className="outline-none p-2 bg-white rounded-md border-b-2"
                        placeholder="Search User" />
                    <FaSearch onClick={handleSearch} className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer text-gray-500" />
                </div>
            </div>
            <div className="bg-white overflow-x-auto mt-3 shadow-md rounded-md">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left overflow-x-auto text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #SN.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Join Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) =>
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.userName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {moment(user.createdAt).format("Do MMM YY")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className={user.isActive ? 'text-green-600' : 'text-red-500'}>{user.isActive ? 'Active' : 'Inactive'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className={user.role === 'admin' ? 'text-orange-600' : ''}>{user.role}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
                <BottomLoading loading={loading} />
        </div>
    );
};

export default Users;