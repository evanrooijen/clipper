import { auth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { getHeaders } from "@tanstack/react-start/server";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const headers = await getHeaders();
    // Your loader logic here
    const session = await auth.api.getSession({
      // @ts-expect-error - headers are not typed yet
      headers,
    });
    return { session };
  },
});

function RouteComponent() {
  const user = Route.useLoaderData();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
      <p>Feel free to customize it as needed!</p>
      <p>User session: {JSON.stringify(user.session)}</p>
    </div>
  );
}
