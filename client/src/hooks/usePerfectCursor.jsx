import { useCallback, useLayoutEffect, useState } from "react";
import { PerfectCursor } from "perfect-cursors";

const usePerfectCursor = (cb, point) => {
  const [pc] = useState(() => new PerfectCursor(cb));

  useLayoutEffect(() => {
    if (point) pc.addPoint(point);

    return () => pc.dispose();
  }, [pc, point]);

  const onPointChange = useCallback((point) => pc.addPoint(point), [pc]);

  return onPointChange;
};

export default usePerfectCursor;
