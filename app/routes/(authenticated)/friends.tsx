import BaseLayout from "@/components/layout/base-layout";
import { getFollowers, getFollowing } from "@/features/follows/functions";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { User } from "better-auth";
import { Suspense } from "react";

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
        <h1 className="text-2xl font-bold">Friends</h1>
        <p className="mt-4">Welcome, {user.name}!</p>
        <div className="grid grid-cols-2">
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
  const { data: followers } = useSuspenseQuery(getUserFollowersQuery(user.id));

  return (
    <div>
      <h2 className="text-xl font-bold">Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.followingId}>{follower.following.name}</li>
        ))}
      </ul>
    </div>
  );
}
function Following({ user }: { user: User }) {
  const { data: following } = useSuspenseQuery(getUserFollowingQuery(user.id));

  return (
    <div>
      <h2 className="text-xl font-bold">Following</h2>
      <ul>
        {following.map((follow) => (
          <li key={follow.followedById}>{follow.followedBy.name}</li>
        ))}
      </ul>
    </div>
  );
}
