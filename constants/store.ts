/**
 * Very small in-memory store for sharing state between screens.
 *
 * For this presentation build we keep state simple: a module-level object
 * with subscribe-style updates via React's `useSyncExternalStore`. No
 * AsyncStorage is needed — the app is reset every cold start.
 */

import { useSyncExternalStore } from 'react';
import { Domain, LEVELS } from './data';

export type LevelProgress = {
  stars: 0 | 1 | 2 | 3;
  completed: boolean;
  progressPct: number; // 0..100, for "in progress" levels
};

type AppState = {
  domain: Domain;
  xp: number;
  streakDays: number;
  hearts: number;
  // Maps level id -> progress
  progress: Record<number, LevelProgress>;
  // Last completed run, used by the complete screen
  lastRun?: {
    levelId: number;
    correct: number;
    total: number;
    mistakes: number;
    elapsedSeconds: number;
    xpEarned: number;
    stars: 0 | 1 | 2 | 3;
  };
};

const listeners = new Set<() => void>();

const state: AppState = {
  domain: 'marketing',
  xp: 480,
  streakDays: 7,
  hearts: 3,
  progress: {
    1: { stars: 3, completed: true, progressPct: 100 },
    2: { stars: 3, completed: true, progressPct: 100 },
    3: { stars: 0, completed: false, progressPct: 40 },
    4: { stars: 0, completed: false, progressPct: 0 },
    5: { stars: 0, completed: false, progressPct: 0 },
  },
};

function emit() {
  listeners.forEach((l) => l());
}

export const store = {
  getState(): AppState {
    return state;
  },
  setDomain(domain: Domain) {
    state.domain = domain;
    emit();
  },
  setHearts(value: number) {
    state.hearts = Math.max(0, Math.min(3, value));
    emit();
  },
  decrementHeart() {
    state.hearts = Math.max(0, state.hearts - 1);
    emit();
  },
  resetHearts() {
    state.hearts = 3;
    emit();
  },
  completeLevel(levelId: number, stars: 0 | 1 | 2 | 3, xpEarned: number) {
    state.progress[levelId] = { stars, completed: true, progressPct: 100 };
    state.xp += xpEarned;
    // Unlock next level by marking it as in-progress at 0%
    const next = LEVELS.find((l) => l.id === levelId + 1);
    if (next && !state.progress[next.id]?.completed) {
      state.progress[next.id] = { stars: 0, completed: false, progressPct: 0 };
    }
    emit();
  },
  setLastRun(run: NonNullable<AppState['lastRun']>) {
    state.lastRun = run;
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useAppState(): AppState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}
