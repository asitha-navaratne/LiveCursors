import { useCallback, useState } from "react";
import { PerfectCursor } from "perfect-cursors";

const usePerfectCursor = (cb) => {
  const [pc] = useState(() => new PerfectCursor(cb));

  const onPointChange = useCallback((point) => pc.addPoint(point), [pc]);

  return onPointChange;
};

export default usePerfectCursor;
