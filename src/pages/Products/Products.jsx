import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Products = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-3">
                <NavLink to="/products/approved" className={({ isActive }) => `${isActive ? 'bg-slate-700 rounded-lg text-white' : 'border-b rounded-none border-slate-700 bg-slate-200'} hover:bg-slate-700 hover:rounded-lg hover:text-white duration-500  text-center  md:p-3 p-2 overflow-hidden  text-xs md:text-base`}>Active</NavLink>
                <NavLink to="/products/pending" className={({ isActive }) => `${isActive ? 'bg-slate-700 rounded-lg text-white' : 'border-b rounded-none border-slate-700 bg-slate-200'} hover:bg-slate-700 hover:rounded-lg hover:text-white duration-500  text-center  md:p-3 p-2 overflow-hidden  text-xs md:text-base`}>Pending</NavLink>
                <NavLink to="/products/rejected" className={({ isActive }) => `${isActive ? 'bg-slate-700 rounded-lg text-white' : 'border-b rounded-none border-slate-700 bg-slate-200'} hover:bg-slate-700 hover:rounded-lg hover:text-white duration-500  text-center  md:p-3 p-2 overflow-hidden  text-xs md:text-base`}>Rejected</NavLink>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Products;