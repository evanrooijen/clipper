import BaseLayout from "@/components/layout/base-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/")({
  component: RouteComponent,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  return <BaseLayout user={user} />;
}
