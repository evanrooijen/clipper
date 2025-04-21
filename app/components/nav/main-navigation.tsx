import { Link, LinkProps, useRouterState } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

const MainNavigationMenuItems = [
  {
    title: "Friends",
    to: "/friends",
  },
  {
    title: "Profile",
    to: "/profile",
  },
] as const satisfies ReadonlyArray<LinkProps & { title: string }>;

const MainNavigation = () => {
  const location = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {MainNavigationMenuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
              <Link data-active={location.startsWith(item.to)} to={item.to}>
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default MainNavigation;
