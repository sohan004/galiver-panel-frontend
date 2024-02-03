import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ])

  return (
    <div className="bg-white text-black">
      <RouterProvider router={router} ></RouterProvider>

    </div>
  );
};

export default App;