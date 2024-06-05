import { useEffect, useState } from "react";
import getMedia from "../../../../utilities/getMedia";
import TableSkelaton from "../../../../components/TableSkelaton/TableSkelaton";
import { BACKEND_URL } from "../../../../App";
import Details from "../Details/Details";

const Pending = () => {
    const [orders, setOrder] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${BACKEND_URL}/api/v1/order?status=pending`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setOrder(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    console.log(orders);

    return (
        <div>
            <h1 className="mt-3">Total: {orders.length}</h1>
            <div className="overflow-x-auto mt-2">
                <table className=" text-sm text-left  text-gray-500  w-full  bg-white shadow-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SN.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => <tr className="bg-white border-b " key={order?._id}>
                            <td  className="py-4">
                                {index + 1}
                            </td>
                            <td >
                                {order?._id}
                            </td>
                            <td>
                                {order?.total}
                            </td>
                            <td className="">
                                <Details order={order} setOrder={setOrder}></Details>
                            </td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
            {loading && <TableSkelaton />}
        </div>
    );
};

export default Pending;