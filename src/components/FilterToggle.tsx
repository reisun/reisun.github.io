import styles from './FilterToggle.module.css';

interface FilterToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FilterToggle({ label, checked, onChange }: FilterToggleProps) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
