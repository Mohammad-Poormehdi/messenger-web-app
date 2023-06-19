import getSession from "./getSession";
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
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};
export default getCurrentUser;
