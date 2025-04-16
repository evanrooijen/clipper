import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { User } from "better-auth";
import { buttonVariants } from "@/components/ui/button";
import UserMenu from "@/components/user-menu";

const HeaderMenu = ({
  user,
  className,
}: {
  user: User | null;
  className?: string;
}) => {
  return (
    <header className={cn(className, "flex items-center justify-end gap-4")}>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <>
          <Link className={buttonVariants()} to="/login">
            Login
          </Link>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            to="/register"
          >
            Sign Up
          </Link>
        </>
      )}
    </header>
  );
};
export default HeaderMenu;
