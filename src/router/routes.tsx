import { lazy } from "react";
import ProtectedRoute from "./protectedRoute";

const ClientMain = lazy(() => import("../layout/clientLayout/Main/Main"));
const HomePage = lazy(() => import("../pages/client/HomePage/HomePage"));
const ProductDetailPage = lazy(
  () => import("../pages/client/ProductDetailPage/ProductDetailPage")
);
const ShoppingCartPage = lazy(
  () => import("../pages/client/ShoppingCartPage/ShoppingCartPageContainer")
);
const AuthPage = lazy(() => import("../pages/client/AuthPage/AuthPage"));
const DeliveryDetailsPage = lazy(
  () => import("../pages/client/DeliveryDetailsPage/DeliveryDetailsPage")
);

const CheckoutPage = lazy(
  () => import("../pages/client/CheckoutPage/CheckoutPage")
);

const CheckoutReturnPage = lazy(
  () => import("../pages/client/CheckoutReturnPage/CheckoutReturnPage")
);

const ProductListPage = lazy(
  () => import("../pages/client/ProductListPage/ProductListPage")
);

// employee side:
const EmployeeMain = lazy(() => import("../layout/employeeLayout/Main/Main"));
const EmployeeProductListPage = lazy(
  () => import("../pages/employee/ProductListPage/ProductListPage")
);
const ProductManagePage = lazy(
  () => import("../pages/employee/ProductManagePage/ProductManagePage")
);
const OrderListPage = lazy(
  () => import("../pages/employee/OrderListPage/OrderListPage")
);

const EmployeeHomePage = lazy(
  () => import("../pages/employee/HomePage/HomePage")
);

const EmployeeAuthPage = lazy(
  () => import("../pages/employee/AuthPage/AuthPage")
);

const OrderManagePage = lazy(
  () => import("../pages/employee/OrderManagePage/OrderManagePage")
);

const routes = [
  {
    path: "/",
    element: <ClientMain />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shopping-cart", element: <ShoppingCartPage /> },
      { path: "product", element: <ProductListPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      {
        path: "auth",
        element: (
          <ProtectedRoute>
            <AuthPage />
          </ProtectedRoute>
        ),
      },
      { path: "order/checkout/:orderId", element: <CheckoutPage /> },
      { path: "order/delivery-details", element: <DeliveryDetailsPage /> },
      { path: "return", element: <CheckoutReturnPage /> },
    ],
  },

  {
    path: "/employee",
    element: (
      <ProtectedRoute>
        <EmployeeMain />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "product/list",
        element: <EmployeeProductListPage />,
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
        path: "order/:id/manage",
        element: <OrderManagePage />,
      },
      {
        path: "home",
        element: <EmployeeHomePage />,
      },
    ],
  },
  {
    path: "/employee/auth",
    element: (
      <ProtectedRoute>
        <EmployeeAuthPage />
      </ProtectedRoute>
    ),
  },
  //   { path: "*", element: <NotFoundPage /> },
];

export default routes;
