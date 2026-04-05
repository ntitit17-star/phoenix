import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MapsPlaceholder } from './components/MapsPlaceholder';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';
import { BookOpen, Users, Trophy, Rocket } from 'lucide-react';

const stats = [
  { label: 'წარმატებული სტუდენტი', value: '5000+', icon: Users, color: 'text-phoenix-cyan' },
  { label: 'პროფესიონალი ლექტორი', value: '120+', icon: BookOpen, color: 'text-phoenix-orange' },
  { label: 'საუკეთესო შედეგები', value: '98%', icon: Trophy, color: 'text-phoenix-magenta' },
  { label: 'ინოვაციური მეთოდები', value: '100%', icon: Rocket, color: 'text-phoenix-yellow' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-phoenix-navy selection:bg-phoenix-magenta/30">
      <Navbar />
      
      <main>
        <Hero />

        {/* Stats Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-8 rounded-2xl text-center border-white/5 hover:border-white/20 transition-all group"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-display font-black mb-1">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Services Preview */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">რატომ PHOENIX?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-phoenix-orange to-phoenix-magenta mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'ინდივიდუალური მიდგომა', desc: 'თითოეული სტუდენტის საჭიროებებზე მორგებული სასწავლო გეგმა.' },
                { title: 'თანამედროვე პლატფორმა', desc: 'ონლაინ რესურსები, ტესტები და ვიდეო გაკვეთილები 24/7 ხელმისაწვდომობით.' },
                { title: 'გარანტირებული შედეგი', desc: 'ჩვენი სტუდენტების უმრავლესობა ხვდება სასურველ ფაკულტეტზე გრანტით.' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="glass p-10 rounded-3xl border-white/5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-phoenix-orange to-phoenix-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl font-bold mb-4 group-hover:text-phoenix-cyan transition-colors">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold mb-2">ჩვენი ლოკაცია</h2>
                  <p className="text-white/50 text-sm">გვეწვიეთ თბილისის ყველაზე ტექნოლოგიურ ცენტრში</p>
                </div>
                <MapsPlaceholder />
              </div>
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold mb-2">დაგვიკავშირდით</h2>
                  <p className="text-white/50 text-sm">გაქვთ კითხვები? ჩვენი გუნდი მზად არის დაგეხმაროთ</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
