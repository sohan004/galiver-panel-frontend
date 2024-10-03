/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import logo from '../../assets/logo/png-02.png'
import { IoMdPrint } from 'react-icons/io';
import useFormattedDateTime from '../../Hooks/useFormatDateTime';

const PosPrint = ({ order, children }) => {

    const ref = useRef(null)
    const { formattedDate, formattedTime } = useFormattedDateTime(new Date().toISOString());

    const { _id, name, phone, subDistrict, district, address, total, orderProduct, status, deliveryCharge, consignment_id } = order

    const handlePrint = useReactToPrint({
        contentRef: ref,
        pageStyle: `@media print {
            @page {
              size: $58mm ${ref.current?.clientHeight + 20}px;
              margin: 0;
            }
          }`
    });



    return (
        <div>
            <div
                className='cursor-pointer'
                onClick={handlePrint}>
                {children}
            </div>
            <div
                className='w-0 h-0 overflow-hidden'>
                <div ref={ref} className={`w-[58mm] p-2 font-mono mx-auto  bg-white text-black overflow-hidden`}>
                    <div className=" text-xs ">
                        <div className="text-center mb-4">
                            <img src={logo} className="mx-auto  w-12" />
                            <h1 className="font-bold text-lg">Galiver</h1>
                            <p className="text-xs">{formattedDate} | {formattedTime}</p>
                            <p className="text-xs mt-1 font-bold">#{_id}</p>
                        </div>

                        {/* Customer Details */}
                        <div className="text-xs mb-4">
                            <div className="flex justify-between gap-2">
                                <span className="font-bold">Con. ID:</span>
                                <span>{consignment_id || "N/A"}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-bold">Customer:</span>
                                <span>{name}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-bold">Phone:</span>
                                <span>{phone}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="font-bold">Address:</span>
                                <span>{`${address}, ${subDistrict}, ${district}`}</span>
                            </div>
                        </div>

                        {/* Products Table */}
                        <table className="w-full text-xs mb-4">
                            <thead>
                                <tr className="border-b border-gray-400">
                                    <th className="text-left">Product</th>
                                    <th className="text-right">Qty</th>
                                    <th className="text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderProduct.map((item, index) => (
                                    <tr key={index} className="border-b border-dashed border-gray-400">
                                        <td>
                                            <p>{item.product.title}</p>
                                            {item?.product?.color && (item?.product?.color !== "N/A") && <p>Color : {item?.product?.color}</p>}
                                            {item?.product?.size && (item?.product?.size !== "N/A") && <p>Size : {item?.product?.size}</p>}
                                            {item?.product?.height && (item?.product?.height !== "N/A") && <p>Height : {item?.product?.height}</p>}
                                            {item?.product?.width && (item?.product?.width !== "N/A") && <p>Width : {item?.product?.width}</p>}
                                            {item?.product?.material && (item?.product?.material !== "N/A") && <p>Material : {item?.product?.material}</p>}
                                            {item?.product?.variant && (item?.product?.variant !== "N/A") && <p>Variant : {item?.product?.variant}</p>}
                                        </td>
                                        <td className="text-right">{item.quantity}x</td>
                                        <td className="text-right"> {(item?.quantity * (item?.product.price - item?.product.discount))}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Order Summary */}
                        <div className="text-xs mb-4">
                            <div className="flex justify-between">
                                <span>Vat</span>
                                <span>{(0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charge</span>
                                <span>{deliveryCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-4">
                            <p className="text-xs">Thank you for shopping with Galiver!</p>
                            <p className="text-xs">Visit us: <a href="https://www.galiver.shop" className="font-bold underline">galiver.shop</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosPrint;