import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouteTracker } from "@/components/site/RouteTracker";
// Landing page loads eagerly for the fastest first paint.
import Index from "./pages/Index.tsx";

// Heavy / secondary routes are code-split so the initial bundle stays small on mobile.
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Mango = lazy(() => import("./pages/Mango.tsx"));
const MixedFruit = lazy(() => import("./pages/MixedFruit.tsx"));
const Yogurt = lazy(() => import("./pages/Yogurt.tsx"));
const Water = lazy(() => import("./pages/Water.tsx"));
const Orange = lazy(() => import("./pages/Orange.tsx"));
const Apple = lazy(() => import("./pages/Apple.tsx"));
const Tamarind = lazy(() => import("./pages/Tamarind.tsx"));
const Store = lazy(() => import("./pages/Store.tsx"));
const Support = lazy(() => import("./pages/Support.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Wholesale = lazy(() => import("./pages/Wholesale.tsx"));
const Analytics = lazy(() => import("./pages/Analytics.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--paper))]">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[hsl(var(--sea))] border-t-transparent" aria-label="Loading" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Suspense fallback={<RouteFallback />}>
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
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
