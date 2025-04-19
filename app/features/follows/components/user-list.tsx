import UserAvatar from "@/components/user-avatar";
import { UserPersonalData } from "../functions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Followers = {
  isFollowing: false;
  onFollow: (userId: string) => void;
};

type Following = {
  isFollowing: true;
  onUnfollow: (userId: string) => void;
};

type UserListProps = {
  users: UserPersonalData[];
} & (Followers | Following);

const UserList = ({ users, ...props }: UserListProps) => {
  return (
    <>
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent>
            <div className="flex items-center gap-4">
              <UserAvatar user={user} />
              <div className="">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            {props.isFollowing ? (
              <Button
                onClick={() => props.onUnfollow(user.id)}
                variant="outline"
              >
                Unfollow
              </Button>
            ) : (
              <Button onClick={() => props.onFollow(user.id)} variant="default">
                Follow
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
export default UserList;
