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
    <div className="@container/global flex min-h-screen flex-col">
      <header className="bg-off-black sticky top-0 p-4">
        <HeaderMenu className="container" user={user} />
      </header>
      <main className="@container/main container flex-1">{children}</main>
      <footer className="bg-off-black @container/footer">
        <div className="container p-4 text-center">
          <p>© 2025 Clipper All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default BaseLayout;
