import type { Database } from '@/lib/supabase.types';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

export interface RealtimeConfig<T extends TableName> {
  table: T;
  filter?: string;
  onInsert?: (payload: TableRow<T>) => void;
  onUpdate?: (payload: TableRow<T>) => void;
  onDelete?: (payload: TableRow<T>) => void;
  toastMessages?: {
    insert?: string;
    update?: string;
    delete?: string;
  };
}
