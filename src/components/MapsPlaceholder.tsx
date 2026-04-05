import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export const MapsPlaceholder = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-display font-bold mb-4">ჩვენი ლოკაცია</h2>
            <p className="text-white/60">გვეწვიეთ თბილისის ყველაზე ტექნოლოგიურ ცენტრში</p>
          </div>
          <div className="flex items-center gap-4 text-phoenix-cyan">
            <MapPin className="w-6 h-6" />
            <span className="font-mono">41.7151° N, 44.8271° E</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] rounded-2xl overflow-hidden glass border-phoenix-cyan/20 group"
        >
          {/* Dark Futuristic Map Background */}
          <div className="absolute inset-0 bg-[#0a192f]">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a44_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a44_1px,transparent_1px)] bg-[size:60px_60px]" />
            
            {/* Abstract "Data Points" */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-phoenix-cyan' : 'bg-phoenix-orange'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Main Location Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-phoenix-orange/20 rounded-full flex items-center justify-center border border-phoenix-orange"
              >
                <div className="w-4 h-4 bg-phoenix-orange rounded-full neon-glow-orange" />
              </motion.div>
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="glass px-4 py-2 rounded-lg border-phoenix-orange/50">
                  <span className="text-sm font-bold text-phoenix-orange">PHOENIX HQ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls UI Overlay */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white cursor-pointer">+</div>
            <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white cursor-pointer">-</div>
          </div>

          <div className="absolute bottom-6 left-6">
            <button className="px-6 py-3 glass rounded-full flex items-center gap-2 text-sm font-bold hover:bg-white/10 transition-all">
              <Navigation className="w-4 h-4 text-phoenix-cyan" />
              მიიღე მიმართულება
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
