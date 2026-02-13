'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: number;
  showStatus?: boolean;
}

export function ProfileAvatar({
  src,
  alt,
  size = 200,
  showStatus = true,
}: ProfileAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative"
    >
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, var(--primary), var(--accent), var(--primary))',
          padding: '4px',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="h-full w-full rounded-full bg-background" />
      </motion.div>

      {/* Avatar image with hover effect */}
      <motion.div
        className="relative overflow-hidden rounded-full"
        style={{
          width: size,
          height: size,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full object-cover"
          priority
        />

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* Status indicator */}
      {showStatus && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-background bg-green-500"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
