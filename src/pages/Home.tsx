import React from 'react';
import { Hero } from '../components/Hero';
import { MapsPlaceholder } from '../components/MapsPlaceholder';
import { ContactForm } from '../components/ContactForm';
import { NewsSection } from '../components/NewsSection';
import { PhoenixLogo } from '../components/Logo';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, Trophy, Rocket, Languages, Globe, 
  Calculator, History, Users2, Lightbulb, ShieldCheck, 
  Target, GraduationCap, Briefcase 
} from 'lucide-react';

const stats = [
  { label: 'წარმატებული მოსწავლე', value: '5000+', icon: Users, color: 'text-phoenix-cyan' },
  { label: 'პროფესიონალი მასწავლებელი', value: '120+', icon: BookOpen, color: 'text-phoenix-orange' },
  { label: 'საუკეთესო შედეგები', value: '98%', icon: Trophy, color: 'text-phoenix-magenta' },
  { label: 'ინოვაციური მეთოდები', value: '100%', icon: Rocket, color: 'text-phoenix-yellow' },
];

const NaecLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M48 5 L95 85 H78 L40 5 H48Z" fill="#e31e24" />
    <path d="M5 85 L40 25 L50 42 L22 85 H68 L62 75 H22 L5 85 Z" fill="#0067b1" />
  </svg>
);

const categories = [
  { name: 'უნივერსიტეტები', icon: GraduationCap, color: 'text-phoenix-cyan', path: '/universities' },
  { name: 'პროფესიული განათლება', icon: Briefcase, color: 'text-phoenix-orange' },
  { name: 'ერთიანი ეროვნული გამოცდები', icon: NaecLogo, color: '' },
];

const subjects = [
  { name: 'ქართული ენა და ლიტერატურა', icon: Languages, color: 'text-phoenix-orange' },
  { name: 'ინგლისური ენა', icon: Globe, color: 'text-phoenix-cyan' },
  { name: 'მათემატიკა', icon: Calculator, color: 'text-phoenix-magenta' },
  { name: 'ისტორია', icon: History, color: 'text-phoenix-yellow' },
  { name: 'სამოქალაქო განათლება', icon: Users2, color: 'text-phoenix-cyan' },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Hero />

      {/* Stats Section */}
      <section className="py-12 relative z-10">
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

      {/* News & Blog Section */}
      <NewsSection />

      {/* Education Categories Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => cat.path && navigate(cat.path)}
                className="glass p-10 rounded-[32px] border-white/5 text-center flex flex-col items-center gap-6 group cursor-pointer hover:border-white/20 transition-all"
              >
                <div className={`w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-display font-bold tracking-tight">{cat.name}</h3>
                <div className="w-12 h-1 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-current transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entrants Subjects Section */}
      <section id="entrants" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">აბიტურიენტთა მოსამზადებელი საგნები</h2>
            <div className="w-20 h-1 bg-phoenix-cyan mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {subjects.map((subject, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                className="glass p-8 rounded-2xl border-white/5 text-center flex flex-col items-center justify-center gap-4 group transition-all"
              >
                <div className={`p-4 rounded-xl bg-white/5 ${subject.color} group-hover:scale-110 transition-transform`}>
                  <subject.icon className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold leading-tight">{subject.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 relative overflow-hidden">
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
                  <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold flex items-center gap-2 group hover:bg-phoenix-cyan/10 hover:border-phoenix-cyan/30 transition-all">
                    <Lightbulb className="w-4 h-4 text-phoenix-cyan" />
                    ინოვაცია
                  </div>
                  <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold flex items-center gap-2 group hover:bg-phoenix-orange/10 hover:border-phoenix-orange/30 transition-all">
                    <ShieldCheck className="w-4 h-4 text-phoenix-orange" />
                    ხარისხი
                  </div>
                  <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold flex items-center gap-2 group hover:bg-phoenix-magenta/10 hover:border-phoenix-magenta/30 transition-all">
                    <Target className="w-4 h-4 text-phoenix-magenta" />
                    შედეგი
                  </div>
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-32 h-32 flex items-center justify-center">
                        <PhoenixLogo className="w-full h-full" />
                      </div>
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-4xl font-display font-black tracking-tighter text-white text-glow-orange"
                    >
                      PHOENIX
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PHOENIX Section */}
      <section id="why-us" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">რატომ PHOENIX?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-phoenix-orange to-phoenix-magenta mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'ინდივიდუალური მიდგომა', desc: 'თითოეული მოსწავლის საჭიროებებზე მორგებული სასწავლო გეგმა და მუდმივი მონიტორინგი.' },
              { title: 'თანამედროვე პლატფორმა', desc: 'ონლაინ რესურსები, ტესტები და ვიდეო გაკვეთილები 24/7 ხელმისაწვდომობით ნებისმიერი მოწყობილობიდან.' },
              { title: 'გარანტირებული შედეგი', desc: 'ჩვენი მოსწავლეების 98% წარმატებით აბარებს სასურველ ფაკულტეტზე მაღალი გრანტით.' },
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

      {/* Location & Contact Section */}
      <section id="contact" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <div className="mb-8 h-16 flex flex-col justify-end">
                <h2 className="text-3xl font-display font-bold mb-2">ჩვენი ლოკაცია</h2>
                <p className="text-white/50 text-sm">გვეწვიეთ თბილისის ყველაზე ტექნოლოგიურ ცენტრში</p>
              </div>
              <div className="flex-grow">
                <MapsPlaceholder />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-8 h-16 flex flex-col justify-end">
                <h2 className="text-3xl font-display font-bold mb-2">დაგვიკავშირდით</h2>
                <p className="text-white/50 text-sm">გაქვთ კითხვები? ჩვენი გუნდი მზად არის დაგეხმაროთ</p>
              </div>
              <div className="flex-grow">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
