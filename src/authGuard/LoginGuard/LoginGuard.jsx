import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import logo from '../../assets/logo/png-02.png'

// eslint-disable-next-line react/prop-types
const LoginGuard = ({ children }) => {

    const { user, loading } = useSelector(state => state.auth)

    if (loading) {
        return <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
            <img src={logo} className="w-24 bg-white rounded-full animate-pulse" alt="" />
        </div>
    }

    if (!user) {
        return children
    }

    else {
        return <Navigate to="/" />
    }
};

export default LoginGuard;