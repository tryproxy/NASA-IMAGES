import { Button } from '@/shared/ui-kit/Button';
import { useThemeContext } from '../shared/model/context/useThemeContext';

export function ThemeToggler() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="">
      <Button
        className="link rounded border-transparent bg-[var(--color-bg)] p-2 px-3 py-1 text-[var(--color-fg)] hover:border-[var(--color-primary)] hover:bg-transparent hover:text-[var(--color-primary)]"
        onClick={toggleTheme}
        content={theme}
      ></Button>
    </div>
  );
}
