"use client";

import React, { Component, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ScrollStoryCanvas } from "@/components/3d/ScrollStoryCanvas";
import { STORY_STAGES } from "@/data/story";

type CanvasComponent = typeof ScrollStoryCanvas;
type Props = Pick<React.ComponentProps<CanvasComponent>, "containerRef" | "wireframe" | "accentColor" | "onStageChange">;

// A tiny preview of the actual product, included in the initial HTML.
const previewPlaceholder = "data:image/webp;base64,UklGRvIAAABXRUJQVlA4IOYAAABQBwCdASowADAAPu1wsVOppiSkI4oBMB2JaQAD52y1KIcDKKCnTXNIwNh3fOhTRSZTFagz1WTiLu/3pHuW9vIYIuYAAMpx/m5cLuWv3QxctMRmAsWDXtJPs8bJ2/Wa3U5NP0CbFTspjEm/tThhANCImTifHoQkTQ4GYECbv3ifgqRguW4PDMfVohoNJwxqEwEtbKkAcn2Qh3DvUyPntawPdlmvBnSYrwiTTs1C2POWSPQ/HwfIp+ZdzqgQaSHBC1W7A1Nkb4GwZPTT3nhpCjdfEQJ8Oei/c2pJiePj8Igl7nZojK4AAA==";

class StoryBoundary extends Component<{ children: React.ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function StoryViewport(props: Props) {
  const { containerRef, onStageChange } = props;
  const [CanvasScene, setCanvasScene] = useState<CanvasComponent | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(true);
  const readyRef = useRef(false);
  const handleReady = useCallback(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      setReady(true);
    }
  }, []);
  const handleFailure = useCallback(() => {
    readyRef.current = false;
    setReady(false);
    setFailed(true);
  }, []);

  // Keep the chapter HUD working even before 3D loads or in static mode.
  useEffect(() => {
    let frame = 0;
    const updateStage = () => {
      frame = 0;
      const section = containerRef.current;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - window.innerHeight)));
      onStageChange?.(Math.min(STORY_STAGES.length - 1, Math.floor(progress * (STORY_STAGES.length - 1) + 0.35)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateStage); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [containerRef, onStageChange]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = window.matchMedia("(max-width: 767px)");
    let cancelled = false;
    let near = false;
    let visible = false;
    let loading = false;
    // Proximity alone starts 3D immediately on many phones. Require scrolling
    // or a direct story link; scroll restoration also works before hydration.
    let approaching = window.scrollY > 0 || window.location.hash === "#story";
    const update = () => {
      setMobile(size.matches);
      setReduced(motion.matches);
      if (motion.matches) {
        readyRef.current = false;
        setReady(false);
      }
      setActive(visible && !document.hidden && !motion.matches);
      if (!approaching || !near || motion.matches || document.hidden || loading) return;
      loading = true;
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2");
        if (!context) throw new Error("WebGL2 unavailable");
        context.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        handleFailure();
        return;
      }
      import("@/components/3d/ScrollStoryCanvas").then((module) => {
        if (cancelled) return;
        if (attempt > 0) module.clearStoryModelCache();
        setCanvasScene(() => module.ScrollStoryCanvas);
      }).catch(() => { if (!cancelled) handleFailure(); });
    };
    const onScroll = () => {
      if (!approaching && window.scrollY > 0) {
        approaching = true;
        update();
      }
    };
    const onHashChange = () => {
      if (window.location.hash === "#story") {
        approaching = true;
        update();
      }
    };
    const preloadObserver = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      update();
    }, { rootMargin: "600px 0px" });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    preloadObserver.observe(section);
    visibilityObserver.observe(section);
    motion.addEventListener("change", update);
    size.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener("change", update);
      size.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [containerRef, attempt, handleFailure]);

  return (
    <div className="relative w-full h-full">
      <div className={`absolute inset-0 transition-opacity duration-300 ${ready && !failed && !reduced ? "opacity-0" : "opacity-100"}`}>
        <div aria-hidden="true" className="absolute inset-8 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${previewPlaceholder}")` }} />
        <Image src="/images/slipper-fallback.jpg" alt="FASON Orbit Relief product preview" fill
          loading="eager" sizes="(max-width: 768px) 100vw, 60vw" className="object-contain p-8" />
      </div>
      {CanvasScene && !failed && !reduced && (
        <div className={`absolute inset-0 ${ready ? "opacity-100" : "opacity-0"}`}>
          <StoryBoundary key={attempt} onFailure={handleFailure}>
            <CanvasScene {...props} onStageChange={undefined} isMobile={mobile} active={active} onReady={handleReady} onFailure={handleFailure} />
          </StoryBoundary>
        </div>
      )}
      {failed && !reduced && (
        <button className="absolute top-40 left-1/2 -translate-x-1/2 z-30 rounded-full bg-white px-4 py-2 text-sm shadow pointer-events-auto"
          onClick={() => {
            setCanvasScene(null);
            setFailed(false);
            setAttempt((value) => value + 1);
          }}>Retry 3D story</button>
      )}
    </div>
  );
}
