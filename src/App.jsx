import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import AdminAuthGuard from "./authGuard/AdminAuthGuard/AdminAuthGuard";
import Modal from "./components/Modal/Modal";
import LoginGuard from "./authGuard/LoginGuard/LoginGuard";
import Users from "./pages/Users/Users";
import Categories from "./pages/Categories/Categories";
import SubCategories from "./pages/SubCategories/SubCategories";
import SubSubCategories from "./pages/SubSubCategories/SubSubCategories";
import useSocketConnect from "./Hooks/useSockeConnect";
import useAutoLogin from "./Hooks/useAutoLogin";
import AddProduct from "./pages/AddProduct/AddProduct";
import { Toaster } from "react-hot-toast";

export const BACKEND_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3013' : 'https://galiver-backend.onrender.com'


const App = () => {

  //socket connection
  useSocketConnect()

  //auto login
  useAutoLogin()

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
        {
          path: "/categories",
          element: <Categories></Categories>
        },
        {
          path: "/sub-categories",
          element: <SubCategories></SubCategories>
        },
        {
          path: "/sub-sub-categories",
          element: <SubSubCategories></SubSubCategories>
        },
        {
          path: "/add-product",
          element: <AddProduct></AddProduct>
        },
      ]
    },
    {
      path: "/login",
      element: <LoginGuard> <Login /></LoginGuard>
    }
  ])

  return (
    <div className="bg-white text-black">
      <RouterProvider router={router} ></RouterProvider>
      <Modal />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default App;