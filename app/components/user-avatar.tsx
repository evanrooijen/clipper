import { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar>
      {user.image ? (
        <>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>
            {user.name?.charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </>
      ) : (
        <AvatarFallback>
          {user.name?.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default UserAvatar;
