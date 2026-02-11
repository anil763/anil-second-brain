// Cloud sync utilities for Kanban tasks
import { ref, set, onValue, off, DataSnapshot } from 'firebase/database';
import { getFirebaseDatabase, isFirebaseConfigured } from './firebase';

const SYNC_ID_KEY = 'kanban-sync-id';
const LOCAL_TASKS_KEY = 'kanban-completed-tasks';

// Get or create sync ID (stored locally, used to identify user across sessions)
export function getSyncId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SYNC_ID_KEY);
}

export function setSyncId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SYNC_ID_KEY, id.toLowerCase().trim());
}

export function clearSyncId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SYNC_ID_KEY);
}

// Generate a random sync ID if needed
export function generateSyncId(): string {
  return 'user_' + Math.random().toString(36).substring(2, 10);
}

// Local storage fallback
export function getLocalTasks(): string[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(LOCAL_TASKS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function setLocalTasks(tasks: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks));
}

// Firebase sync functions
export function syncTasksToCloud(syncId: string, completedTaskIds: string[]): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured, using local storage only');
    setLocalTasks(completedTaskIds);
    return Promise.resolve();
  }

  const db = getFirebaseDatabase();
  const tasksRef = ref(db, `users/${syncId}/completedTasks`);
  
  return set(tasksRef, {
    tasks: completedTaskIds,
    lastUpdated: Date.now(),
  }).then(() => {
    // Also save locally as backup
    setLocalTasks(completedTaskIds);
  }).catch((error) => {
    console.error('Failed to sync to cloud:', error);
    // Save locally as fallback
    setLocalTasks(completedTaskIds);
    throw error;
  });
}

export function subscribeToCloudTasks(
  syncId: string,
  onUpdate: (tasks: string[]) => void,
  onError?: (error: Error) => void
): () => void {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured, using local storage');
    // Return initial local data
    onUpdate(getLocalTasks());
    // Return no-op unsubscribe
    return () => {};
  }

  const db = getFirebaseDatabase();
  const tasksRef = ref(db, `users/${syncId}/completedTasks`);

  const handleValue = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    if (data && Array.isArray(data.tasks)) {
      onUpdate(data.tasks);
      // Keep local in sync
      setLocalTasks(data.tasks);
    } else if (data === null) {
      // No data yet, check local storage for migration
      const localTasks = getLocalTasks();
      if (localTasks.length > 0) {
        // Migrate local data to cloud
        syncTasksToCloud(syncId, localTasks);
      }
      onUpdate(localTasks);
    }
  };

  const handleError = (error: Error) => {
    console.error('Firebase subscription error:', error);
    // Fall back to local
    onUpdate(getLocalTasks());
    if (onError) onError(error);
  };

  onValue(tasksRef, handleValue, handleError);

  // Return unsubscribe function
  return () => {
    off(tasksRef, 'value', handleValue);
  };
}

// Check sync status
export interface SyncStatus {
  isConfigured: boolean;
  hasSyncId: boolean;
  syncId: string | null;
}

export function getSyncStatus(): SyncStatus {
  const syncId = getSyncId();
  return {
    isConfigured: isFirebaseConfigured(),
    hasSyncId: !!syncId,
    syncId,
  };
}
