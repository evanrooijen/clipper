import BaseLayout from "@/components/layout/base-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

import Followers from "@/features/follows/components/followers-list";
import Following from "@/features/follows/components/following-list";
import {
  getUserFollowersQuery,
  getUserFollowingQuery,
} from "@/features/follows/queries";

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
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(getUserFollowersQuery(context.user.id));
    context.queryClient.prefetchQuery(getUserFollowingQuery(context.user.id));

    return { user: context.user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  return (
    <BaseLayout user={user}>
      <div className="p-4">
        <h1 className="font-display text-5xl">Friends</h1>
        <p className="mt-4">Welcome, {user.name}!</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Suspense fallback="Loading...">
            <Followers user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <Following user={user} />
          </Suspense>
        </div>
      </div>
    </BaseLayout>
  );
}
