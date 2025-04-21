import { z } from "zod";

const UserIdSchema = z.object({
  id: z.string(),
});

const UnFollowSchema = z.object({
  userId: z.string(),
});

const FollowSchema = z.object({
  userId: z.string(),
});

export { UserIdSchema, UnFollowSchema, FollowSchema };
