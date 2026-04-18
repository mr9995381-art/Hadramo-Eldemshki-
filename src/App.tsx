/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  BookOpen, 
  Instagram, 
  Facebook, 
  X, 
  ChefHat, 
  ChevronLeft,
  Share2,
  ExternalLink,
  Utensils
} from 'lucide-react';

// Use placeholders for menu images since base64 or direct paths aren't provided as accessible URLs
// I will use some descriptive placeholders which can be replaced by real hosted images
export default function App() {
  const restaurantInfo = {
    name: "حضرموت الدمشقي",
    tagline: "أصل المندي والطعم الدمشقي الأصيل",
    location: "طنطا - شارع البحر - بجوار صيدناوي",
    whatsapp: "201000520345",
    phones: ["0403415244", "0403358084", "01271194944"],
    fb: "https://www.facebook.com/hadrmotdemshky",
    ig: "https://www.instagram.com/hadrmoteldmishky/?hl=ar",
    menuDriveLink: "https://drive.google.com/file/d/17GcoY8sNR8ylogzrj_Xo6mgXpLOaMOh8/view?usp=drive_link"
  };

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurantInfo.name,
        text: `${restaurantInfo.tagline} - اطلب الآن من ${restaurantInfo.name}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-natural flex flex-col items-center p-6 pb-24 font-sans relative">
      {/* Structural Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-natural to-primary-natural z-50 transition-all duration-1000" />
      
      {/* Vertical Rail Decoration */}
      <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
        <div className="w-px h-24 bg-primary-natural" />
        <span className="vertical-rail text-[10px] uppercase tracking-[0.3em] font-bold text-primary-natural py-4">
          Tradition • Quality • Excellence
        </span>
        <div className="w-px h-24 bg-primary-natural" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[440px] flex flex-col items-center relative z-10">
        
        {/* Editorial Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-16 mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-8 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border-natural">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase text-primary-natural/60">
              دائماً في خدمتكم
            </span>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -left-4 text-primary-natural/5 font-serif text-[180px] leading-none select-none -z-10 pointer-events-none">
              ح
            </div>
            
            <div className="editorial-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-natural/5 rounded-bl-[100px] -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
              
              <h1 className="text-4xl font-bold text-primary-natural mb-3 tracking-tighter leading-none">
                {restaurantInfo.name}
              </h1>
              <div className="w-12 h-1 bg-accent-natural mx-auto mb-4 rounded-full" />
              <p className="text-accent-natural text-sm font-bold tracking-[0.1em] opacity-90 mb-6 font-serif italic text-lg">
                {restaurantInfo.tagline}
              </p>
              
              <div className="flex flex-col items-center gap-3 pt-6 border-t border-border-natural/50">
                <div className="flex items-center gap-2 text-primary-natural/70 text-xs font-bold bg-bg-natural px-4 py-1.5 rounded-full">
                  <MapPin size={14} className="text-accent-natural" />
                  <span>{restaurantInfo.location}</span>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary-natural text-white p-4 rounded-full shadow-xl z-20"
              onClick={shareApp}
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </motion.header>

        {/* Links Grid/List */}
        <div className="w-full grid gap-4 mt-8">
          <LinkItem 
            title="📖 تصفح المنيو الكامل" 
            href={restaurantInfo.menuDriveLink}
            isPrimary={true}
            delay={0.1}
          />

          <div className="grid grid-cols-2 gap-4">
            <LinkItem 
              title="📞 اطلب هاتفياً" 
              href={`tel:01271194944`}
              delay={0.2}
            />
            <LinkItem 
              title="💬 واتساب" 
              href={`https://wa.me/${restaurantInfo.whatsapp}`}
              delay={0.3}
            />
          </div>

          <LinkItem 
            title="📍 موقع المطعم (GPS)" 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurantInfo.name} طنطا`)}`}
            delay={0.4}
          />

          <div className="grid grid-cols-2 gap-4">
            <LinkItem 
              title="📸 إنستجرام" 
              href={restaurantInfo.ig}
              delay={0.5}
            />
            <LinkItem 
              title="👤 فيسبوك" 
              href={restaurantInfo.fb}
              delay={0.6}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 w-full text-center flex flex-col items-center gap-6">
          <div className="w-full h-px bg-border-natural" />
          
          <div className="flex flex-col gap-2">
            <p className="text-accent-natural text-[11px] font-black tracking-[0.4em] uppercase opacity-40">
              Created By
            </p>
            <p className="text-primary-natural text-xl font-serif font-bold italic">
              عمر احمد
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-primary-natural/40 text-[9px] font-black tracking-[2px] uppercase">
              Hadramout El Demashqy &copy; 2024
            </p>
            <div className="flex gap-1 justify-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-accent-natural rounded-full opacity-20" />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function LinkItem({ title, href, isPrimary, delay }: any) {
  const commonClasses = isPrimary 
    ? "btn-link bg-primary-natural text-white border-none justify-center py-6 text-lg" 
    : "btn-link bg-white text-primary-natural justify-center text-sm font-bold border-2 border-border-natural/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        <span className="tracking-wide">{title}</span>
      </a>
    </motion.div>
  );
}
