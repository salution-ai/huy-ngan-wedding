"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type GuestAliasSyncValue = {
  confirmDisplayName: string;
  setConfirmDisplayName: (value: string) => void;
};

const GuestAliasSyncContext = createContext<GuestAliasSyncValue | null>(null);

export function GuestAliasSyncProvider({ children }: { children: ReactNode }) {
  const [confirmDisplayName, setConfirmDisplayName] = useState("");
  const value = useMemo(
    () => ({ confirmDisplayName, setConfirmDisplayName }),
    [confirmDisplayName],
  );
  return (
    <GuestAliasSyncContext.Provider value={value}>
      {children}
    </GuestAliasSyncContext.Provider>
  );
}

export function useGuestAliasSync() {
  const ctx = useContext(GuestAliasSyncContext);
  if (!ctx) {
    throw new Error("useGuestAliasSync must be used within GuestAliasSyncProvider");
  }
  return ctx;
}

/** Dùng khi component có thể nằm ngoài provider (an toàn). */
export function useOptionalGuestAliasSync(): GuestAliasSyncValue | null {
  return useContext(GuestAliasSyncContext);
}
