import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../../assets/logo/png-02.png'
import { MdCategory, MdDashboard } from 'react-icons/md'
import { FaAlignLeft, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { IoAddCircleSharp, IoCartSharp, IoNotificationsSharp } from 'react-icons/io5'
import { RiShoppingBag2Fill } from 'react-icons/ri'
import { BiSolidShoppingBags } from 'react-icons/bi'
import { PiSubtractSquareFill, PiSubtractFill } from 'react-icons/pi'
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { FaShop } from "react-icons/fa6";


const DashboardLayout = () => {
    const [showLeftSideBar, setShowLeftSideBar] = useState(true)
    const dispatch = useDispatch()

    const menuData = [
        {
            name: 'Dashboard',
            icon: MdDashboard,
            path: '/'
        },
        {
            name: 'Orders',
            icon: IoCartSharp,
            path: '/orders'
        },
        {
            name: 'All Products',
            icon: RiShoppingBag2Fill,
            path: '/products'
        },
        {
            name: 'Add Product',
            icon: IoAddCircleSharp,
            path: '/add-product'
        },
        {
            name: 'Users',
            icon: FaUser,
            path: '/users'
        },
        {
            name: 'Shop',
            icon: FaShop,
            path: '/Shop'
        },
        {
            name: 'Categories',
            icon: MdCategory,
            path: '/categories'
        },
        {
            name: 'Sub Categories',
            icon: PiSubtractSquareFill,
            path: '/sub-categories'
        },
        {
            name: 'Sub Sub Categories',
            icon: PiSubtractFill,
            path: '/sub-sub-categories'
        },
    ]

    const signOut = () => {
        localStorage.removeItem('admin-token')
        dispatch(setUser(null))
    }

    const clickSideBar = () => {
        const width = window.innerWidth
        if(width < 768) setShowLeftSideBar(true)
    }

    return (
        <div>
            <div className='w-full flex items-start '>

                <div onClick={() => setShowLeftSideBar(prev => !prev)} className={`fixed top-0 block md:hidden left-0 w-full h-full bg-black opacity-50 z-[50] backdrop-blur-md ${showLeftSideBar ? 'hidden' : 'block'}`}></div>

                <div id="sidebar" className={`h-screen bg-[#1C2434] fixed md:sticky top-0 duration-500 w-[280px] overflow-y-auto  overflow-hidden  z-50 md:z-10 ${showLeftSideBar ? 'md:ml-0 -ml-[280px]' : 'ml-[0] md:-ml-[280px]'}  p-5 md:p-4`}>
                    <div className="">
                        <p className="flex items-center text-2xl font-semibold text-white"> <img src={logo} className="w-16 " alt="" /> Galiver</p>
                    </div>
                    <div className="mt-4 md:mt-5  grid grid-cols-1 gap-5">
                        {menuData.map((item, index) => <NavLink
                        onClick={clickSideBar}
                        to={item.path} key={index} className={({ isActive }) => `flex items-center  p-3 rounded-md cursor-pointer gap-3 text-base font-medium md:text-lg text-gray-200 ${isActive ? 'bg-slate-600' : ''}`}><item.icon className="text-2xl" /> {item.name}</NavLink>)}
                        <p onClick={signOut} className="flex items-center  p-3 rounded-md cursor-pointer gap-3 text-base font-medium md:text-lg text-orange-500"> <FaSignOutAlt /> Sign Out</p>

                    </div>
                </div>

                {/* main page */}
                <div className="flex-1 relative">
                    <div className="flex flex-col h-screen absolute top-0 left-0 w-full ">
                        <div className=" bg-white border-b p-4 flex items-center justify-between shadow relative">
                            <FaAlignLeft onClick={() => setShowLeftSideBar(!showLeftSideBar)} className=" text-xl cursor-pointer" />
                            <div className="flex items-center gap-4 ">
                                <FaUserCircle className="text-2xl text-gray-800" />
                                <IoNotificationsSharp className="text-2xl text-gray-800 " />
                            </div>
                        </div>
                        <div className="p-2 md:p-7 flex-1 overflow-y-auto bg-[#F1F5F9] ">
                            <div>
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;