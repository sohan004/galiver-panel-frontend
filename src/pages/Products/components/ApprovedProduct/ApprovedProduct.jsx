import { useEffect, useState } from "react";
import getMedia from "../../../../utilities/getMedia";
import { BACKEND_URL } from "../../../../App";
import { toggleGlobalLoading } from "../../../../components/Modal/components/GlobalLoading/GlobalLoading";

const ApprovedProduct = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        toggleGlobalLoading('open')
        fetch(`${BACKEND_URL}/api/v1/product/approve`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')} `
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(data)
                toggleGlobalLoading('close')
            })
    }, []);

    const active = (id) => {
        toggleGlobalLoading('open')
        fetch(`${BACKEND_URL}/api/v1/product/active/${id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')} `
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(prev => prev.filter(product => {
                    if (product._id === id) {
                        product.status = 'active'
                    }
                    return product
                }))
                toggleGlobalLoading('close')
            })
    }

    const inActive = (id) => {
        toggleGlobalLoading('open')
        fetch(`${BACKEND_URL}/api/v1/product/inactive/${id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')} `
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(prev => prev.filter(product => {
                    if (product._id === id) {
                        product.status = 'inactive'
                    }
                    return product
                }))
                toggleGlobalLoading('close')
            })
    }

    return (
        <div>
            <p className="mt-3">Total: {data?.length}</p>
            <div className="overflow-x-auto">
                <table className="  text-sm text-left  text-gray-500  w-full  bg-white shadow-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                img
                            </th>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                click
                            </th>
                            <th scope="col" className="px-6 py-3">
                                status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              cng status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                suspend
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(product => <tr className="bg-white border-b " key={product?._id}>
                            <td >
                                <img className="w-14 h-14" src={getMedia(product?.media[0]?.name)} alt="" />
                            </td>
                            <td>
                                {product?.title}
                            </td>
                            <td>
                                {product?.price}
                            </td>
                            <td>
                                {product?.click}
                            </td>
                            <td className={product?.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                                {product?.status}
                            </td>
                            <td>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox"
                                        onChange={() => product?.status === 'active' ? inActive(product?._id) : active(product?._id)}
                                        checked={product?.status === 'active' ? true : false}
                                        className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </td>
                            <td>
                                <button className="bg-green-600 text-white px-2 py-1 text-xs rounded-md ">Details</button>
                            </td>
                            <td>
                                <button className="bg-orange-600 text-white px-2 py-1 text-xs rounded-md ">Edit</button>
                            </td>
                            <td className="">
                                <button
                                    // onClick={() => approve(product?._id)}
                                    className="bg-red-600 text-white px-2 py-1 text-xs rounded-md ">suspend</button>
                            </td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ApprovedProduct;