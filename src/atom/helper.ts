import { useAtom } from "jotai";
import type { Atom } from "jotai";
import { useCallback, useMemo } from "react";
import type { PrimitiveAtom } from "jotai";
import type { SetStateAction } from "jotai";

export function useAtomState<M extends Record<string, Atom<any>>>(
  atoms: M
): {
  get: { [K in keyof M]: M[K] extends Atom<infer T> ? T : never };
  set: <K extends keyof M>(
    key: K,
    update:
      | (M[K] extends Atom<infer T> ? T : never)
      | ((
          prev: M[K] extends Atom<infer T> ? T : never
        ) => M[K] extends Atom<infer T> ? T : never)
  ) => void;
} {
  const keys = useMemo(() => Object.keys(atoms) as (keyof M)[], [atoms]);

  const pairs = keys.map((k) => useAtom(atoms[k])) as Array<
    [unknown, (u: any) => void]
  >;

  const get = {} as {
    [K in keyof M]: M[K] extends Atom<infer T> ? T : never;
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
        | (M[K] extends Atom<infer T> ? T : never)
        | ((
            prev: M[K] extends Atom<infer T> ? T : never
          ) => M[K] extends Atom<infer T> ? T : never)
    ) => {
      setters[key](update);
    },
    [setters]
  );

  return { get, set };
}

export function useAtomAPI<T>(atom: PrimitiveAtom<T>) {
  const [state, dispatch] = useAtom(atom);

  return {
    get value(): T {
      return state;
    },

    set(updater: SetStateAction<T>) {
      dispatch(updater);
    },
  };
}
