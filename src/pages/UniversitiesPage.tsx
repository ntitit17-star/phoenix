import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Phone, Globe, GraduationCap, 
  ArrowLeft, Bookmark, X, ChevronRight,
  ExternalLink, Database, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { universities as localUniversities, University } from '../data/universities';
import { db, auth } from '../firebase';
import { collection, onSnapshot, setDoc, doc, getDocFromServer } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We don't throw here to avoid crashing the UI, but we log it.
};

export const UniversitiesPage: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ყველა' | 'უნივერსიტეტი' | 'კოლეჯი' | 'მართლმადიდებლური'>('ყველა');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    // Test connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    // Auth listener for admin check
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === 'ntitit17@gmail.com' && user?.emailVerified);
    });

    // Firestore listener
    const path = 'universities';
    const unsubscribeFirestore = onSnapshot(
      collection(db, path),
      (snapshot) => {
        const uniData = snapshot.docs.map(doc => doc.data() as University);
        // If Firestore is empty, we can fallback to local data for initial view
        // but the goal is to use Firestore.
        setUniversities(uniData.length > 0 ? uniData : localUniversities);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
        // Fallback to local data on error
        setUniversities(localUniversities);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  const seedData = async () => {
    if (!isAdmin || isSeeding) return;
    setIsSeeding(true);
    try {
      for (const uni of localUniversities) {
        await setDoc(doc(db, 'universities', uni.id), uni);
      }
      alert('მონაცემები წარმატებით აიტვირთა Firestore-ში!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'universities');
      alert('შეცდომა მონაცემების ატვირთვისას.');
    } finally {
      setIsSeeding(false);
    }
  };

  const filteredUnis = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ყველა' || uni.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-phoenix-navy pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Definitions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[32px] border-phoenix-cyan/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-phoenix-cyan/5 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-xl font-display font-bold text-phoenix-cyan mb-4 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              უნივერსიტეტი
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              უმაღლესი საგანმანათლებლო დაწესებულება, რომელიც ახორციელებს ვეტერინარიის ინტეგრირებულ სამაგისტრო საგანმანათლებლო პროგრამას, მასწავლებლის მომზადების ინტეგრირებულ საბაკალავრო-სამაგისტრო საგანმანათლებლო პროგრამას, სამედიცინო/სტომატოლოგიური განათლების პროგრამას, ბაკალავრიატისა და მაგისტრატურის საგანმანათლებლო პროგრამებს, მაგისტრატურის ან/და დოქტორანტურის საგანმანათლებლო პროგრამებსა და სამეცნიერო კვლევებს.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[32px] border-phoenix-orange/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-phoenix-orange/5 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-xl font-display font-bold text-phoenix-orange mb-4 flex items-center gap-3">
              <Bookmark className="w-6 h-6" />
              კოლეჯი
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              უმაღლესი საგანმანათლებლო დაწესებულება, რომელიც ახორციელებს აკადემიური უმაღლესი განათლების მხოლოდ პირველი საფეხურის - ბაკალავრიატის - საგანმანათლებლო პროგრამას/პროგრამებს.
            </p>
          </motion.div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-6 mb-4">
              <Link 
                to="/" 
                className="p-4 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all text-white/60 hover:text-white group"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">საგანმანათლებლო დაწესებულებები</h1>
            </div>
            <p className="text-white/40 text-sm font-medium ml-20">2025 წლის 1 მაისის მონაცემებით</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {isAdmin && (
              <button
                onClick={seedData}
                disabled={isSeeding}
                className="flex items-center gap-2 px-6 py-4 rounded-[20px] bg-phoenix-magenta/20 border border-phoenix-magenta/30 text-phoenix-magenta hover:bg-phoenix-magenta/30 transition-all disabled:opacity-50"
              >
                {isSeeding ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Database className="w-5 h-5" />
                )}
                <span className="text-sm font-bold">მონაცემების სინქრონიზაცია</span>
              </button>
            )}
            <div className="relative w-full sm:w-[350px] group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-phoenix-cyan transition-colors" />
              <input 
                type="text"
                placeholder="მოძებნე..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-phoenix-cyan/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {(['ყველა', 'უნივერსიტეტი', 'კოლეჯი', 'მართლმადიდებლური'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-phoenix-cyan text-phoenix-navy shadow-lg shadow-phoenix-cyan/20' 
                  : 'glass border-white/5 text-white/40 hover:text-white hover:border-white/20'
              }`}
            >
              {cat === 'ყველა' ? 'ყველა' : cat === 'მართლმადიდებლური' ? 'მართლმადიდებლური' : cat + 'ები'}
            </button>
          ))}
        </div>

        {/* Universities Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-phoenix-cyan animate-spin mb-4" />
            <p className="text-white/40 font-medium">იტვირთება მონაცემები...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredUnis.map((uni, i) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="glass border-white/5 rounded-[32px] p-8 flex flex-col sm:flex-row gap-8 group cursor-pointer hover:border-white/20 transition-all relative overflow-hidden"
                onClick={() => setSelectedUni(uni)}
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-phoenix-cyan/5 to-transparent blur-3xl" />
                
                {/* Logo Section */}
                <div className="w-full sm:w-32 h-32 rounded-2xl bg-white p-4 flex-shrink-0 flex items-center justify-center relative z-10 shadow-2xl shadow-black/20">
                  <img 
                    src={uni.logo} 
                    alt={uni.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>

                {/* Content Section */}
                <div className="flex-grow flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-black text-phoenix-cyan bg-phoenix-cyan/10 px-2 py-0.5 rounded-md">
                          {uni.code}
                        </span>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">კოდი</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-phoenix-cyan transition-colors line-clamp-2">
                        {uni.name}
                      </h3>
                    </div>
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/20 hover:text-phoenix-orange flex-shrink-0">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${uni.type === 'კერძო' ? 'bg-phoenix-orange' : 'bg-phoenix-cyan'}`} />
                      {uni.type}
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-phoenix-magenta" />
                      {uni.faculties.length} ფაკულტეტი / {uni.programCount} პროგრამა
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 text-phoenix-yellow">
                      {uni.priceRange}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredUnis.length === 0 && (
          <div className="text-center py-32">
            <Search className="w-20 h-20 mx-auto mb-6 opacity-10" />
            <h3 className="text-2xl font-display font-bold text-white/40">უნივერსიტეტი ვერ მოიძებნა</h3>
            <p className="text-white/20 mt-2">სცადეთ სხვა საკვანძო სიტყვა</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedUni && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-phoenix-navy/95 backdrop-blur-2xl" onClick={() => setSelectedUni(null)} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-5xl max-h-[90vh] glass border-white/10 rounded-[48px] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 border-b border-white/10 flex items-start justify-between bg-white/5">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-32 h-32 rounded-3xl bg-white p-5 flex-shrink-0 shadow-2xl">
                    <img src={selectedUni.logo} alt={selectedUni.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-phoenix-cyan/20 text-phoenix-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {selectedUni.type}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight max-w-2xl">{selectedUni.name}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedUni(null)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Info Sidebar */}
                  <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 group">
                        <div className="p-3 rounded-xl bg-phoenix-orange/10 text-phoenix-orange group-hover:scale-110 transition-transform">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">მისამართი</div>
                          <div className="text-sm font-medium leading-relaxed">{selectedUni.address}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="p-3 rounded-xl bg-phoenix-magenta/10 text-phoenix-magenta group-hover:scale-110 transition-transform">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">ტელეფონი</div>
                          <div className="text-sm font-medium">{selectedUni.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="p-3 rounded-xl bg-phoenix-cyan/10 text-phoenix-cyan group-hover:scale-110 transition-transform">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">ვებ-გვერდი</div>
                          <a 
                            href={`https://${selectedUni.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm font-medium hover:text-phoenix-cyan transition-colors flex items-center gap-2"
                          >
                            {selectedUni.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="p-3 rounded-xl bg-phoenix-yellow/10 text-phoenix-yellow group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">პროგრამების რაოდენობა</div>
                          <div className="text-sm font-medium">{selectedUni.programCount} პროგრამა</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-phoenix-orange/20 to-phoenix-magenta/20 border border-white/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">სწავლის საფასური</div>
                      <div className="text-3xl font-display font-black text-phoenix-orange tracking-tighter">{selectedUni.priceRange}</div>
                    </div>
                  </div>

                  {/* Faculties Main */}
                  <div className="lg:col-span-2">
                    <h4 className="text-2xl font-display font-bold mb-8 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-phoenix-yellow/20 flex items-center justify-center text-phoenix-yellow">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      ფაკულტეტების სია
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {selectedUni.faculties.map((faculty, idx) => (
                        <motion.div 
                          key={faculty.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-phoenix-cyan/30 hover:bg-phoenix-cyan/5 transition-all flex items-center justify-between group cursor-default"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/20 group-hover:text-phoenix-cyan transition-colors">
                              {idx + 1}
                            </div>
                            <span className="text-base font-medium group-hover:text-white transition-colors">{faculty.name}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-phoenix-cyan group-hover:translate-x-1 transition-all" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
