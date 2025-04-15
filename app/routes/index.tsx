import HeaderMenu from "@/components/header";
import { auth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";

const getServerHeaders = createServerFn().handler(async () => {
  return getHeaders();
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const headers = await getServerHeaders();
    const nodeHeaders = new Headers();

    Object.entries(headers).forEach(([key, value]) => {
      if (value) {
        nodeHeaders.append(key, value);
      }
    });

    // Your loader logic here
    const session = await auth.api.getSession({
      headers: nodeHeaders,
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
