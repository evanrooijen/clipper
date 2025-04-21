import { queryOptions } from "@tanstack/react-query";
import { getFollowers, getFollowing } from "./functions";

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

export { getUserFollowersQuery, getUserFollowingQuery };
