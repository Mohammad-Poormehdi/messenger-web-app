import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversations = () => {
  const params = useParams();
  const conversationsId = useMemo(() => {
    if (!params.conversationId) {
      return "";
    }
    return params.conversationId as string;
  }, [params.conversationId]);

  const isOpen = useMemo(() => !!conversationsId, [conversationsId]);

  return useMemo(
    () => ({
      isOpen,
      conversationsId,
    }),
    [isOpen, conversationsId]
  );
};

export default useConversations;
