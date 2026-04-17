"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Headphones, TrendingUp, DollarSign, Stethoscope } from "lucide-react";

import CustomersBot from "@/components/chatbot/customers/customers-bot";
import SalesBot from "@/components/chatbot/sales/sales-bot";
import FinanceBot from "@/components/chatbot/finance/finance-bot";
import HealthBot from "@/components/chatbot/health/health-bot";

type BotId = "customers" | "sales" | "finance" | "health";

const CHATBOTS: {
  id: BotId;
  name: string;
  icon: React.ElementType;
  desc: string;
  color: string;
}[] = [
  {
    id: "customers",
    name: "Customer Support",
    icon: Headphones,
    desc: "24/7 customer service & tech support.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "sales",
    name: "Sales Agent",
    icon: TrendingUp,
    desc: "Sales concepts & retail policies.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "finance",
    name: "Finance Bot",
    icon: DollarSign,
    desc: "Budgeting, savings & tax guidance.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "health",
    name: "Health Bot",
    icon: Stethoscope,
    desc: "Wellness, nutrition & lifestyle tips.",
    color: "from-orange-500 to-red-500",
  },
];

export default function ChatbotPage() {
  const [selectedBotId, setSelectedBotId] = useState<BotId | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const handleSelectBot = (botId: BotId) => {
    if (selectedBotId === botId) {
      // Toggle chat if same bot clicked again
      setChatOpen((prev) => !prev);
    } else {
      setSelectedBotId(botId);
      setChatOpen(true);
    }
  };

  const handleClose = () => {
    setChatOpen(false);
    setSelectedBotId(null);
  };

  const renderActiveBot = () => {
    if (!selectedBotId || !chatOpen) return null;
    const props = { isOpen: chatOpen, onClose: handleClose };
    switch (selectedBotId) {
      case "customers":
        return <CustomersBot {...props} />;
      case "sales":
        return <SalesBot {...props} />;
      case "finance":
        return <FinanceBot {...props} />;
      case "health":
        return <HealthBot {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF7] pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Our AI Bots
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Select a chatbot below to start a live conversation powered by AI.
          </motion.p>
        </div>

        {/* Bot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHATBOTS.map((bot, idx) => {
            const Icon = bot.icon;
            const isSelected = selectedBotId === bot.id && chatOpen;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => handleSelectBot(bot.id)}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 rounded-3xl backdrop-blur-2xl ${
                    isSelected
                      ? "ring-2 ring-black bg-white/70 border-white shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
                      : "border border-white/40 bg-white/40 shadow-[0_4px_16px_0_rgba(31,38,135,0.05)] hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${bot.color} text-white shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-black leading-tight">
                      {bot.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{bot.desc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                    <span className="text-xs text-green-600 font-semibold">
                      {isSelected ? "Active" : "Available"}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {selectedBotId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
          >
            {renderActiveBot()}

            {/* Floating Bot Icon (when chat is closed) */}
            {!chatOpen && selectedBotId && (() => {
              const bot = CHATBOTS.find((b) => b.id === selectedBotId)!;
              const Icon = bot.icon;
              return (
                <motion.button
                  onClick={() => setChatOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${bot.color} text-white flex items-center justify-center shadow-2xl`}
                >
                  <Icon className="w-8 h-8" />
                </motion.button>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
