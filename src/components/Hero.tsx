import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a22_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a22_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-phoenix-navy via-transparent to-phoenix-navy" />
      </div>

      {/* Cyber Phoenix Visual (Abstract) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-tr from-phoenix-orange via-phoenix-magenta to-phoenix-cyan blur-[100px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-phoenix-orange/30 mb-8">
            <Zap className="w-4 h-4 text-phoenix-orange" />
            <span className="text-xs font-bold tracking-widest text-phoenix-orange uppercase">
              The Future of Education is Here
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-6 leading-none">
            აღზევდი <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix-orange via-phoenix-magenta to-phoenix-cyan animate-gradient text-glow-orange">
              ჩვეულებრივზე მაღლა
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
            PHOENIX-ის მოსამზადებელი ცენტრი: პოტენციალის გარდაქმნა დაუძლეველ ენერგიად! 
            შეუერთდი მოსწავლეების ელიტარულ წრეს, რომლებიც დღესვე ეუფლებიან მომავალს!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-phoenix-yellow text-phoenix-navy font-black rounded-lg neon-glow-yellow flex items-center gap-2 transition-all"
            >
              დაიწყე მომზადება
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            
            <button className="px-10 py-4 glass text-white font-bold rounded-lg hover:bg-white/10 transition-all border-white/20">
              გაიგე მეტი
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-phoenix-navy to-transparent" />
    </section>
  );
};
