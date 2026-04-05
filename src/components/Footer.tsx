import React from 'react';
import { PhoenixLogo } from './Logo';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <PhoenixLogo className="w-8 h-8" />
              <span className="text-xl font-display font-bold tracking-tighter text-white">
                PHOENIX
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              ჩვენი მისიაა დავეხმაროთ მოსწავლეებს საკუთარი პოტენციალის მაქსიმალურ რეალიზებაში თანამედროვე ტექნოლოგიების დახმარებით.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-phoenix-orange transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-phoenix-magenta transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-phoenix-cyan transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">ნავიგაცია</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/universities" className="hover:text-phoenix-cyan transition-colors">უნივერსიტეტები</Link></li>
              <li><Link to="/#news" className="hover:text-phoenix-cyan transition-colors">სიახლეები</Link></li>
              <li><Link to="/#blog" className="hover:text-phoenix-cyan transition-colors">ბლოგი</Link></li>
              <li><Link to="/#entrants" className="hover:text-phoenix-cyan transition-colors">აბიტურიენტებისთვის</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">ცენტრი</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/#about" className="hover:text-phoenix-cyan transition-colors">ჩვენ შესახებ</Link></li>
              <li><Link to="/#contact" className="hover:text-phoenix-cyan transition-colors">კონტაქტი</Link></li>
              <li><a href="#" className="hover:text-phoenix-cyan transition-colors">ვაკანსიები</a></li>
              <li><a href="#" className="hover:text-phoenix-cyan transition-colors">წესები და პირობები</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">კონტაქტი</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-phoenix-orange" />
                +995 32 2XX XX XX
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-phoenix-magenta" />
                info@phoenix.ge
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-phoenix-cyan" />
                თბილისი, საქართველო
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-xs text-white/20">
          <p>© 2026 PHOENIX Prep Center. ყველა უფლება დაცულია.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
