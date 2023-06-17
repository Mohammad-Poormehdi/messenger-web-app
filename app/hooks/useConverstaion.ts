import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConverstaion = () => {
  const params = useParams();
  const converstaionId = useMemo(() => {
    if (!params.converstaionId) {
      return "";
    }
    return params.converstaionId as string;
  }, [params.converstaionId]);

  const isOpen = useMemo(() => !!converstaionId, [converstaionId]);

  return useMemo(
    () => ({
      isOpen,
      converstaionId,
    }),
    [isOpen, converstaionId]
  );
};

export default useConverstaion;
