'use client';

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL',
  'Tailwind CSS', 'Framer Motion', 'OpenAI', 'Claude AI',
  'Docker', 'Vercel', 'GraphQL', 'Prisma', 'LangChain',
];

export default function TechMarquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="relative w-full overflow-hidden py-6 bg-muted/20 border-y border-border/30 scroll-fade"
    >
      {/* Screen reader accessible list */}
      <div className="sr-only">
        <ul>
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
      {/* Edge fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-background to-transparent z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-background to-transparent z-10" aria-hidden="true" />
      {/* Visual marquee - hidden from screen readers */}
      <div className="animate-marquee flex w-max motion-reduce:animate-none" aria-hidden="true">
        <div className="flex shrink-0 items-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 hover:text-primary whitespace-nowrap select-none px-4 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 hover:text-primary whitespace-nowrap select-none px-4 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
