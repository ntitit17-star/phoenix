import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoenixLogo } from './Logo';
import { Menu, X, LogIn, LogOut, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const navLinks = [
  { name: 'აბიტურიენტებისთვის', href: '/#entrants' },
  { name: 'ჩვენს შესახებ', href: '/#about' },
  { name: 'რატომ PHOENIX?', href: '/#why-us' },
  { name: 'სიახლეები', href: '/#news' },
  { name: 'ბლოგი', href: '/#blog' },
  { name: 'კონტაქტი', href: '/#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Add custom parameters to ensure account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login error:", error);
      
      // If popup is blocked or closed, we can try redirect as a fallback
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        setAuthError("Popup დაიბლოკა. სცადეთ ხელახლა ან გახსენით აპლიკაცია ახალ ტაბში.");
      } else {
        setAuthError(error.code || error.message);
      }
      
      // Auto-hide error after 5 seconds
      setTimeout(() => setAuthError(null), 5000);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = user?.email === 'ntitit17@gmail.com';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 glass border-b border-phoenix-cyan/20' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={(e) => {
            setIsMobileMenuOpen(false);
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <PhoenixLogo className="w-10 h-10" />
          <span className="text-2xl font-display font-bold tracking-tighter text-white group-hover:text-phoenix-orange transition-colors">
            PHOENIX
          </span>
        </Link>

        {/* Auth Error Message */}
        <AnimatePresence>
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 bg-phoenix-magenta text-white text-xs font-bold rounded-lg shadow-xl z-[60]"
            >
              ავტორიზაციის შეცდომა: {authError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-white/80 hover:text-phoenix-cyan hover:text-glow-cyan transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
          
          {isAdmin && (
            <Link
              to="/admin/news"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-phoenix-cyan/10 text-phoenix-cyan border border-phoenix-cyan/20 hover:bg-phoenix-cyan/20 transition-all text-sm font-bold"
            >
              <Settings className="w-4 h-4" />
              ადმინი
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 text-white/60 hover:text-phoenix-magenta transition-colors"
              title="გამოსვლა"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold"
            >
              <LogIn className="w-4 h-4" />
              შესვლა
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b border-phoenix-cyan/20 py-6 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-medium text-white/90 hover:text-phoenix-orange"
                >
                  {link.name}
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  to="/admin/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-phoenix-cyan"
                >
                  <Settings className="w-5 h-5" />
                  ადმინ პანელი
                </Link>
              )}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-lg font-medium text-phoenix-magenta"
                >
                  <LogOut className="w-5 h-5" />
                  გამოსვლა
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 text-lg font-medium text-phoenix-cyan"
                >
                  <LogIn className="w-5 h-5" />
                  შესვლა
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
