import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// using createBrowserRouter for declarative way of defining routes
// it accepts
const router = createBrowserRouter([
  {
    // without path Router knows it's from layout
    element: <AppLayout />,
    // error element in case of errors which bubbles up until this point
    errorElement: <Error />,
    // children (array) is for nested routes (Outlet)
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/menu",
        element: <Menu />,
        // 'loader' property to fetch data during the component rendering (not after)
        loader: menuLoader,
        // if something went wrong during fetching (or another error)
        // the error element will be rendered
        // the errors are bubbled up to the parent element, unless the
        // 'errorElement' property in specified in the child component like below
        // usually they are specified inside child to render them inside layout, not only Error element
        // inside Error element you need to use 'useRouteError' hook
        errorElement: <Error />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },

      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },

      // {
      //   path: "*",
      //   element: <ErrorPage />,
      //   // This wildcard route catches all paths that do not match above routes.
      // },
    ],
  },
]);

function App() {
  //
  return <RouterProvider router={router} />;
}

export default App;
