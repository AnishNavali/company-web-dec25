"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Bot,
  Headphones,
  User,
  Zap,
  Globe,
  MessageCircle,
  Stethoscope,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";

const CHATBOTS = [
  { id: "sales", name: "Sales Bot", icon: Bot, desc: "Closes deals & queries." },
  { id: "support", name: "Support Agent", icon: Headphones, desc: "24/7 customer support." },
  { id: "hr", name: "HR Assistant", icon: User, desc: "Recruitment & policy." },
  { id: "tech", name: "Tech Support", icon: Zap, desc: "Troubleshoots issues." },
  { id: "health", name: "Health Bot", icon: Stethoscope, desc: "Symptom & triage." },
  { id: "finance", name: "Finance Bot", icon: Globe, desc: "Billing & accounts." },
  { id: "custom", name: "Custom Bot", icon: MessageCircle, desc: "Trained on your data." },
];

export default function ChatbotPage() {
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedBot = CHATBOTS.find((b) => b.id === selectedBotId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  // Open chat and greet
  const handleSelectBot = (botId: string) => {
    setSelectedBotId(botId);
    setChatOpen(false); // First click only selects and shows floating icon
    setMessages([
      { sender: "bot", text: "Hi! How can I help you today?" }
    ]);
  };

  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: inputVal }]);
    setInputVal("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Please try again." },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FFFAF7] pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Our Bots
          </motion.h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
            Select a chatbot below to see it in action instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CHATBOTS.map((bot, idx) => {
            const Icon = bot.icon;
            const isSelected = selectedBotId === bot.id;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleSelectBot(bot.id)}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 rounded-3xl backdrop-blur-2xl ${
                    isSelected
                      ? "ring-2 ring-black bg-white/70 border-white shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
                      : "border border-white/40 bg-white/40 shadow-[0_4px_16px_0_rgba(31,38,135,0.05)] hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-black text-white rounded-2xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-black">{bot.name}</h3>
                  </div>
                  <p className="text-gray-600 font-medium">{bot.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Widget System at Bottom Right */}
      <AnimatePresence>
        {selectedBot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
          >
            {/* The Chat Window */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20, originBottom: "100%", originRight: "100%" }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="w-80 sm:w-96 rounded-[2rem] overflow-hidden flex flex-col backdrop-blur-3xl bg-white/60 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                  style={{ height: "500px", maxHeight: "75vh" }}
                >
                  {/* Header */}
                  <div className="bg-black/80 backdrop-blur-md p-4 flex items-center justify-between text-white border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                        <selectedBot.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">{selectedBot.name}</div>
                        <div className="text-xs text-green-400 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Online
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleChat}
                      className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      title="Close Chat"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {messages.map((m, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                        className={`max-w-[80%] p-3 text-sm rounded-2xl shadow-sm ${
                          m.sender === "bot"
                            ? "bg-white/90 border border-white/50 text-black self-start rounded-tl-sm backdrop-blur-md"
                            : "bg-black/90 text-white self-end rounded-tr-sm backdrop-blur-md"
                        }`}
                      >
                        {m.text}
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Form */}
                  <div className="p-3 bg-white/50 backdrop-blur-xl border-t border-white/50 flex items-center gap-2">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Message..."
                      className="flex-1 p-3 bg-white/70 backdrop-blur-md rounded-xl outline-none text-sm border border-white/50 focus:border-black/30 transition-colors text-black placeholder:text-gray-500"
                      autoFocus
                    />
                    <button
                      onClick={handleSend}
                      className="p-3 bg-black/90 text-white rounded-xl hover:bg-black transition-colors flex-shrink-0 backdrop-blur-md"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Bot Icon */}
            {!chatOpen && (
              <motion.button
                onClick={handleToggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full bg-black text-white flexItems-center justify-center shadow-2xl flex items-center"
              >
                <selectedBot.icon className="w-8 h-8 m-auto" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
