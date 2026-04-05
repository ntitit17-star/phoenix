import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-6 md:p-8 rounded-3xl border-phoenix-magenta/20 h-full"
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">სახელი</label>
            <input 
              type="text" 
              placeholder="თქვენი სახელი"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">ტელეფონი</label>
            <input 
              type="tel" 
              placeholder="+995 5XX XX XX XX"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">თემა</label>
          <input 
            type="text" 
            placeholder="რა გაინტერესებთ?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">შეტყობინება</label>
          <textarea 
            rows={3}
            placeholder="მოგვწერეთ დეტალურად..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20 resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-phoenix-orange to-phoenix-magenta text-white text-sm font-black rounded-xl neon-glow-magenta flex items-center justify-center gap-3 transition-all"
        >
          გაგზავნა
          <Send className="w-4 h-4" />
        </motion.button>
      </form>
    </motion.div>
  );
};
