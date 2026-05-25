import { useState } from 'react';
import { storageGet, storageSet } from '../lib/storage';
import { STORAGE_KEYS } from '../constants';

export function useGoal(): [number, (g: number) => void] {
  const [goal, setGoalState] = useState<number>(() =>
    storageGet<number>(STORAGE_KEYS.GOAL, 0)
  );

  function setGoal(g: number) {
    storageSet(STORAGE_KEYS.GOAL, g);
    setGoalState(g);
  }

  return [goal, setGoal];
}
