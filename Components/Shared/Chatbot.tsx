"use client";

import React, { useState, useRef, useEffect } from "react";
import ZigzagSVG from "./ZigzagSVG";

type Message = { id: number; sender: "user" | "bot"; text: string; latency?: number };

const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3 bg-[#26312d]/8 rounded-[20px] rounded-tl-md">
    <span className="w-1.5 h-1.5 bg-[#26312d]/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <span className="w-1.5 h-1.5 bg-[#26312d]/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <span className="w-1.5 h-1.5 bg-[#26312d]/50 rounded-full animate-bounce" />
  </div>
);

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    const getSessionId = () => {
      if (typeof window === "undefined") return `s_${Date.now()}`;
      const key = "yuvaya_chat_session";
      const stored = window.localStorage.getItem(key);
      if (stored) return stored;

      const uuid = window.crypto?.randomUUID?.();
      const sid = uuid ?? `s_${Date.now()}`;
      window.localStorage.setItem(key, sid);
      return sid;
    };

    try {
      sessionIdRef.current = getSessionId();
    } catch {
      sessionIdRef.current = `s_${Date.now()}`;
    }
  }, []);

  const toggleOpen = () => setOpen((v) => !v);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const id = nextId.current++;
    setMessages((m) => [...m, { id, sender: "user", text }]);
    setInput("");
    setSending(true);
    setTyping(true);

    try {
      const payload: { message: string; session_id?: string } = { message: text };
      if (sessionIdRef.current) payload.session_id = sessionIdRef.current;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      const botText = typeof data === "string" ? data : data.reply ?? JSON.stringify(data);
      const latency = typeof data === "object" && data.latency !== undefined ? Number(data.latency) : undefined;
      const botId = nextId.current++;
      setMessages((m) => [...m, { id: botId, sender: "bot", text: botText, latency }]);
    } catch {
      const botId = nextId.current++;
      setMessages((m) => [...m, { id: botId, sender: "bot", text: "Unable to connect. Please try again." }]);
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
      <div
        className={`absolute bottom-16 right-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-bottom-right ${
          open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-[92vw] sm:w-[340px] max-w-[92vw] h-[60vh] sm:h-[480px] max-h-[80vh] bg-[#fffdf2] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[28px] overflow-hidden flex flex-col border border-[#e8e4d9]">
            {/* Header */}
            <div className="relative overflow-hidden px-5 py-4 bg-[#26312d]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#4ade80] animate-pulse" />
                  <div>
                    <div className="font-poppins text-[15px] font-medium text-[#fffdf2]">Yuvaya Assistant</div>
                    <div className="font-poppins text-[11px] text-[#fffdf2]/60">Here to help</div>
                  </div>
                </div>
                <button
                  onClick={toggleOpen}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#fffdf2]/70 hover:text-[#fffdf2] hover:bg-[#fffdf2]/10 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>
              {/* Decorative zigzags */}
              <div className="absolute -bottom-3 left-6 pointer-events-none opacity-30">
                <ZigzagSVG color="green" width={80} height={28} />
              </div>
              <div className="absolute -top-2 -right-2 pointer-events-none opacity-20 rotate-12">
                <ZigzagSVG color="green" width={90} height={45} />
              </div>
              <div className="absolute top-1/2 -right-4 pointer-events-none opacity-15 -rotate-45">
                <ZigzagSVG color="orange" width={70} height={35} />
              </div>
              <div className="absolute -top-1 left-4 pointer-events-none opacity-20 -rotate-6">
                <ZigzagSVG color="orange" width={60} height={30} />
              </div>
              <div className="absolute bottom-2 -left-2 pointer-events-none opacity-15 rotate-45">
                <ZigzagSVG color="green" width={50} height={25} />
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 px-4 py-5 overflow-y-auto bg-[#fffdf2]">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#11731b]/10 flex items-center justify-center">
                    <ChatIcon className="text-[#11731b]" />
                  </div>
                  <p className="font-poppins text-[14px] text-[#5a5a5a] max-w-[200px]">
                    Ask us anything about our products or wellness routine
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`mb-4 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${m.sender === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`font-poppins text-[14px] leading-normal px-4 py-3 ${
                        m.sender === "user"
                          ? "bg-[#11731b] text-[#fffdf2] rounded-[20px] rounded-tr-md"
                          : "bg-[#26312d]/8 text-[#26312d] rounded-[20px] rounded-tl-md"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.sender === "bot" && m.latency != null && (
                      <div className="font-poppins text-[10px] text-[#9ca3af] mt-1.5 ml-1">{m.latency}ms</div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="mb-4 flex justify-start">
                  <TypingIndicator />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-4 bg-[#fffdf2] border-t border-[#e8e4d9]">
              <div className="flex items-center gap-2 bg-white rounded-full border border-[#e8e4d9] px-1.5 py-1.5 shadow-sm focus-within:border-[#11731b]/30 focus-within:ring-2 focus-within:ring-[#11731b]/10 transition-all duration-200">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent px-3 py-2 font-poppins text-[14px] text-[#26312d] placeholder:text-[#9ca3af] outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || input.trim().length === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#11731b] text-[#fffdf2] transition-all duration-200 hover:bg-[#0d5a14] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#11731b]"
                >
                  <SendIcon className="ml-0.5" />
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-[0_8px_30px_rgba(17,115,27,0.3)] transition-all duration-300 flex items-center justify-center ${
          open
            ? "bg-[#fffdf2] text-[#11731b] border border-[#11731b]/20 rotate-0"
            : "bg-[#11731b] text-[#fffdf2] hover:bg-[#0d5a14] hover:scale-105"
        }`}
      >
        {open ? <CloseIcon className="w-5 h-5" /> : <ChatIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Chatbot;
