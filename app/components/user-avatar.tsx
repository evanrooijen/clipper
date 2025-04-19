import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPersonalData } from "@/features/follows/functions";

function UserAvatar({ user }: { user: UserPersonalData }) {
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
