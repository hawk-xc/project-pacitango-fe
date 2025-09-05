'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedComplaints } from './data';

export type Status = 'pending' | 'process' | 'success';

export type TimelineItem = { id: string; title: string; at: string; by?: string };
export type Comment = { id: string; name: string; message: string; at: string };

export type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  photos: string[];
  location: { lat: number; lng: number; address?: string };
  status: Status;
  createdAt: string;
  history: TimelineItem[];
  comments: Comment[];
};

const LS_KEY = 'goservice-complaints-v1';

type Ctx = {
  isLoading: boolean;
  complaints: Complaint[];
  createComplaint: (c: Omit<Complaint, 'id' | 'createdAt' | 'history' | 'comments' | 'status'>) => string;
  updateComplaint: (id: string, patch: Partial<Complaint>) => void;
  deleteComplaint: (id: string) => void;
  addComment: (id: string, data: Omit<Comment, 'id' | 'at'> & { at?: string }) => void;
  addHistory: (id: string, item: Omit<TimelineItem, 'id' | 'at'> & { at?: string }) => void;
  getById: (id: string) => Complaint | undefined;
};

const GoServiceContext = createContext<Ctx | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function GoServiceProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        setComplaints(JSON.parse(raw));
      } else {
        setComplaints(seedComplaints);
      }
    } catch (e) {
      console.error("Failed to load or parse complaints from localStorage:", e);
      localStorage.removeItem(LS_KEY);
      setComplaints(seedComplaints); // Fallback to seed data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LS_KEY, JSON.stringify(complaints));
    }
  }, [complaints, isLoading]);

  const api = useMemo<Ctx>(
    () => ({
      isLoading,
      complaints,
      createComplaint: (c) => {
        const id = uid();
        const rec: Complaint = {
          ...c,
          id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          history: [{ id: uid(), title: 'Aduan Dikirim', at: new Date().toISOString(), by: 'Anda' }],
          comments: [],
        };
        setComplaints((prev) => [rec, ...prev]);
        return id;
      },
      updateComplaint: (id, patch) => {
        setComplaints((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
      },
      deleteComplaint: (id) => {
        setComplaints((prev) => prev.filter((x) => x.id !== id));
      },
      addComment: (id, data) => {
        setComplaints((prev) =>
          prev.map((x) =>
            x.id === id
              ? {
                  ...x,
                  comments: [...x.comments, { id: uid(), at: data.at ?? new Date().toISOString(), name: data.name, message: data.message }],
                }
              : x
          )
        );
      },
      addHistory: (id, item) => {
        setComplaints((prev) =>
          prev.map((x) =>
            x.id === id
              ? {
                  ...x,
                  history: [...x.history, { id: uid(), at: item.at ?? new Date().toISOString(), title: item.title, by: item.by }],
                }
              : x
          )
        );
      },
      getById: (id) => complaints.find((x) => x.id === id),
    }),
    [isLoading, complaints]
  );

  return <GoServiceContext.Provider value={api}>{children}</GoServiceContext.Provider>;
}

export function useGoService() {
  const ctx = useContext(GoServiceContext);
  if (!ctx) throw new Error('useGoService must be used inside GoServiceProvider');
  return ctx;
}
