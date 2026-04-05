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

        {/* Why Us Section */}
        <section id="why-us" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">რატომ PHOENIX?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-phoenix-orange to-phoenix-magenta mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'ინდივიდუალური მიდგომა', desc: 'თითოეული სტუდენტის საჭიროებებზე მორგებული სასწავლო გეგმა და მუდმივი მონიტორინგი.' },
                { title: 'თანამედროვე პლატფორმა', desc: 'ონლაინ რესურსები, ტესტები და ვიდეო გაკვეთილები 24/7 ხელმისაწვდომობით ნებისმიერი მოწყობილობიდან.' },
                { title: 'გარანტირებული შედეგი', desc: 'ჩვენი სტუდენტების 98% წარმატებით აბარებს სასურველ ფაკულტეტზე მაღალი გრანტით.' },
                { title: 'გამოცდილი მენტორები', desc: 'საუკეთესო სპეციალისტები, რომლებიც დაგეხმარებიან რთული მასალის მარტივად ათვისებაში.' },
                { title: 'ინოვაციური მეთოდები', desc: 'სწავლების უახლესი ტექნოლოგიები, რომლებიც პროცესს უფრო საინტერესოს და ეფექტურს ხდის.' },
                { title: 'მუდმივი მხარდაჭერა', desc: 'ჩვენი გუნდი მზად არის გიპასუხოთ ნებისმიერ კითხვაზე სასწავლო პროცესის განმავლობაში.' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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

        {/* About Us Section */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="glass p-12 md:p-20 rounded-[40px] border-phoenix-cyan/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-phoenix-magenta/10 blur-[100px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-phoenix-cyan/10 blur-[100px] -ml-48 -mb-48" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">ჩვენს შესახებ</h2>
                  <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                    <p>
                      PHOENIX-ის მოსამზადებელი ცენტრი დაარსდა იმ მიზნით, რომ რევოლუცია მოეხდინა საგანმანათლებლო სივრცეში. ჩვენ გვჯერა, რომ თითოეულ მოსწავლეს აქვს უნიკალური პოტენციალი, რომლის გამოსავლენადაც საჭიროა სწორი გარემო და თანამედროვე ხელსაწყოები.
                    </p>
                    <p>
                      ჩვენი ცენტრი აერთიანებს ტრადიციულ ცოდნას და მომავლის ტექნოლოგიებს. ჩვენ არ ვასწავლით მხოლოდ საგნებს, ჩვენ ვასწავლით აზროვნებას, პრობლემების გადაჭრას და მომავლისთვის მზადყოფნას.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold">ინოვაცია</div>
                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold">ხარისხი</div>
                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold">შედეგი</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden glass border-white/10 relative group">
                    <img 
                      src="https://picsum.photos/seed/education/800/800" 
                      alt="Education" 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-phoenix-navy via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-phoenix-orange/20 border border-phoenix-orange flex items-center justify-center animate-pulse">
                        <div className="w-12 h-12 bg-phoenix-orange rounded-full neon-glow-orange" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
