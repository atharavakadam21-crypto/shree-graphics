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

  useEffect(() => { setPosition({ x: Math.max(16, window.innerWidth - 112), y: Math.max(88, window.innerHeight - 112) }); setReady(true); }, []);
  const clamp = (x: number, y: number): Position => ({ x: Math.min(Math.max(12, x), Math.max(12, window.innerWidth - 96)), y: Math.min(Math.max(76, y), Math.max(76, window.innerHeight - 96)) });
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => { event.currentTarget.setPointerCapture(event.pointerId); moved.current = false; dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, x: position.x, y: position.y }; };
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => { if (!dragStart.current) return; const dx = event.clientX - dragStart.current.pointerX; const dy = event.clientY - dragStart.current.pointerY; if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true; setPosition(clamp(dragStart.current.x + dx, dragStart.current.y + dy)); };
  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); dragStart.current = null; if (!moved.current) onClick?.(); };
  if (!ready) return null;
  return <button type="button" aria-label={`Open ${label}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} style={{ left: position.x, top: position.y }} className="fixed z-[100] grid h-[84px] w-[84px] touch-none place-items-center rounded-full border-2 border-[#95CCDD]/65 bg-[#0B1220]/95 p-1.5 shadow-[0_16px_55px_rgba(0,0,0,.5),0_0_34px_rgba(66,116,217,.25)] backdrop-blur-2xl transition-[box-shadow,border-color,transform] duration-200 hover:scale-105 hover:border-white">
    <span className="absolute inset-1 rounded-full border border-white/15" />
    <span className="relative block h-full w-full overflow-hidden rounded-full bg-white/[.04]">
      <Image src="/logo/sg-logo.png" alt="Shree Graphics" fill sizes="68px" className="object-contain p-0.5" draggable={false} priority />
    </span>
    <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-[#0B1220] bg-[#95CCDD]" />
  </button>;
}
