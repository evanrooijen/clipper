import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { User } from "better-auth";
import { toast } from "sonner";
import { unFollowUser } from "../functions";
import { getUserFollowingQuery } from "../queries";
import UserList from "./user-list";

function Following({ user }: { user: User }) {
  const { data } = useSuspenseQuery(getUserFollowingQuery(user.id));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: unFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries(getUserFollowingQuery(user.id));
      toast.success("Successfully unfollowed");
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-3xl">Following</h2>
      <UserList
        isFollowing={true}
        onUnfollow={(userId) => mutation.mutate({ data: { userId } })}
        users={data.map((user) => user.followedBy)}
      />
    </div>
  );
}
export default Following;
