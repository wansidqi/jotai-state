import { atom } from "jotai";
import { useAtomState } from "../helper";

export const counter = atom(0);
export const name = atom("Vite + React");

export function useExampleState() {
  const { get, set } = useAtomState({
    counter,
    name,
  });

  return {
    exampleState: get,
    setExample: set,
  };
}
