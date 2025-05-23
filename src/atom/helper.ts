import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { useCallback, useMemo } from "react";

export function useAtomState<M extends Record<string, PrimitiveAtom<any>>>(
  atoms: M
): {
  get: { [K in keyof M]: M[K] extends PrimitiveAtom<infer T> ? T : never };
  set: <K extends keyof M>(
    key: K,
    update:
      | (M[K] extends PrimitiveAtom<infer T> ? T : never)
      | ((
          prev: M[K] extends PrimitiveAtom<infer T> ? T : never
        ) => M[K] extends PrimitiveAtom<infer T> ? T : never)
  ) => void;
} {
  const keys = useMemo(() => Object.keys(atoms) as (keyof M)[], [atoms]);

  const pairs = keys.map((k) => useAtom(atoms[k])) as Array<
    [unknown, (u: any) => void]
  >;

  const get = {} as {
    [K in keyof M]: M[K] extends PrimitiveAtom<infer T> ? T : never;
  };
  const setters = {} as Record<keyof M, (u: any) => void>;

  keys.forEach((k, i) => {
    const [val, setFn] = pairs[i];
    get[k] = val as any;
    setters[k] = setFn;
  });

  const set = useCallback(
    <K extends keyof M>(
      key: K,
      update:
        | (M[K] extends PrimitiveAtom<infer T> ? T : never)
        | ((
            prev: M[K] extends PrimitiveAtom<infer T> ? T : never
          ) => M[K] extends PrimitiveAtom<infer T> ? T : never)
    ) => {
      setters[key](update);
    },
    [setters]
  );

  return { get, set };
}
