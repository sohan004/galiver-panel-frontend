import React, { useRef, useState } from 'react';
import useGetSubCategories from '../../Hooks/useGetSubCategories';
import BottomLoading from '../../components/BottomLoading/BottomLoading';
import getMedia from '../../utilities/getMedia';
import AddNewSubCategories from './AddNewSubCategories/AddNewSubCategories';
import { toggleGlobalLoading } from '../../components/Modal/components/GlobalLoading/GlobalLoading';
import { BACKEND_URL } from '../../App';
import { FaSearch } from 'react-icons/fa';

const SubCategories = () => {
    const [search, setSearch] = useState('')
    const [addNew, setAddNew] = useState(false)
    const [subCategories, setSubCategories, loading] = useGetSubCategories(search)
    const searchInputRef = useRef()


    const deleteCategory = (id) => {
        toggleGlobalLoading('open')
        fetch(`${BACKEND_URL}/api/v1/sub-category/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`,
            }
        }
        )
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setSubCategories(subCategories.filter(category => category._id !== id))
                }
            })
            .finally(() => {
                toggleGlobalLoading('close')
            })
    }

    const handleSearch = () => {
        setSearch(searchInputRef.current.value)
    }


    return (
        <div>
            <div className="flex justify-between items-end">
                <p className="flex items-center text-gray-700 gap-2"> Total Sub Categories: {subCategories.length}</p>

            </div>
            <div className='flex justify-between items-end'>
                <div className="relative w-[180px] md:w-[250px]">
                    <input
                        ref={searchInputRef}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        type="text"
                        className="outline-none p-2 bg-white rounded-md border-b-2 w-full mt-1"
                        placeholder="Search User" />
                    <FaSearch onClick={handleSearch} className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer text-gray-500" />
                </div>
                    <button
                        onClick={() => setAddNew(true)}
                        className="bg-slate-700 text-white py-1 px-3 rounded active:scale-95 duration-75">Add</button>
            </div>
            <div className=" mt-3  w-full">
                <div className="overflow-x-auto">
                    <table className=" text-sm text-left  text-gray-500  w-full  bg-white shadow-md">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #SN.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    img
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sub Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories.map((subCategory, index) =>
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img className="w-9 h-9" src={getMedia(subCategory.avatar)} alt="" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {subCategory?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {subCategory?.category?.name}
                                    </td>
                                    <td
                                        onClick={() => deleteCategory(subCategory._id)}
                                        className="px-6 py-4">
                                        <button className="btn btn-sm text-white bg-red-600 hover:bg-red-700 
                                      ">Delete</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <BottomLoading loading={loading} />
                {addNew && <AddNewSubCategories setSubCategories={setSubCategories} subCategories={subCategories} setState={setAddNew} />}
            </div>
        </div>
    );
};

export default SubCategories;