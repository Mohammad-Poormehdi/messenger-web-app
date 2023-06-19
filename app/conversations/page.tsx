"use client";

import useConverstaion from "../hooks/useConversations";
import EmptyState from "../components/EmptyState";
import clsx from "clsx";

const Home = () => {
  const { isOpen } = useConverstaion();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};
export default Home;