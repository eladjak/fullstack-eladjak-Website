'use client';

interface BlogFiltersProps {
  tags: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function BlogFilters({
  tags,
  selected,
  onChange,
}: BlogFiltersProps) {
  const toggleTag = (tag: string) => {
    const newSelected = selected.includes(tag)
      ? selected.filter(t => t !== tag)
      : [...selected, tag];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            selected.includes(tag)
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
