/**
 * Re-export the canonical CommandPalette from src/components/ui/command-palette.tsx.
 *
 * The command palette already lives at the UI path (and is wired into Navigation)
 * so we keep a single source of truth and only expose this module path that the
 * smart-features spec asks for.
 */
export { CommandPalette } from '@/components/ui/command-palette';
export { CommandPalette as default } from '@/components/ui/command-palette';
