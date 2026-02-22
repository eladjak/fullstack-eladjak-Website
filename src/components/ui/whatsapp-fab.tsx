'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/972525427474?text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%9C%20%D7%94%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%A9%D7%9C%D7%99';

export function WhatsAppFAB() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-colors"
      aria-label="Contact via WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
