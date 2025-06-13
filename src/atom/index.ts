import { useAtom, type PrimitiveAtom } from "jotai";
import { useExampleState } from "./state/example";

export function useAtomState<Value>(atom: PrimitiveAtom<Value>) {
  const [value, set] = useAtom(atom);
  return { value, set };
}

export const useAtomStore = () => {
  return {
    ...useExampleState(),
  };
};
