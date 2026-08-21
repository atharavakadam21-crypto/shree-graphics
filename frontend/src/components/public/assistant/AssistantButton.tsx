"use client";

import React, { useState, useRef, useEffect } from "react";

interface AssistantButtonProps {
  onClick?: () => void;
  label?: string;
  logoSrc?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  specData?: Array<{ label: string; value: string }>;
}

export default function AssistantButton({
  onClick,
  label = "Shree AI",
  logoSrc,
}: AssistantButtonProps) {
  // Panel open state
  const [isOpen, setIsOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(logoSrc || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const rafId = useRef<number | null>(null);

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Greetings. I am Shree AI, your technical machinery specialist. How can I assist with your flexographic printing, micro-slitting, or rotary converting requirements today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Position at bottom-right viewport by default
      setPosition({
        x: Math.max(20, window.innerWidth - 110),
        y: Math.max(20, window.innerHeight - 110),
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    hasDragged.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };

    if (position) {
      elementPos.current = { ...position };
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      elementPos.current = { x: rect.left, y: rect.top };
    }

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasDragged.current = true;
    }

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        const newX = Math.max(10, Math.min(window.innerWidth - 100, elementPos.current.x + deltaX));
        const newY = Math.max(10, Math.min(window.innerHeight - 100, elementPos.current.y + deltaY));
        setPosition({ x: newX, y: newY });
      }
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Pointer capture may already be released.
    }

    // If the user didn't drag, treat the interaction as a click.
    if (!hasDragged.current) {
      setIsOpen((prev) => !prev);

      if (onClick) {
        onClick();
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the click from bubbling to surrounding elements.
    e.stopPropagation();

    // Opening/closing is handled by pointerup.
    // Do NOT toggle here or it can toggle twice.
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");

    // Simulate AI response with technical context
    setTimeout(() => {
      let replyText = "Our engineering team can customize this specification to your substrate requirements.";
      let specData: Array<{ label: string; value: string }> | undefined;

      const lower = text.toLowerCase();
      if (lower.includes("flexo") || lower.includes("print")) {
        replyText = "The Synchro-Flex 8-Color Servo Press operates at speeds up to 300 m/min with an optical registration tolerance of ±0.05mm.";
        specData = [
          { label: "Max Speed", value: "300 m/min" },
          { label: "Register", value: "±0.05 mm" },
          { label: "Drive System", value: "Direct Servo" },
        ];
      } else if (lower.includes("slit") || lower.includes("micro")) {
        replyText = "The Micro-Slitter Rewinder 500 features shear slitting down to 10mm width for clean edge profiles without fiber dust.";
        specData = [
          { label: "Min Slit Width", value: "10 mm" },
          { label: "Slit Accuracy", value: "±0.08 mm" },
          { label: "Web Width", value: "500 mm" },
        ];
      } else if (lower.includes("rotary") || lower.includes("die")) {
        replyText = "Our Full Rotary Die-Cutting unit incorporates hydraulic gauge monitoring and matrix snow-ball rewinding for labels & foil.";
        specData = [
          { label: "Cylinder", value: "Solid Magnetic" },
          { label: "Max Speed", value: "200 m/min" },
        ];
      } else if (lower.includes("price") || lower.includes("quote") || lower.includes("cost")) {
        replyText = "Official quotations depend on web width (330mm/450mm/650mm) and drying configurations (UV/Hot Air). You can request a full proposal below.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        specData,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const currentLogo = customLogo || logoSrc;

  return (
    <>
      {/* Hidden File Input for Direct Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {}
      {/* FLOATING BUTTON CONTAINER */}
      <div
        style={
          position
            ? { left: `${position.x}px`, top: `${position.y}px` }
            : { bottom: "2rem", right: "2rem" }
        }
        className={`fixed z-[100] touch-none select-none will-change-transform ${
          isDragging ? "transition-none" : "transition-all duration-300 ease-out"
        } ${position ? "" : "bottom-6 right-6"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="group relative flex items-center justify-center">
          {/* Outer Pulsing Laser Halo */}
          <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-100 animate-pulse" />

          {/* MAIN CIRCULAR BUTTON */}
          <button
            type="button"
            onClick={handleButtonClick}
            aria-label="Toggle Shree Graphics AI Assistant"
            className={`relative flex h-20 w-20 sm:h-24 sm:w-24 cursor-grab items-center justify-center rounded-full border-2 border-cyan-400 bg-[#080909] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.95)] transform-gpu transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:cursor-grabbing hover:scale-110 ${
              isDragging ? "cursor-grabbing scale-105 transition-none" : ""
            } ${isOpen ? "ring-4 ring-cyan-400/40" : ""}`}
          >
            {/* INNER LOGO DISPLAY WITH HIGH-DEFINITION EMBLEM */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#1b1c6e] border border-cyan-400/50 shadow-inner">
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt="Shree Graphics HD Logo"
                  className="h-full w-full rounded-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              ) : (
                /* EXACT HD VECTOR SVG OF SHREE GRAPHICS LOGO */
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full p-0.5 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out group-hover:scale-110"
                >
                  {/* Outer Black Frame */}
                  <circle cx="100" cy="100" r="96" fill="#12131a" />
                  {/* Inner Blue Disc */}
                  <circle cx="100" cy="100" r="88" fill="#242488" />
                  {/* Black Ring Border */}
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#12131a" strokeWidth="6" />

                  {/* Devanagari 'श्री' Main White Loop */}
                  <circle cx="82" cy="94" r="23" fill="none" stroke="#FFFFFF" strokeWidth="11" />

                  {/* Dual Sweeping Orange Brush Strokes */}
                  <path
                    d="M 36,132 C 60,132 82,126 108,106 C 88,118 64,124 36,124 Z"
                    fill="#FF7A00"
                  />
                  <path
                    d="M 38,154 C 65,154 94,142 122,108 C 98,132 70,144 38,144 Z"
                    fill="#FF7A00"
                  />

                  {/* Top Orange Badge Circle */}
                  <circle cx="130" cy="62" r="23" fill="none" stroke="#FF7A00" strokeWidth="11" />

                  {/* Two Vertical White Pillars with Chamfered Bottoms */}
                  <polygon points="120,85 132,85 132,158 120,138" fill="#FFFFFF" />
                  <polygon points="138,85 150,85 150,158 138,138" fill="#FFFFFF" />
                </svg>
              )}

              {/* Status Ping Indicator */}
              <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#080909] bg-cyan-400" />
              </span>
            </div>
          </button>

          {/* Quick Image Swap Badge Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Upload custom logo image"
            className="absolute -top-1 -right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/80 bg-zinc-900 text-cyan-400 shadow-md hover:bg-cyan-400 hover:text-zinc-950 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Tooltip Hover Badge */}
          {/* Tooltip Hover Badge */}
{/* =========================================================
    AI LABEL
    Desktop: hover tooltip
    Mobile: always-visible SG AI badge
========================================================= */}

{/* MOBILE — always visible */}
<span
  className="
    absolute
    -bottom-2
    left-1/2
    -translate-x-1/2
    whitespace-nowrap
    border
    border-cyan-400/60
    bg-[#080909]/95
    px-2.5
    py-1
    shadow-lg
    sm:hidden
  "
>
  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white">
    SG
  </span>

  <span className="ml-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-400">
    AI
  </span>
</span>

{/* DESKTOP — hover tooltip */}
<span
  className="
    pointer-events-none
    absolute
    right-full
    mr-4
    hidden
    whitespace-nowrap
    border
    border-cyan-500/40
    bg-[#080909]/95
    px-3.5
    py-2
    shadow-2xl
    backdrop-blur-md
    opacity-0
    translate-x-3
    transition-all
    duration-300
    ease-out
    group-hover:opacity-100
    group-hover:translate-x-0
    sm:block
  "
>
  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
    Shree Graphics
  </span>

  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
    {isOpen ? "Close Assistant" : label}

    <span className="text-cyan-400 transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  </span>
</span>
        </div>
      </div>

      {}
      {/* AI ASSISTANT POPUP PANEL WITH SMOOTH HARDWARE-ACCELERATED ENTRANCE */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center sm:justify-end p-2 sm:p-6 bg-black/70 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#080a0c] border border-zinc-800 rounded-sm shadow-[0_0_60px_rgba(6,182,212,0.25)] border-l-4 border-l-cyan-400 flex flex-col h-[85vh] max-h-[680px] overflow-hidden transform-gpu transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in slide-in-from-bottom-6 zoom-in-95">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#242488] border border-cyan-400/60 flex items-center justify-center text-white font-bold text-xs">
                  SG
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-sm text-zinc-100 uppercase tracking-wider">
                      SHREE AI ASSISTANT
                    </span>
                    <span className="font-mono text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5">
                      v4.2 ONLINE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    Precision Machinery Technical Specialist
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900 font-mono text-xs"
                aria-label="Close assistant"
              >
                ✕
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="p-3 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[10px] whitespace-nowrap">
              <span className="text-zinc-500 uppercase tracking-widest text-[9px]">QUICK PROMPTS:</span>
              <button
                type="button"
                onClick={() => handleSendMessage("Flexographic Press Specs")}
                className="border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-zinc-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                Flexo Press
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("Micro-Slitter Capacity")}
                className="border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-zinc-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                Micro-Slitter
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("Rotary Die-Cutting Options")}
                className="border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-zinc-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                Rotary Die
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyan-400 text-zinc-950 font-sans font-semibold"
                        : "bg-zinc-900/90 border border-zinc-800 text-zinc-200"
                    }`}
                  >
                    {msg.text}

                    {/* Technical Spec Matrix if provided */}
                    {msg.specData && (
                      <div className="mt-3 pt-2 border-t border-zinc-700/60 grid grid-cols-2 gap-2 text-[10px]">
                        {msg.specData.map((spec, i) => (
                          <div key={i} className="bg-zinc-950 p-1.5 border border-zinc-800">
                            <span className="text-zinc-500 block uppercase">{spec.label}</span>
                            <span className="text-cyan-400 font-bold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-1 uppercase">
                    {msg.sender === "user" ? "You" : "Shree AI"} • {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your technical inquiry or spec question..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-100 font-mono text-xs focus:border-cyan-400 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 font-mono text-xs uppercase font-bold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}