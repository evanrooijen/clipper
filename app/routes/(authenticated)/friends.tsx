import BaseLayout from "@/components/layout/base-layout";
import { getFollowers, getFollowing } from "@/features/follows/functions";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { User } from "better-auth";
import { Suspense } from "react";

import UserList from "@/features/follows/components/user-list";

const getUserFollowersQuery = (userId: string) =>
  queryOptions({
    queryKey: ["followers", userId],
    queryFn: () => getFollowers({ data: { id: userId } }),
  });

const getUserFollowingQuery = (userId: string) =>
  queryOptions({
    queryKey: ["following", userId],
    queryFn: () => getFollowing({ data: { id: userId } }),
  });

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
function Followers({ user }: { user: { id: string; name: string } }) {
  const { data } = useSuspenseQuery(getUserFollowersQuery(user.id));

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-3xl">Followers</h2>
      <UserList
        isFollowing={false}
        onFollow={() => {}}
        users={data.map((user) => user.following)}
      />
    </div>
  );
}
function Following({ user }: { user: User }) {
  const { data } = useSuspenseQuery(getUserFollowingQuery(user.id));

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-3xl">Following</h2>
      <UserList
        isFollowing={true}
        onUnfollow={() => {}}
        users={data.map((user) => user.followedBy)}
      />
    </div>
  );
}
