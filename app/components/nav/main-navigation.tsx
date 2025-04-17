import { Link, LinkProps } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {MainNavigationMenuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to={item.to}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default MainNavigation;
