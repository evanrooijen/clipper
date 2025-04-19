import { prisma } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Prisma } from "@prisma-app/client";

const UserIdSchema = z.object({
  id: z.string(),
});

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export const getFollowers = createServerFn({ method: "GET" })
  .validator((person: unknown) => {
    return UserIdSchema.parse(person);
  })
  .handler(async (context) => {
    return prisma.follows.findMany({
      where: {
        followedById: context.data.id,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  });

export const getFollowing = createServerFn({ method: "GET" })
  .validator((person: unknown) => {
    return UserIdSchema.parse(person);
  })
  .handler(async (context) => {
    return prisma.follows.findMany({
      where: {
        followingId: context.data.id,
      },
      include: {
        followedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  });

export type FollowingWithUser = ThenArg<ReturnType<typeof getFollowers>>;
export type FollowersWithUser = ThenArg<ReturnType<typeof getFollowing>>;

type UserPersonalData = Prisma.UserGetPayload<{
  select: { email: true; name: true; id: true; image: true };
}>;

export { type UserPersonalData };
