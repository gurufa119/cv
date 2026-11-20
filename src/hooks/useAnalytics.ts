import {useCallback, useEffect, useRef, useState} from 'react';
import {PORTFOLIO_PROJECTS} from '../data/cvData';

export interface ActivityEvent {
  id: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AnalyticsState {
  totalVisits: number;
  activeTabs: number;
  sessionSeconds: number;
  projectViews: Record<string, number>;
  filterClicks: Record<string, number>;
  activeSection: string;
  recentEvents: ActivityEvent[];
}

const STORAGE_KEY = 'fa_cv_realtime_analytics_v1';
const CHANNEL_NAME = 'fa_cv_realtime_channel';

function getInitialProjectViews(): Record<string, number> {
  const initial: Record<string, number> = {};
  PORTFOLIO_PROJECTS.forEach((p) => {
    initial[p.id] = 0;
  });
  return initial;
}

function formatNow(): string {
  return new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function readStoredAnalytics(): {
  totalVisits: number;
  projectViews: Record<string, number>;
  filterClicks: Record<string, number>;
  recentEvents: ActivityEvent[];
} {
  const fallback = {
    totalVisits: 0,
    projectViews: getInitialProjectViews(),
    filterClicks: {Semua: 0},
    recentEvents: [] as ActivityEvent[],
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      totalVisits: typeof parsed.totalVisits === 'number' ? parsed.totalVisits : 0,
      projectViews: {...getInitialProjectViews(), ...(parsed.projectViews || {})},
      filterClicks: {Semua: 0, ...(parsed.filterClicks || {})},
      recentEvents: Array.isArray(parsed.recentEvents) ? parsed.recentEvents.slice(0, 8) : [],
    };
  } catch {
    return fallback;
  }
}

export function useAnalytics() {
  const tabIdRef = useRef<string>(`tab-${Math.random().toString(36).slice(2, 9)}`);
  const peersRef = useRef<Map<string, number>>(new Map());
  const channelRef = useRef<BroadcastChannel | null>(null);

  const [state, setState] = useState<AnalyticsState>(() => {
    const stored = readStoredAnalytics();
    return {
      totalVisits: stored.totalVisits,
      activeTabs: 1,
      sessionSeconds: 0,
      projectViews: stored.projectViews,
      filterClicks: stored.filterClicks,
      activeSection: 'beranda',
      recentEvents: stored.recentEvents,
    };
  });

  const persist = useCallback(
    (next: Pick<AnalyticsState, 'totalVisits' | 'projectViews' | 'filterClicks' | 'recentEvents'>) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota or private mode issues
      }
    },
    []
  );

  // Record visit once per session mount & sync across tabs via BroadcastChannel
  useEffect(() => {
    const stored = readStoredAnalytics();
    const visitEvent: ActivityEvent = {
      id: `evt-${Date.now()}-visit`,
      action: 'Kunjungan Halaman',
      target: 'Landing Page CV',
      timestamp: formatNow(),
    };
    const nextTotal = stored.totalVisits + 1;
    const nextEvents = [visitEvent, ...stored.recentEvents].slice(0, 8);

    persist({
      totalVisits: nextTotal,
      projectViews: stored.projectViews,
      filterClicks: stored.filterClicks,
      recentEvents: nextEvents,
    });

    setState((prev) => ({
      ...prev,
      totalVisits: nextTotal,
      projectViews: stored.projectViews,
      filterClicks: stored.filterClicks,
      recentEvents: nextEvents,
    }));

    // Real-time cross-tab synchronization
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;
      peersRef.current.set(tabIdRef.current, Date.now());

      const updateActivePeers = () => {
        const now = Date.now();
        peersRef.current.forEach((ts, key) => {
          if (now - ts > 10000) {
            peersRef.current.delete(key);
          }
        });
        setState((prev) => ({
          ...prev,
          activeTabs: Math.max(1, peersRef.current.size),
        }));
      };

      channel.onmessage = (event) => {
        const msg = event.data;
        if (!msg || typeof msg !== 'object') return;

        if (msg.type === 'HEARTBEAT' && msg.tabId) {
          peersRef.current.set(msg.tabId, Date.now());
          updateActivePeers();
        } else if (msg.type === 'GOODBYE' && msg.tabId) {
          peersRef.current.delete(msg.tabId);
          updateActivePeers();
        } else if (msg.type === 'SYNC_DATA' && msg.payload) {
          setState((prev) => ({
            ...prev,
            totalVisits: msg.payload.totalVisits ?? prev.totalVisits,
            projectViews: msg.payload.projectViews ?? prev.projectViews,
            filterClicks: msg.payload.filterClicks ?? prev.filterClicks,
            recentEvents: msg.payload.recentEvents ?? prev.recentEvents,
          }));
        }
      };

      channel.postMessage({type: 'HEARTBEAT', tabId: tabIdRef.current});
      channel.postMessage({
        type: 'SYNC_DATA',
        payload: {
          totalVisits: nextTotal,
          projectViews: stored.projectViews,
          filterClicks: stored.filterClicks,
          recentEvents: nextEvents,
        },
      });

      const heartbeatTimer = window.setInterval(() => {
        peersRef.current.set(tabIdRef.current, Date.now());
        channel.postMessage({type: 'HEARTBEAT', tabId: tabIdRef.current});
        updateActivePeers();
      }, 3000);

      const handleBeforeUnload = () => {
        channel.postMessage({type: 'GOODBYE', tabId: tabIdRef.current});
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.clearInterval(heartbeatTimer);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        channel.postMessage({type: 'GOODBYE', tabId: tabIdRef.current});
        channel.close();
      };
    }
  }, [persist]);

  // Real-time session duration ticker
  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((prev) => ({
        ...prev,
        sessionSeconds: prev.sessionSeconds + 1,
      }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Track storage changes across windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setState((prev) => ({
            ...prev,
            totalVisits: parsed.totalVisits ?? prev.totalVisits,
            projectViews: {...getInitialProjectViews(), ...(parsed.projectViews || {})},
            filterClicks: {Semua: 0, ...(parsed.filterClicks || {})},
            recentEvents: Array.isArray(parsed.recentEvents) ? parsed.recentEvents : prev.recentEvents,
          }));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const trackProjectClick = useCallback(
    (projectId: string, projectTitle: string) => {
      setState((prev) => {
        const nextViews = {
          ...prev.projectViews,
          [projectId]: (prev.projectViews[projectId] || 0) + 1,
        };
        const nextEvents: ActivityEvent[] = [
          {
            id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
            action: 'Membuka Proyek',
            target: projectTitle,
            timestamp: formatNow(),
          },
          ...prev.recentEvents,
        ].slice(0, 8);

        const payload = {
          totalVisits: prev.totalVisits,
          projectViews: nextViews,
          filterClicks: prev.filterClicks,
          recentEvents: nextEvents,
        };
        persist(payload);
        channelRef.current?.postMessage({type: 'SYNC_DATA', payload});

        return {
          ...prev,
          projectViews: nextViews,
          recentEvents: nextEvents,
        };
      });
    },
    [persist]
  );

  const trackFilterChange = useCallback(
    (category: string) => {
      setState((prev) => {
        const nextFilters = {
          ...prev.filterClicks,
          [category]: (prev.filterClicks[category] || 0) + 1,
        };
        const nextEvents: ActivityEvent[] = [
          {
            id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
            action: 'Filter Kategori',
            target: category,
            timestamp: formatNow(),
          },
          ...prev.recentEvents,
        ].slice(0, 8);

        const payload = {
          totalVisits: prev.totalVisits,
          projectViews: prev.projectViews,
          filterClicks: nextFilters,
          recentEvents: nextEvents,
        };
        persist(payload);
        channelRef.current?.postMessage({type: 'SYNC_DATA', payload});

        return {
          ...prev,
          filterClicks: nextFilters,
          recentEvents: nextEvents,
        };
      });
    },
    [persist]
  );

  const setActiveSection = useCallback((sectionId: string) => {
    setState((prev) => (prev.activeSection === sectionId ? prev : {...prev, activeSection: sectionId}));
  }, []);

  const resetAnalytics = useCallback(() => {
    const initialViews = getInitialProjectViews();
    const resetEvt: ActivityEvent = {
      id: `evt-${Date.now()}-reset`,
      action: 'Reset Analitik',
      target: 'Sesi Baru Dimulai',
      timestamp: formatNow(),
    };
    const payload = {
      totalVisits: 1,
      projectViews: initialViews,
      filterClicks: {Semua: 0},
      recentEvents: [resetEvt],
    };
    persist(payload);
    channelRef.current?.postMessage({type: 'SYNC_DATA', payload});
    setState((prev) => ({
      ...prev,
      ...payload,
      sessionSeconds: 0,
    }));
  }, [persist]);

  return {
    analytics: state,
    trackProjectClick,
    trackFilterChange,
    setActiveSection,
    resetAnalytics,
  };
}
