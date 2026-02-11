'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getSyncId,
  setSyncId,
  clearSyncId,
  getLocalTasks,
  syncTasksToCloud,
  subscribeToCloudTasks,
  getSyncStatus,
  SyncStatus,
} from '../lib/sync';
import { isFirebaseConfigured } from '../lib/firebase';

interface UseCloudSyncResult {
  // Task state
  completedTasks: Set<string>;
  toggleTask: (taskId: string) => void;
  
  // Sync state
  syncStatus: SyncStatus;
  isConnected: boolean;
  isSyncing: boolean;
  lastSynced: Date | null;
  
  // Sync actions
  setSyncCode: (code: string) => void;
  disconnectSync: () => void;
  
  // Loading state
  isLoading: boolean;
}

export function useCloudSync(): UseCloudSyncResult {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [syncStatus, setSyncStatusState] = useState<SyncStatus>({
    isConfigured: false,
    hasSyncId: false,
    syncId: null,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize sync on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const status = getSyncStatus();
    setSyncStatusState(status);

    if (status.hasSyncId && status.syncId && isFirebaseConfigured()) {
      // Subscribe to cloud updates
      unsubscribeRef.current = subscribeToCloudTasks(
        status.syncId,
        (tasks) => {
          setCompletedTasks(new Set(tasks));
          setIsConnected(true);
          setLastSynced(new Date());
          setIsLoading(false);
        },
        () => {
          // On error, fall back to local
          setCompletedTasks(new Set(getLocalTasks()));
          setIsConnected(false);
          setIsLoading(false);
        }
      );
    } else {
      // No sync ID or Firebase not configured, use local storage
      setCompletedTasks(new Set(getLocalTasks()));
      setIsConnected(false);
      setIsLoading(false);
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // Toggle a task
  const toggleTask = useCallback((taskId: string) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }

      // Sync to cloud (or local)
      const tasksArray = Array.from(next);
      const syncId = getSyncId();
      
      setIsSyncing(true);
      
      if (syncId && isFirebaseConfigured()) {
        syncTasksToCloud(syncId, tasksArray)
          .then(() => {
            setLastSynced(new Date());
          })
          .catch((err) => {
            console.error('Sync failed:', err);
          })
          .finally(() => {
            setIsSyncing(false);
          });
      } else {
        // Local only
        localStorage.setItem('kanban-completed-tasks', JSON.stringify(tasksArray));
        setIsSyncing(false);
      }

      return next;
    });
  }, []);

  // Set sync code and start syncing
  const setSyncCode = useCallback((code: string) => {
    const trimmedCode = code.toLowerCase().trim();
    if (!trimmedCode) return;

    // Unsubscribe from old sync
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    setSyncId(trimmedCode);
    const status = getSyncStatus();
    setSyncStatusState(status);
    setIsLoading(true);

    if (isFirebaseConfigured()) {
      // Get current local tasks to potentially migrate
      const currentTasks = Array.from(completedTasks);
      
      // Subscribe to new sync
      unsubscribeRef.current = subscribeToCloudTasks(
        trimmedCode,
        (tasks) => {
          // If cloud has data, use it; otherwise migrate local
          if (tasks.length > 0 || currentTasks.length === 0) {
            setCompletedTasks(new Set(tasks));
          } else {
            // Migrate local tasks to cloud
            syncTasksToCloud(trimmedCode, currentTasks);
            setCompletedTasks(new Set(currentTasks));
          }
          setIsConnected(true);
          setLastSynced(new Date());
          setIsLoading(false);
        },
        () => {
          setIsConnected(false);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, [completedTasks]);

  // Disconnect from sync
  const disconnectSync = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    clearSyncId();
    setSyncStatusState({
      isConfigured: isFirebaseConfigured(),
      hasSyncId: false,
      syncId: null,
    });
    setIsConnected(false);
  }, []);

  return {
    completedTasks,
    toggleTask,
    syncStatus,
    isConnected,
    isSyncing,
    lastSynced,
    setSyncCode,
    disconnectSync,
    isLoading,
  };
}
