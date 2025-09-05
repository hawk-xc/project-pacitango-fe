
'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dummyComplaints } from '@/lib/data'; // We'll use this for initial seed

// --- TYPE DEFINITIONS ---
export type Status = 'Pending' | 'Diproses' | 'Diselesaikan';
export type TimelineItem = { id: string; label: string; date: string; note?: string; status: Status };
export type Comment = { id: string; author: string; avatarUrl: string; timestamp: string; comment: string };

// Expanded Complaint type based on UI requirements
export type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: Status;
  location: string;
  imageUrl?: string;
  createdAt: string;
  history: TimelineItem[];
  comments: Comment[];
};

const LS_KEY = 'aduan-pariwisata-v1';

// --- CONTEXT TYPE ---
type AduanContextType = {
  isLoading: boolean;
  complaints: Complaint[];
  getComplaintById: (id: string) => Complaint | undefined;
  createComplaint: (c: Omit<Complaint, 'id' | 'createdAt' | 'history' | 'comments' | 'status'>) => string;
  updateComplaint: (id: string, patch: Partial<Omit<Complaint, 'id'>>) => void;
  deleteComplaint: (id: string) => void;
  addComment: (complaintId: string, comment: Omit<Comment, 'id'>) => void;
};

const AduanContext = createContext<AduanContextType | null>(null);

// --- HELPER ---
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// --- PROVIDER COMPONENT ---
export function AduanProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        setComplaints(JSON.parse(raw));
      } else {
        // If no data, seed with dummy data, expanding it to fit the new type
        const seededData = dummyComplaints.map(c => ({
            ...c,
            createdAt: new Date().toISOString(),
            history: [{ id: uid(), label: 'Aduan Dikirim', date: new Date().toLocaleDateString(), status: c.status }],
            comments: [],
        }));
        setComplaints(seededData);
      }
    } catch (e) {
      console.error("Failed to load complaints:", e);
      localStorage.removeItem(LS_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LS_KEY, JSON.stringify(complaints));
    }
  }, [complaints, isLoading]);

  const api = useMemo<AduanContextType>(() => {
    const getComplaintById = (id: string) => complaints.find(c => c.id === id);

    const createComplaint = (c: Omit<Complaint, 'id' | 'createdAt' | 'history' | 'comments' | 'status'>) => {
        const id = uid();
        const newComplaint: Complaint = {
            ...c,
            id,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            history: [{ id: uid(), label: 'Aduan Dikirim', date: new Date().toLocaleDateString(), status: 'Pending' }],
            comments: [],
        };
        setComplaints(prev => [newComplaint, ...prev]);
        return id;
    };

    const updateComplaint = (id: string, patch: Partial<Omit<Complaint, 'id'>>) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
    };

    const deleteComplaint = (id: string) => {
        setComplaints(prev => prev.filter(c => c.id !== id));
    };

    const addComment = (complaintId: string, comment: Omit<Comment, 'id'>) => {
        const newComment = { ...comment, id: uid() };
        setComplaints(prev => prev.map(c => 
            c.id === complaintId ? { ...c, comments: [...c.comments, newComment] } : c
        ));
    };

    return {
        isLoading,
        complaints,
        getComplaintById,
        createComplaint,
        updateComplaint,
        deleteComplaint,
        addComment,
    };
  }, [complaints, isLoading]);

  return <AduanContext.Provider value={api}>{children}</AduanContext.Provider>;
}

// --- CUSTOM HOOK ---
export function useAduan() {
  const context = useContext(AduanContext);
  if (!context) {
    throw new Error('useAduan must be used within a AduanProvider');
  }
  return context;
}
