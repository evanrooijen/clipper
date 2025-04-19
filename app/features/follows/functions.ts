import { prisma } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const UserIdSchema = z.object({
  id: z.string(),
});

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
        following: true,
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
        followedBy: true,
      },
    });
  });
