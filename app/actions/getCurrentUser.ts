import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
  } catch (error) {
    return null;
  }
};
export default getCurrentUser;
