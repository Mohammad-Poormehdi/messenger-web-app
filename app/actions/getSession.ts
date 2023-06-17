import authOptions from "@/libs/auth";
import { getServerSession } from "next-auth";

const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
