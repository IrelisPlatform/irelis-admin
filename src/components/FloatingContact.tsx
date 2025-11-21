"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl p-4 rounded-xl border w-48 mb-3"
        >
          <a
            href="https://wa.me/237696712213"
            target="_blank"
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>

          <a
            href="https://t.me/irelisemplois"
            target="_blank"
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg"
          >
            <Send size={18} /> Telegram
          </a>
        </motion.div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-white p-4 rounded-full shadow-xl"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
