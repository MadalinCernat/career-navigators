/**
 * Shared app state persisted to Firebase Firestore and local storage.
 *
 * This keeps the experience looking the same while preserving user progress
 * across app restarts and enabling remote backups.
 */

import { useSyncExternalStore } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Domain, LEVELS } from './data';
import { db } from './firebase';

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
  currentRun?: {
    levelId: number;
    idx: number;
    correctCount: number;
    mistakeCount: number;
  };
};

const STORAGE_USER_ID = 'career-navigators:userId';
const STORAGE_APP_STATE = 'career-navigators:appState';

const DEFAULT_STATE: AppState = {
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

const listeners = new Set<() => void>();
const state: AppState = { ...DEFAULT_STATE };

function emit() {
  listeners.forEach((listener) => listener());
}

function mergeState(loaded: Partial<AppState>): AppState {
  return {
    domain: loaded.domain ?? DEFAULT_STATE.domain,
    xp: loaded.xp ?? DEFAULT_STATE.xp,
    streakDays: loaded.streakDays ?? DEFAULT_STATE.streakDays,
    hearts: loaded.hearts ?? DEFAULT_STATE.hearts,
    progress: {
      ...DEFAULT_STATE.progress,
      ...(loaded.progress ?? {}),
    },
    lastRun: loaded.lastRun ?? DEFAULT_STATE.lastRun,
    currentRun: loaded.currentRun,
  };
}

async function getOrCreateUserId(): Promise<string> {
  try {
    const existingId = await AsyncStorage.getItem(STORAGE_USER_ID);
    if (existingId) {
      return existingId;
    }
  } catch {
    // Ignore storage issues and fall back to generated ID.
  }

  const newId = `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  try {
    await AsyncStorage.setItem(STORAGE_USER_ID, newId);
  } catch {
    // best effort only
  }
  return newId;
}

async function saveLocalState() {
  try {
    await AsyncStorage.setItem(STORAGE_APP_STATE, JSON.stringify(state));
  } catch {
    // silent local fallback failure
  }
}

async function saveRemoteState() {
  try {
    const userId = await getOrCreateUserId();
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, state, { merge: true });
  } catch {
    // Ignore remote persistence failures; local fallback still works.
  }
}

async function persistState() {
  await Promise.all([saveLocalState(), saveRemoteState()]);
}

async function loadSavedState() {
  try {
    const rawLocal = await AsyncStorage.getItem(STORAGE_APP_STATE);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal) as Partial<AppState>;
      Object.assign(state, mergeState(parsed));
      emit();
    }
  } catch {
    // ignore local load issues
  }

  try {
    const userId = await getOrCreateUserId();
    const docRef = doc(db, 'users', userId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const remoteState = snapshot.data() as Partial<AppState>;
      Object.assign(state, mergeState(remoteState));
      emit();
    } else {
      await setDoc(docRef, state, { merge: true });
    }
  } catch {
    // ignore remote load issues; local state is enough for now
  }
}

void loadSavedState();

export const store = {
  getState(): AppState {
    return state;
  },
  setDomain(domain: Domain) {
    state.domain = domain;
    emit();
    void persistState();
  },
  setHearts(value: number) {
    state.hearts = Math.max(0, Math.min(3, value));
    emit();
    void persistState();
  },
  decrementHeart() {
    state.hearts = Math.max(0, state.hearts - 1);
    emit();
    void persistState();
  },
  resetHearts() {
    state.hearts = 3;
    emit();
    void persistState();
  },
  completeLevel(levelId: number, stars: 0 | 1 | 2 | 3, xpEarned: number) {
    state.progress[levelId] = { stars, completed: true, progressPct: 100 };
    state.xp += xpEarned;
    const next = LEVELS.find((l) => l.id === levelId + 1);
    if (next && !state.progress[next.id]?.completed) {
      state.progress[next.id] = { stars: 0, completed: false, progressPct: 0 };
    }
    state.currentRun = undefined;
    emit();
    void persistState();
  },
  setLastRun(run: NonNullable<AppState['lastRun']>) {
    state.lastRun = run;
    emit();
    void persistState();
  },
  setCurrentRun(run: AppState['currentRun'] | undefined) {
    state.currentRun = run;
    emit();
    void persistState();
  },
  setLevelProgress(levelId: number, progressPct: number) {
    const existing = state.progress[levelId];
    state.progress[levelId] = {
      stars: existing?.stars ?? 0,
      completed: existing?.completed ?? false,
      progressPct,
    };
    emit();
    void persistState();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useAppState(): AppState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state,
  );
}
