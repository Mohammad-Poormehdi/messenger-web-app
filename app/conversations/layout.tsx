import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <SideBar>
      <ConversationList users={users} initialItems={conversations} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
