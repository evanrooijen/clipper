import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { followUser } from "../functions";
import { getUserFollowersQuery, getUserFollowingQuery } from "../queries";
import UserList from "./user-list";

function Followers({ user }: { user: { id: string; name: string } }) {
  const { data } = useSuspenseQuery(getUserFollowersQuery(user.id));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries(getUserFollowingQuery(user.id));
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-3xl">Followers</h2>
      <UserList
        isFollowing={false}
        onFollow={(userId) => mutation.mutate({ data: { userId } })}
        users={data.map((user) => user.following)}
      />
    </div>
  );
}

export default Followers;
