"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FAVORITES_KEY = "horizon-favorites";
const COMPARE_KEY = "horizon-compare";
const MAX_COMPARE = 4;

interface FavoritesContextValue {
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readStorage(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readStorage(FAVORITES_KEY));
    setCompare(readStorage(COMPARE_KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compare));
  }, [compare, ready]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      compare,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
      toggleCompare,
      isInCompare: (id: string) => compare.includes(id),
      clearCompare: () => setCompare([]),
    }),
    [favorites, compare, toggleFavorite, toggleCompare]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
