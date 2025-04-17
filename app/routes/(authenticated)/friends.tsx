import BaseLayout from "@/components/layout/base-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/friends")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = context.user;

    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirectTo: location.href,
        },
      });
    }

    return { user };
  },
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return (
    <BaseLayout user={user}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Friends</h1>
        <p className="mt-4">Welcome, {user.name}!</p>
      </div>
    </BaseLayout>
  );
}
