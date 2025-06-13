import { atom } from "jotai";
import { useAtomState } from "..";

const counterAtom = atom(0);
const nameAtom = atom("Vite + React");

export function useExampleState() {
  const name = useAtomState(nameAtom);
  const counter = useAtomState(counterAtom);

  return {
    counter,
    name,
  };
}
