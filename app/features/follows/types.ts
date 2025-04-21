import { getFollowers, getFollowing } from "./functions";
import { Prisma } from "@prisma-app/client";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type FollowingWithUser = ThenArg<ReturnType<typeof getFollowers>>;
type FollowersWithUser = ThenArg<ReturnType<typeof getFollowing>>;

type UserPersonalData = Prisma.UserGetPayload<{
  select: { email: true; name: true; id: true; image: true };
}>;

export {
  type UserPersonalData,
  type FollowingWithUser,
  type FollowersWithUser,
};
