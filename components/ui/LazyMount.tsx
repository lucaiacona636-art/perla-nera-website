"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

// Monta i figli solo quando entrano nel viewport — usato per il layer 3D
// (Documento 8 §4: mai nel bundle/rendering iniziale della pagina).
export function LazyMount({ children, fallback = null, rootMargin = "200px" }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className="h-full w-full">
      {visible ? children : fallback}
    </div>
  );
}
