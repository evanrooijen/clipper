import HeaderMenu from "@/components/header";
import { auth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { getWebRequest } from "@tanstack/react-start/server";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const req = await getWebRequest();

    if (!req) {
      throw new Error("No request found");
    }

    // Your loader logic here
    const session = await auth.api.getSession({
      headers: req?.headers,
    });
    return {
      user: session?.user,
    };
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="@container/main min-h-svh">
      <div className="bg-muted/40 sticky top-0 p-4">
        <HeaderMenu className="container" user={data.user} />
      </div>
    </div>
  );
}
