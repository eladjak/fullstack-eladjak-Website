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
      className="w-full overflow-hidden py-6 bg-muted/20 border-y border-border/20 scroll-fade"
    >
      {/* Screen reader accessible list */}
      <div className="sr-only">
        <ul>
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
      {/* Visual marquee - hidden from screen readers */}
      <div className="animate-marquee flex w-max motion-reduce:animate-none" aria-hidden="true">
        <div className="flex shrink-0 items-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap select-none px-4"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap select-none px-4"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
