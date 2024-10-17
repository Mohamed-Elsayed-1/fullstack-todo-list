import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="w-5/12 mx-auto">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={true} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
