import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 minute
      },
    },
  });

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, user: undefined! },
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      scrollRestoration: true,
      defaultStructuralSharing: true,
    }),
    queryClient,
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
