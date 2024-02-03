import logo from '../../assets/logo/png-04.png'
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from '../../assets/bg/arrangement-black-friday-shopping-carts-with-copy-space.jpg'
const Login = () => {
    const [showPass, setShowPass] = useState(false)

    return (
        <div style={{ backgroundImage: `url(${img})` }} className="w-screen h-screen overflow-y-auto bg-current bg-cover bg-no-repeat  ">

            <div className='fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 max-w-[400px] w-full px-5'>
                <div className="rounded-lg bg-white  w-full">
                    <div className="relative h-auto">
                    </div>
                    <div className="px-7 pt-4 pb-8 rounded-3xl shadow-xl">
                        <img className='w-[150px] md:w-[170px] mt-2 mb-7 mx-auto' src={logo} alt="" />
                        <form action="" method="POST">
                            <div className="relative">
                                <input
                                    name="email"
                                    type="text"
                                    className="peer w-full px-0.5 border-0 border-b-2 
                                                    py-2
                                                    focus:outline-none
                                                    border-gray-300 placeholder-transparent 
                                                    focus:ring-0
                                                    bg-white
                                                    focus:border-orange-600" placeholder="willPig@tailwind.com" />
                                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-orange-600 peer-focus:text-sm">Email</label>
                            </div>
                            <div className="mt-5 relative">
                                {showPass ?
                                    <FaEye
                                        onClick={() => setShowPass(false)}
                                        className="absolute cursor-pointer right-2 bottom-3" /> :
                                    <FaEyeSlash
                                        onClick={() => setShowPass(true)}
                                        className="absolute cursor-pointer right-2 bottom-3" />
                                }
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    className="peer w-full px-0.5 border-0 py-2 focus:outline-none bg-white
                                                    border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-orange-600" placeholder="Password" />
                                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-orange-600 peer-focus:text-sm">Password</label>
                            </div>
                            <button type="button" className="w-full mt-14 py-2  text-white font-semibold text-center rounded-full bg-orange-600 transition-all hover:bg-orange-700 focus:outline-none">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;