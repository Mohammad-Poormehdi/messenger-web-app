import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversations from "./useConversations";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationsId } = useConversations();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationsId,
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
        onClick: async () => await signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationsId]
  );
  return routes;
};

export default useRoutes;
