import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">დაგვიკავშირდით</h2>
          <p className="text-white/60">გაქვთ კითხვები? ჩვენი გუნდი მზად არის დაგეხმაროთ</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-3xl border-phoenix-magenta/20"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">სახელი</label>
                <input 
                  type="text" 
                  placeholder="თქვენი სახელი"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">ტელეფონი</label>
                <input 
                  type="tel" 
                  placeholder="+995 5XX XX XX XX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">თემა</label>
              <input 
                type="text" 
                placeholder="რა გაინტერესებთ?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">შეტყობინება</label>
              <textarea 
                rows={4}
                placeholder="მოგვწერეთ დეტალურად..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:animate-pulse-fire transition-all placeholder:text-white/20 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-gradient-to-r from-phoenix-orange to-phoenix-magenta text-white font-black rounded-xl neon-glow-magenta flex items-center justify-center gap-3 transition-all"
            >
              გაგზავნა
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
