import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

const TopBanner = () => {
  return (
    <div className="w-full h-10 flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white border-b-2 border-gray-200 px-10">
      <div className="flex  gap-4">
        <span className="flex items-center gap-2">
          <MapPin size={20} />
          <a href="123 Healthcare Ave, Medical District">
            123 Healthcare Ave, Medical District
          </a>
        </span>
      </div>
      <div className="flex  gap-4">
        <span className="flex items-center gap-2">
          <Phone size={20} />
          <a href="tel:+1 (555) 123-4567">+1 (555) 123-4567</a>
        </span>
        <span className="flex items-center gap-2">
          <Mail size={20} />
          <a href="mailto:info@medicareplus.com">info@medicareplus.com</a>
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
