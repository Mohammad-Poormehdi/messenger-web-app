import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConverstaion from "./useConverstaion";

const useRoutes = () => {
  const pathname = usePathname();
  const { converstaionId } = useConverstaion();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/converstaions",
        icon: HiChat,
        active: pathname === "/converstaion" || !!converstaionId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, converstaionId]
  );
  return routes;
};

export default useRoutes;
