import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
};
export default UserLayout;
