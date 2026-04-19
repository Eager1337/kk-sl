import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Mango from "./pages/Mango.tsx";
import MixedFruit from "./pages/MixedFruit.tsx";
import Yogurt from "./pages/Yogurt.tsx";
import Water from "./pages/Water.tsx";
import Orange from "./pages/Orange.tsx";
import Apple from "./pages/Apple.tsx";
import Tamarind from "./pages/Tamarind.tsx";
import Store from "./pages/Store.tsx";
import Support from "./pages/Support.tsx";
import About from "./pages/About.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mango" element={<Mango />} />
          <Route path="/orange" element={<Orange />} />
          <Route path="/mixed-fruit" element={<MixedFruit />} />
          <Route path="/yogurt" element={<Yogurt />} />
          <Route path="/apple" element={<Apple />} />
          <Route path="/tamarind" element={<Tamarind />} />
          <Route path="/water" element={<Water />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
