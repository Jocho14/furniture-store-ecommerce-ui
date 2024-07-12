import { lazy } from "react";

const Main = lazy(() => import("../layout/Main/Main"));

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

// const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));

// const AccountPage = lazy(() => import("../pages/AccountPage"));
// const ManagementPage = lazy(() => import("../pages/ManagementPage"));

// const CartPage = lazy(() => import("../pages/CartPage"));
// const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
// const ReturnPage = lazy(() => import("../pages/ReturnPage"));
// const SuccessPage = lazy(() => import("../pages/SuccessPage"));

// const LogInPage = lazy(() => import("../pages/LogInPage"));

// const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <HomePage /> },
      //   { path: "product/:productId", element: <ProductDetailPage /> },
      //   { path: "account", element: <AccountPage /> },
      //   { path: "management", element: <ManagementPage /> },
    ],
  },
  //   { path: "login", element: <LogInPage /> },
  //   { path: "*", element: <NotFoundPage /> },
];

export default routes;
