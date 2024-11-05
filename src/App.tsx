import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import CartProvider from "./context/client/CartContext";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </CartProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
