import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <ConversationList initialItems={conversations} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
