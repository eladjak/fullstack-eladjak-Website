'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, Code2, Briefcase, BookOpen, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  labelKey: string;
}

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const t = useTranslations('stats');

  const stats: StatItem[] = [
    { icon: <GitBranch className="h-5 w-5" />, value: 50, suffix: '+', labelKey: 'repos' },
    { icon: <Code2 className="h-5 w-5" />, value: 1000, suffix: '+', labelKey: 'commits' },
    { icon: <Briefcase className="h-5 w-5" />, value: 12, suffix: '', labelKey: 'projects' },
    { icon: <BookOpen className="h-5 w-5" />, value: 5, suffix: '', labelKey: 'blogPosts' },
    { icon: <Zap className="h-5 w-5" />, value: 3, suffix: '+', labelKey: 'yearsExp' },
  ];

  return (
    <section ref={ref} className="w-full py-12 md:py-16 border-y border-border/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              className="flex flex-col items-center gap-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium">
                {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
