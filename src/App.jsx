import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ChatPage from "./ChatPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
