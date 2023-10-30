import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./core/state/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticationContext } from "./core/utils/context/AuthenticationContext";
import "react-toastify/dist/ReactToastify.css";
import { Toastr } from "./components/common/Toastr";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationContext>
          <Toastr />
          <App />
        </AuthenticationContext>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
