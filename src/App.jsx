import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import AdminAuthGuard from "./authGuard/AdminAuthGuard/AdminAuthGuard";
import { useEffect } from "react";
import { setLoading, setUser } from "./features/auth/authSlice";
import Modal from "./components/Modal/Modal";
import { toggleGlobalLoading } from "./components/Modal/components/GlobalLoading/GlobalLoading";
import LoginGuard from "./authGuard/LoginGuard/LoginGuard";
import Users from "./pages/Users/Users";

export const BACKEND_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3013' : 'https://galiver-backend.vercel.app/'

const App = () => {
  const { user, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminAuthGuard><DashboardLayout /></AdminAuthGuard>,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/users",
          element: <Users></Users>
        },
      ]
    },
    {
      path: "/login",
      element: <LoginGuard> <Login /></LoginGuard>
    }
  ])

  useEffect(() => {
    const token = localStorage.getItem('admin-token')
    if (!token || user) dispatch(setLoading(false))
    if (token) {
      toggleGlobalLoading('open')
      dispatch(setLoading(true))
      fetch(`${BACKEND_URL}/api/v1/auth/admin-auto-login`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data?.success && data?.info?.role === 'admin') {
            dispatch(setUser(data.info))
          }
        })
        .finally(() => {
          toggleGlobalLoading('close')
          dispatch(setLoading(false))
        })
    }
  }, [])


  return (
    <div className="bg-white text-black">
      <RouterProvider router={router} ></RouterProvider>
      <Modal />
    </div>
  );
};

export default App;