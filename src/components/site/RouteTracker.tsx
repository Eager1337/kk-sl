import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@/lib/analytics";

/**
 * Fires a `page_view` analytics event on every route change.
 * Rendered once inside the Router.
 */
export const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    // Don't count the analytics dashboard itself as a marketing page view.
    if (location.pathname.startsWith("/analytics")) return;
    void track("page_view", { label: document.title, meta: { search: location.search } });
  }, [location.pathname, location.search]);
  return null;
};
