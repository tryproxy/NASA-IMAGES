import { useEffect, useRef, useState } from 'react';
import { searchTips } from '../constants';

const searchPlaceholder =
  searchTips[Math.floor(Math.random() * searchTips.length)];

export function SearchField({
  searchQueries,
  onSearch,
  onRemoveDropdownResult,
}: {
  searchQueries: string[];
  onSearch: (input: string) => void;
  onRemoveDropdownResult: (idx: number | string) => void;
}) {
  const [input, setInput] = useState<string>('');
  const [hovered, setHovered] = useState<string>(searchPlaceholder);
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const hasInitialInput = useRef<boolean>(false);

  const handleInputAutoFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    window.addEventListener('focus', handleInputAutoFocus);
    return () => window.removeEventListener('focus', handleInputAutoFocus);
  }, []);

  useEffect(() => {
    if (searchQueries.length > 0 && input === '' && !hasInitialInput.current) {
      setInput(searchQueries[0]);
      hasInitialInput.current = true;
    }
  }, [searchQueries, input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.length > 0) {
      onSearch(input);
      setIsDropdownOpened(false);
    }
  };

  const handleSearchInputClick = () => {
    if (input.length > 0) {
      onSearch(input);
      setIsDropdownOpened(false);
    }
  };

  const handleDropdownClick = () => {
    if (!isDropdownOpened && searchQueries.length > 0) {
      setIsDropdownOpened(true);
    }
  };

  const handleDropdownBlur = () => {
    setTimeout(() => {
      const focusedEl = document.activeElement as Element | null;
      if (
        focusedEl &&
        dropdownRef.current &&
        dropdownRef.current.contains(focusedEl)
      ) {
        return;
      }
      setIsDropdownOpened(false);
      setHovered(searchPlaceholder);
    }, 100);
  };

  const handleSearchAutocompleteClick = (
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    const selectedDropdownValue = e.currentTarget.innerText;
    setInput(selectedDropdownValue);
    setIsDropdownOpened(false);
    onSearch(selectedDropdownValue);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    setInput('');
    setHovered(e.currentTarget.innerText);
  };

  return (
    <div className="w-full max-w-screen-xl rounded-sm border border-transparent p-2">
      <div className="relative w-full">
        <div className="flex gap-2">
          <input
            data-testid="search-input"
            ref={inputRef}
            className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface))] px-4 py-2 text-sm text-[var(--color-fg)] focus:outline-none"
            type="text"
            placeholder={searchQueries.length > 0 ? hovered : searchPlaceholder}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onClick={handleDropdownClick}
            onBlur={handleDropdownBlur}
          />
          <button
            className="cursor-pointer rounded-sm bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-surface)] transition hover:bg-[var(--color-primary-hover)]"
            onClick={handleSearchInputClick}
          >
            Search
          </button>
        </div>

        {isDropdownOpened && (
          <ul
            className="animate-ease-in absolute z-20 mt-1 w-full rounded-sm border border-[var(--color-border)] bg-black/30 backdrop-blur-md"
            ref={dropdownRef}
          >
            {searchQueries.map((result, idx) => (
              <div
                className="flex cursor-default items-center justify-between px-2 py-1 hover:bg-white/10"
                key={idx}
              >
                <li
                  key={idx}
                  tabIndex={-1}
                  className="flex w-full px-2 py-2 text-sm"
                  onMouseOver={handleMouseOver}
                  onClick={handleSearchAutocompleteClick}
                >
                  <span className="w-full">{result}</span>
                </li>
                <button
                  className="ml-2 cursor-pointer text-lg text-[var(--color-danger-soft)] hover:text-[var(--color-danger)]"
                  onBlur={handleDropdownBlur}
                  onClick={() => onRemoveDropdownResult(idx)}
                >
                  [X]
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
