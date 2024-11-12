import { lazy } from "react";

const ClientMain = lazy(() => import("../layout/clientLayout/Main/Main"));
const HomePage = lazy(() => import("../pages/client/HomePage/HomePage"));
const ProductDetailPage = lazy(
  () => import("../pages/client/ProductDetailPage/ProductDetailPage")
);
const ShoppingCartPage = lazy(
  () => import("../pages/client/ShoppingCartPage/ShoppingCartPageContainer")
);
const AuthPage = lazy(() => import("../pages/client/AuthPage/AuthPage"));

// const AccountPage = lazy(() => import("../pages/AccountPage"));
// const ManagementPage = lazy(() => import("../pages/ManagementPage"));

const CheckoutPage = lazy(
  () => import("../pages/client/CheckoutPage/CheckoutPage")
);

const CheckoutReturnPage = lazy(
  () => import("../pages/client/CheckoutReturnPage/CheckoutReturnPage")
);

// const ReturnPage = lazy(() => import("../pages/ReturnPage"));
// const SuccessPage = lazy(() => import("../pages/SuccessPage"));

// const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// employee side:
const EmployeeMain = lazy(() => import("../layout/employeeLayout/Main/Main"));
const ProductListPage = lazy(
  () => import("../pages/employee/ProductListPage/ProductListPage")
);
const ProductManagePage = lazy(
  () => import("../pages/employee/ProductManagePage/ProductManagePage")
);
const OrderListPage = lazy(
  () => import("../pages/employee/OrderListPage/OrderListPage")
);

const TestApp = lazy(() => import("../layout/employeeLayout/test/TestApp"));

const routes = [
  {
    path: "/",
    element: <ClientMain />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shopping-cart", element: <ShoppingCartPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "return", element: <CheckoutReturnPage /> },
      //   { path: "account", element: <AccountPage /> },
      //   { path: "management", element: <ManagementPage /> },
    ],
  },

  {
    path: "/employee",
    element: <EmployeeMain />,
    children: [
      {
        path: "product/list",
        element: <ProductListPage />,
      },
      {
        path: "product/add",
        element: <ProductManagePage isAdding={true} />,
      },
      {
        path: "product/:id/manage",
        element: <ProductManagePage isAdding={false} />,
      },
      {
        path: "order/list",
        element: <OrderListPage />,
      },
      {
        path: "test",
        element: <TestApp />,
      },
    ],
  },

  //   { path: "*", element: <NotFoundPage /> },
];

export default routes;
