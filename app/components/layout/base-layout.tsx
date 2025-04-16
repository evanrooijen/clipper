import { User } from "better-auth";
import HeaderMenu from "@/components/header";

const BaseLayout = ({
  children,
  user,
}: {
  children?: React.ReactNode;
  user: User | null;
}) => {
  return (
    <div className="@container/main min-h-svh">
      <header className="bg-muted/40 sticky top-0 p-4">
        <HeaderMenu className="container" user={user} />
      </header>
      <main>{children}</main>
    </div>
  );
};
export default BaseLayout;
