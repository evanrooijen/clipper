import { User } from "better-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { Link, useRouter } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

const UserMenu = ({ user }: { user: User }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({
            to: "/",
            reloadDocument: true,
          });
        },
      },
    });
    await router.invalidate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
