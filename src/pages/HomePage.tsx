import { Outlet, useParams } from 'react-router-dom';
import { SearchLayout } from '../features/search';
import { Flyout } from '../features/pinned';

function App() {
  const { detailsId } = useParams();

  return (
    <div
      data-testid="app-container"
      className="flex h-full w-full bg-[var(--color-bg)] font-mono text-[var(--color-fg)]"
    >
      <SearchLayout />
      <Flyout />
      {detailsId && (
        <div className="w-[420px] max-w-full shrink-0 border-l border-[var(--color-border)] p-4 sm:w-[520px] lg:w-[620px]">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
