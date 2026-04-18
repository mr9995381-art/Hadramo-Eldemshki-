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
const MENU_PAGES = [
  {
    id: 1,
    title: "مندي، كبسة، وجبات فردية وعزائم",
    url: "/menu1.png" // User should upload the first page as menu1.png
  },
  {
    id: 2,
    title: "مشويات، وجبات الأسرة، سندوتشات",
    url: "/menu2.png" // User should upload the second page as menu2.png
  }
];

const MENU_DATA = [
  {
    category: "ركن المندي والكبسة والبرياني",
    items: [
      { name: "ربع فراخ ورك + أرز + سلطة", price: "90" },
      { name: "ربع فراخ صدر + أرز + سلطة", price: "100" },
      { name: "نصف فراخ + أرز + سلطة", price: "175" },
      { name: "فرخة كاملة + 2 أرز + سلطة", price: "350" },
      { name: "نفر لحم مندي + أرز + سلطة", price: "450" },
      { name: "موزة لحم + أرز + سلطة", price: "420" },
      { name: "ثمن تيس مندي + أرز + سلطة", price: "900" },
      { name: "ربع تيس مندي + أرز + سلطة", price: "1800" },
      { name: "نصف تيس مندي + أرز + سلطة", price: "3600" },
      { name: "وجبة الشياكة (ربع فرخة + ثمن طرب + كفتة + أرز + سلطة)", price: "230" },
    ]
  },
  {
    category: "الوجبات الفردية",
    items: [
      { name: "ربع فرخة ورك + أرز + سلطات", price: "90" },
      { name: "ربع فرخة ورك + 2 كفتة + أرز + سلطات", price: "130" },
      { name: "ربع فرخة صدر + أرز + سلطات", price: "100" },
      { name: "ربع فرخة صدر + 2 كفتة + أرز + سلطات", price: "140" },
      { name: "ربع فرخة ورك + خضار مشكل + أرز + سلطات", price: "130" },
      { name: "ربع فرخة ورك + 2 طرب + أرز + سلطات", price: "170" },
      { name: "ربع فرخة ورك + ربع كفتة + أرز + سلطات", price: "210" },
      { name: "ربع فرخة ورك + ربع طرب + أرز كبير + سلطات", price: "260" },
      { name: "ربع كفتة + ربع طرب + أرز كبير + سلطات", price: "300" },
      { name: "ربع كفتة + أرز + سلطات", price: "140" },
      { name: "ثمن كفتة + أرز + سلطات", price: "80" },
      { name: "ربع طرب + أرز + سلطات", price: "190" },
      { name: "ربع شيش طاووق + أرز + سلطات", price: "180" },
    ]
  },
  {
    category: "ركن المشويات (بالكيلو)",
    items: [
      { name: "كفتة مشوية", price: "450" },
      { name: "كباب مشوي", price: "1200" },
      { name: "كباب مشكل", price: "900" },
      { name: "طرب مشوي", price: "650" },
      { name: "ريش ضأن", price: "1250" },
      { name: "استيك مشوي", price: "700" },
      { name: "كبدة مشوية", price: "600" },
      { name: "سجق مشوي", price: "600" },
      { name: "شيش طاووق", price: "550" },
    ]
  },
  {
    category: "وجبات الأسرة",
    items: [
      { name: "وجبة الأسرة 1 (نص فرخة + نص كفتة + 2 أرز + سلطات)", price: "400" },
      { name: "وجبة الأسرة 2 (فرخة + ربع كفتة + 3 أرز + سلطات)", price: "480" },
      { name: "وجبة الأسرة 3 (فرخة مشوية + نص كفتة + 3 أرز + سلطات)", price: "550" },
      { name: "وجبة الأسرة 4 (كيلو كفتة + نص فرخة + 3 أرز + سلطات)", price: "640" },
      { name: "وجبة الأسرة 5 (فرخة ونص + نص كفتة + 4 أرز + سلطات)", price: "740" },
      { name: "وجبة الأسرة 6 (فرخة + كيلو كفتة + 4 أرز + سلطات)", price: "780" },
    ]
  },
  {
    category: "صواني حضرموت المميزة",
    items: [
      { name: "صينية السعادة (فرخة + 3 كفتة + سرفيس أرز + 4 سمبوسك + سلطات)", price: "680" },
      { name: "صينية الشياكة 1 (فرخة + نص كفتة + نص طرب + سرفيس أرز + سلطات)", price: "900" },
      { name: "صينية الشياكة 2 (فرخة + كيلو كفتة + كيلو طرب + سرفيس أرز كبير + سلطات)", price: "1530" },
      { name: "صينية الأكيلة (نص فرخة + ربع كفتة + ربع طرب + سرفيس أرز + سلطات)", price: "480" },
      { name: "صينية اللمة (ربع تيس مندي + فرخة مشوية أو مندي + كيلو كفتة + نص طرب + أرز + سلطات)", price: "3000" },
      { name: "صينية الأسرة الموفرة (فرختين + نصف كفتة + سرفيس أرز + سلطات)", price: "950" },
      { name: "صينية العائلة الكريمة (ثمن تيس مندي + فرخة مشوية أو مندي + نص كفتة + سرفيس أرز + سلطات)", price: "1500" },
    ]
  },
  {
    category: "ركن المطبخ والطواجن",
    items: [
      { name: "فرد حمام محشي + بطاطس", price: "180" },
      { name: "مكرونة فرن", price: "60" },
      { name: "أرز بسمتي (صغير / كبير)", price: "30 / 45" },
      { name: "أرز معمر / أرز أبيض", price: "60 / 40" },
      { name: "خضار اليوم / ملوخية / بامية", price: "40 / 50" },
      { name: "طاجن (تورلي / بامية / بطاطس) باللحمة", price: "230" },
    ]
  },
  {
    category: "ركن السندوتشات",
    items: [
      { name: "ساندوتش كفتة", price: "70" },
      { name: "ساندوتش حواوشي", price: "60" },
      { name: "ساندوتش طرب", price: "80" },
    ]
  }
];

