import { useMemo } from "react";

import { useMatches } from "@remix-run/react";

export function useMatchBaselineRoute() {
  const matches = useMatches();

  return useMemo(
    () => matches.some((match) => match.handle?.baseline),
    [matches]
  );
}
