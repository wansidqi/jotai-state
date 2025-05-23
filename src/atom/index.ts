import { useExampleState } from "./state/example";

export const useAtomStore = () => {
  return {
    ...useExampleState(),
  };
};
