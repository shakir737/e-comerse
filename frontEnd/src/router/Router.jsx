import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import Login from "../components/Login";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
         {
           path: "/menu",
           element: <Menu/>
         },
        // {
        //   path: "/order",
        //   element:<PrivateRoute><Order/></PrivateRoute>
        // },
        // {
        //   path: "/update-profile",
        //   element: <UserProfile/>
        // },
        // {
        //   path: "/cart-page",
        //   element: <CartPage/>
        // }
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    // {
    //   path: 'dashboard',
    //   element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    //   children: [
    //     {
    //       path: '',
    //       element: <Dashboard/>
    //     },
    //     {
    //       path: 'users', 
    //       element: <Users/>
    //     },
    //     {
    //       path: 'add-menu',
    //       element: <AddMenu/>
    //     }, 
    //     {
    //       path: "manage-items",
    //       element: <ManageItems/>
    //     },
    //     {
    //       path: "update-menu/:id",
    //       element: <UpdateMenu/>,
    //       loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
    //     }
    //   ]
    // }
  ]);

  export default router;