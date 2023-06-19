import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </SideBar>
  );
};
export default UserLayout;
