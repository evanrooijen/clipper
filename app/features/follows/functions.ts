import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/headers";
import { createServerFn } from "@tanstack/react-start";
import { FollowSchema, UnFollowSchema, UserIdSchema } from "./schema";

const getFollowers = createServerFn({ method: "GET" })
  .validator(UserIdSchema)
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

const getFollowing = createServerFn({ method: "GET" })
  .validator(UserIdSchema)
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

const followUser = createServerFn()
  .validator(FollowSchema)
  .handler(async (context) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Not authenticated");

    const followingId = currentUser.user.id;
    const { userId } = context.data;

    const follow = await prisma.follows.findFirst({
      where: {
        followedById: userId,
        followingId,
      },
    });

    if (follow) {
      throw new Error("Already following");
    }

    await prisma.follows.create({
      data: {
        followedById: userId,
        followingId,
      },
    });

    return true;
  });

const unFollowUser = createServerFn()
  .validator(UnFollowSchema)
  .handler(async (context) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Not authenticated");

    const { userId } = context.data;
    const followingId = currentUser.user.id;

    const follow = await prisma.follows.findFirst({
      where: {
        followedById: userId,
        followingId,
      },
    });

    if (!follow) {
      throw new Error("Follow not found");
    }

    await prisma.follows.delete({
      where: {
        followingId_followedById: {
          followedById: follow.followedById,
          followingId: follow.followingId,
        },
      },
    });
    return true;
  });

export { followUser, getFollowers, getFollowing, unFollowUser };
