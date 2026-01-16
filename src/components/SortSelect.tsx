import styles from './SortSelect.module.css';

export type SortOption = 'updated' | 'stars' | 'name';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'stars', label: 'Most stars' },
  { value: 'name', label: 'Name' },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      aria-label="Sort projects"
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