export default function App() {
  const restaurantInfo = {
    name: "حضرموت الدمشقي",
    tagline: "أصل المندي والطعم الدمشقي الأصيل",
    logo: "/logo.png", // User should upload the logo as logo.png
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
    <div className="min-h-screen bg-bg-natural flex flex-col items-center p-6 pb-12 font-sans relative overflow-x-hidden">
      {/* Decorative Background Element */}
      <div className="fixed -bottom-10 -right-10 w-64 h-64 bg-accent-natural/5 rounded-full -z-10 blur-2xl" />
      <div className="fixed -top-20 -left-20 w-80 h-80 bg-primary-natural/5 rounded-full -z-10 blur-3xl" />

      {/* Main Container - following the 420px width suggestion for mobile-first feel */}
      <div className="w-full max-w-[420px] flex flex-col items-center">
        
        {/* Header / Logo Section */}
        <motion.header 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mt-12 mb-12 text-center"
        >
          <div className="relative mb-6">
            <div className="w-[100px] h-[100px] rounded-full bg-white border-4 border-accent-natural flex items-center justify-center shadow-lg overflow-hidden">
               <img 
                 src={restaurantInfo.logo} 
                 alt={restaurantInfo.name} 
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.style.display = 'none';
                   const parent = target.parentElement;
                   if (parent) {
                     parent.innerHTML = '<span class="text-primary-natural text-3xl font-bold">ح د</span>';
                   }
                 }}
               />
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 bg-white text-primary-natural p-2 rounded-full shadow-md border border-border-natural"
              onClick={shareApp}
            >
              <Share2 size={16} />
            </motion.button>
          </div>

          <h1 className="text-2xl font-bold text-primary-natural mb-2 tracking-tight">
            {restaurantInfo.name}
          </h1>
          <p className="text-accent-natural text-xs font-medium tracking-[0.5px] opacity-80 uppercase">
            {restaurantInfo.tagline}
          </p>
        </motion.header>

        {/* Links Container */}
        <div className="w-full space-y-3.5 mt-4">
          <LinkItem 
            title="📖 تصفح المنيو (قائمة الطعام)" 
            href={restaurantInfo.menuDriveLink}
            isPrimary={true}
            delay={0.1}
          />

          <LinkItem 
            title="📞 اطلب الآن (خدمة التوصيل)" 
            href={`tel:01271194944`}
            delay={0.2}
          />

          <LinkItem 
            title="📍 فروعنا ومواقعنا" 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurantInfo.name} طنطا`)}`}
            delay={0.3}
          />

          <LinkItem 
            title="📸 انستجرام" 
            href={restaurantInfo.ig}
            delay={0.4}
          />

          <LinkItem 
            title="👤 فيسبوك" 
            href={restaurantInfo.fb}
            delay={0.5}
          />

          <LinkItem 
            title="💬 تواصل معنا واتساب" 
            href={`https://wa.me/${restaurantInfo.whatsapp}`}
            delay={0.6}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 w-full text-center">
          <p className="text-primary-natural/60 text-sm font-bold mb-4">
            تصميم عمر احمد
          </p>
          <p className="text-slate-400 text-[10px] font-medium tracking-[1px] uppercase">
            Hadramout El Demashqy &copy; 2024
          </p>
        </footer>
      </div>
    </div>
  );
}

function LinkItem({ title, href, onClick, isPrimary, delay }: any) {
  const commonClasses = isPrimary 
    ? "btn-link bg-accent-natural text-white border-none justify-center" 
    : "btn-link bg-white text-primary-natural hover:bg-primary-natural hover:text-white justify-center";

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Component
        href={href}
        onClick={onClick}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className={commonClasses}
      >
        <span>{title}</span>
      </Component>
    </motion.div>
  );
}

function SocialMiniIcon({ href }: { href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-[35px] h-[35px] rounded-full bg-[#F0EDE9] flex items-center justify-center text-primary-natural/50 hover:bg-accent-natural hover:text-white transition-all duration-300"
    >
      <div className="w-1.5 h-1.5 bg-currentColor rounded-sm opacity-60" />
    </a>
  );
}
