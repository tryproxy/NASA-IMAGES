import { ROUTES } from '@/shared/model/routes';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="h-full min-w-full bg-[var(--color-bg)] p-8 text-[var(--color-fg-secondary)]">
      <h1 className="mb-4 text-2xl font-bold">About This App</h1>

      <p className="mb-4">
        This project is built as part of the{' '}
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-fg-secondary)] underline hover:text-[var(--color-secondary)]"
        >
          RS School React Course
        </a>
        . It uses NASA&apos;s public image API to explore space-related media.
      </p>

      <p className="mb-2">
        Author: <span className="font-semibold">asdqdsa</span>
      </p>
      <p className="mb-6">
        GitHub:{' '}
        <a
          href="https://github.com/asdqdsa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-fg-secondary)] underline hover:text-[var(--color-secondary)]"
        >
          github.com/asdqdsa
        </a>
      </p>

      <Link to={ROUTES.HOME.href()} className="link hover:link cursor-pointer">
        Back to Home
      </Link>
    </div>
  );
}
