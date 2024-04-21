import { useRef, useEffect } from "react";

const useRunOnce = (fn: () => void) => {
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      fn();
      hasRun.current = true;
    }
  }, [hasRun, fn]);
};

export default useRunOnce;
