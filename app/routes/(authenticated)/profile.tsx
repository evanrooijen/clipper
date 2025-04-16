import BaseLayout from "@/components/layout/base-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/profile")({
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
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-4">Welcome, {user.name}!</p>
      </div>
    </BaseLayout>
  );
}
