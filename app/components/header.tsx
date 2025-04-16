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
    <div className={cn(className, "flex items-center justify-between gap-4")}>
      <Link to="/">
        <img
          className="size-12 dark:invert"
          src="/assets/ship.svg"
          alt="Clipper Logo"
        />
      </Link>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <div className="flex items-center gap-4">
          <Link className={buttonVariants()} to="/login">
            Login
          </Link>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            to="/register"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};
export default HeaderMenu;
