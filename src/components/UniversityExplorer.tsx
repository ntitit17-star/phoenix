import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, MapPin, Phone, Globe, GraduationCap, ChevronRight } from 'lucide-react';
import { universities, University } from '../data/universities';

interface UniversityExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UniversityExplorer: React.FC<UniversityExplorerProps> = ({ isOpen, onClose }) => {
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnis = universities.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-phoenix-navy/90 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl h-[90vh] glass border-white/10 rounded-[40px] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-phoenix-cyan/20 text-phoenix-cyan">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">უნივერსიტეტების სია</h2>
                  <p className="text-white/40 text-sm">იპოვე შენი მომავალი სასწავლებელი</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-hidden flex flex-col md:flex-row">
              {/* List Section */}
              <div className={`w-full md:w-1/3 border-r border-white/10 flex flex-col ${selectedUni ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                    <input 
                      type="text"
                      placeholder="მოძებნე უნივერსიტეტი..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-phoenix-cyan/50 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  {filteredUnis.map((uni) => (
                    <button
                      key={uni.id}
                      onClick={() => setSelectedUni(uni)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all group ${
                        selectedUni?.id === uni.id 
                          ? 'bg-phoenix-cyan/10 border-phoenix-cyan/30' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden flex-shrink-0">
                          <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h3 className="text-sm font-bold truncate group-hover:text-phoenix-cyan transition-colors">{uni.name}</h3>
                          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{uni.type}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedUni?.id === uni.id ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className={`flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar ${!selectedUni ? 'hidden md:flex items-center justify-center text-white/20' : 'block'}`}>
                {selectedUni ? (
                  <motion.div
                    key={selectedUni.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-3xl mx-auto w-full"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                      <div className="w-32 h-32 rounded-3xl bg-white p-4 flex-shrink-0">
                        <img src={selectedUni.logo} alt={selectedUni.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-phoenix-cyan/10 text-phoenix-cyan text-[10px] font-bold uppercase tracking-widest mb-4">
                          {selectedUni.type}
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-6 leading-tight">{selectedUni.name}</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="flex items-center gap-3 text-white/60">
                            <MapPin className="w-5 h-5 text-phoenix-orange" />
                            <span className="text-sm">{selectedUni.address}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/60">
                            <Phone className="w-5 h-5 text-phoenix-magenta" />
                            <span className="text-sm">{selectedUni.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/60">
                            <Globe className="w-5 h-5 text-phoenix-cyan" />
                            <a href={`https://${selectedUni.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-phoenix-cyan transition-colors">
                              {selectedUni.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <GraduationCap className="w-6 h-6 text-phoenix-yellow" />
                          ფაკულტეტების სია
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedUni.faculties.map((faculty) => (
                            <div 
                              key={faculty.id}
                              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
                            >
                              <span className="text-sm font-medium group-hover:text-phoenix-cyan transition-colors">{faculty.name}</span>
                              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-phoenix-cyan transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 rounded-3xl bg-gradient-to-br from-phoenix-orange/10 to-phoenix-magenta/10 border border-white/10">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">სწავლის საფასური</div>
                        <div className="text-2xl font-display font-black text-phoenix-orange">{selectedUni.priceRange}</div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-10" />
                    <p className="text-xl font-display font-bold">აირჩიე უნივერსიტეტი დეტალების სანახავად</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
