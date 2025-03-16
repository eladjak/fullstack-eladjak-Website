'use client';

interface ProjectFiltersProps {
  technologies: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function ProjectFilters({
  technologies,
  selected,
  onChange,
}: ProjectFiltersProps) {
  const toggleTech = (tech: string) => {
    const newSelected = selected.includes(tech)
      ? selected.filter(t => t !== tech)
      : [...selected, tech];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <button
          key={tech}
          onClick={() => toggleTech(tech)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            selected.includes(tech)
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {tech}
        </button>
      ))}
    </div>
  );
}
