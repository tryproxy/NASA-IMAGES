import { useThemeContext } from '../shared/model/context/useThemeContext';
import { Button } from './Button';

export function ThemeToggler() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="">
      <Button
        className="rounded bg-[var(--color-bg)] p-4 px-3 py-1 text-[var(--color-fg)]"
        onClick={toggleTheme}
        content={theme}
      ></Button>
    </div>
  );
}
