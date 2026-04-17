"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Send, X, Loader2 } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

interface CustomersBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomersBot({ isOpen, onClose }: CustomersBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I'm Annie, your customer service assistant. How can I help you today?" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = inputVal.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputVal("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.response ?? "Sorry, I couldn't process that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-80 sm:w-96 rounded-[2rem] overflow-hidden flex flex-col backdrop-blur-3xl bg-white/60 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
          style={{ height: "500px", maxHeight: "75vh" }}
        >
          {/* Header */}
          <div className="bg-black/80 backdrop-blur-md p-4 flex items-center justify-between text-white border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold">Customer Support</div>
                <div className="text-xs text-green-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[80%] p-3 text-sm rounded-2xl shadow-sm ${
                  m.sender === "bot"
                    ? "bg-white/90 border border-white/50 text-black self-start rounded-tl-sm"
                    : "bg-black/90 text-white self-end rounded-tr-sm"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
            {isLoading && (
              <div className="self-start flex items-center gap-2 text-sm text-gray-500 bg-white/80 p-3 rounded-2xl rounded-tl-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Typing…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white/50 backdrop-blur-xl border-t border-white/50 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message..."
              className="flex-1 p-3 bg-white/70 rounded-xl outline-none text-sm border border-white/50 focus:border-black/30 transition-colors text-black placeholder:text-gray-500"
              autoFocus
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-3 bg-black/90 text-white rounded-xl hover:bg-black transition-colors flex-shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
