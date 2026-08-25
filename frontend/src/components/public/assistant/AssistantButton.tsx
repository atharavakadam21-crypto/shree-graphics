"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";

interface AssistantButtonProps { onClick?: () => void; label?: string; }
type Position = { x: number; y: number };

export default function AssistantButton({ onClick, label = "Shree AI" }: AssistantButtonProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const dragStart = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    const initial = { x: Math.max(16, window.innerWidth - 96), y: Math.max(88, window.innerHeight - 96) };
    setPosition(initial);
    setReady(true);
  }, []);

  const clamp = (x: number, y: number): Position => ({
    x: Math.min(Math.max(12, x), Math.max(12, window.innerWidth - 84)),
    y: Math.min(Math.max(76, y), Math.max(76, window.innerHeight - 84)),
  });

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    moved.current = false;
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, x: position.x, y: position.y };
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current) return;
    const dx = event.clientX - dragStart.current.pointerX;
    const dy = event.clientY - dragStart.current.pointerY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true;
    setPosition(clamp(dragStart.current.x + dx, dragStart.current.y + dy));
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragStart.current = null;
    if (!moved.current) onClick?.();
  };

  if (!ready) return null;
  return <button type="button" aria-label={`Open ${label}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} style={{ left: position.x, top: position.y }} className="fixed z-[100] grid h-[72px] w-[72px] touch-none place-items-center rounded-full border border-[#95CCDD]/55 bg-[#0B1220]/95 p-2 shadow-[0_16px_50px_rgba(0,0,0,.45)] backdrop-blur-2xl transition-[box-shadow,border-color] duration-200 hover:border-white hover:shadow-[0_18px_60px_rgba(66,116,217,.38)]">
    <span className="absolute inset-1 rounded-full border border-white/10" />
    <span className="relative block h-full w-full overflow-hidden rounded-full bg-white/5">
      <Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="56px" className="object-contain p-1.5" draggable={false} priority />
    </span>
    <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0B1220] bg-[#95CCDD]" />
  </button>;
}
