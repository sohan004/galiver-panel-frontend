/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BACKEND_URL } from '../../../../App';
import { toggleGlobalLoading } from '../../../../components/Modal/components/GlobalLoading/GlobalLoading';

const Details = ({ order, setOrder }) => {
    const { _id, name, phone, subDistrict, district, address, total, orderProduct, status, deliveryCharge, consignment_id } = order
    const [showModal, setShowModal] = useState(false)
    const [note, setNote] = useState('')

    const accept = (id) => {
        toggleGlobalLoading('open')
        fetch(`${BACKEND_URL}/api/v1/order/accept`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId: id, note })
        })
            .then(response => response.json())
            .then(data => {
                setShowModal(false)
                setOrder(prev => prev.filter(order => order._id != id))
            })
            .finally(() => {
                toggleGlobalLoading('close')
            })
    }

    const changeStatus = (id, status) => {
        toggleGlobalLoading('open')
        fetch(`${BACKEND_URL}/api/v1/order`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('admin-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId: id, status })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setShowModal(false)
                setOrder(prev => prev.filter(order => order._id != id))
            })
            .finally(() => {
                toggleGlobalLoading('close')
            })
    }


    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-2 py-1 text-xs rounded-md ">Details</button>

            {showModal && <div className='bg-black fixed top-0 left-0 w-full h-full z-50 bg-opacity-30 flex items-center justify-center p-2'>
                <div className='p-4 bg-white max-w-[600px] w-full rounded-lg relative'>

                    <p
                        onClick={() => setShowModal(false)}
                        className="absolute top-3 right-3 cursor-pointer"> &#10006;</p>

                    <h3 className='border-b border-gray-300 pb-3 text-center font-bold md:text-lg v'>Order Id: {_id}</h3>
                    <div className='mt-3 border-b border-gray-300 pb-3'>
                        <p className='text-gray-800 text-lg md:text-xl font-medium'>Consignment id : <span>{consignment_id}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>Name : <span>{name}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>Phone : <span>{phone}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>Upazila : <span>{subDistrict}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>District : <span>{district}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>Address : <span>{address}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>Delivery Charge : <span>{deliveryCharge}</span></p>
                        <p className='text-gray-800 md:text-lg font-medium'>Total : <span>{total}</span></p>
                    </div>
                    <div className=' md:text-lg'>
                        {orderProduct.map((product, index) => <div
                            className=' mt-4 flex gap-2'
                            key={index}>
                            <p>{index + 1}.</p>
                            <div>
                                <p>Product Name: {product?.product.title}</p>
                                <p>Product Price: {product?.product.price - product?.product.discount}</p>
                                <p>Product Quantity: {product?.quantity}x</p>
                                <p> Total: {(product?.quantity * (product?.product.price - product?.product.discount))}</p>
                            </div>
                        </div>)}
                    </div>

                    {status === 'pending' && <textarea
                        value={note}
                        placeholder='Write a note here...'
                        onChange={e => setNote(e.target.value)}
                        className='w-full h-24 border border-gray-300 outline-none p-2 mt-3'
                    ></textarea>}

                    <div className='mt-3 flex justify-center items-center gap-4'>
                        {
                            status === 'pending' && <>
                                <button
                                    onClick={() => changeStatus(_id, 'canceled')}
                                    className="btn btn-error text-white">Cancel</button>
                                <button
                                    onClick={() => accept(_id)}
                                    className="btn btn-success text-white">Accept</button>
                            </>
                        }
                        {
                            status === 'accepted' && <>
                                <button
                                    onClick={() => changeStatus(_id, 'canceled')}
                                    className="btn btn-error text-white">Cancel</button>
                                <button
                                    onClick={() => changeStatus(_id, 'shipped')}
                                    className="btn btn-success text-white">Go to ship</button>
                            </>
                        }
                        {
                            status === 'shipped' && <>
                                <button
                                    onClick={() => changeStatus(_id, 'returned')}
                                    className="btn btn-success text-white">Return</button>
                                <button
                                    onClick={() => changeStatus(_id, 'delivered')}
                                    className="btn btn-success text-white">Delivered</button>
                            </>
                        }
                    </div>

                </div>
            </div>}
        </div>
    );
};

export default Details;