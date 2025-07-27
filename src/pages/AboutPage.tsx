import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="h-full min-w-full bg-black p-8 text-amber-50">
      <h1 className="mb-4 text-2xl font-bold">About This App</h1>

      <p className="mb-4">
        This project is built as part of the{' '}
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-50 underline hover:text-white"
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
          className="text-amber-50 underline hover:text-white"
        >
          github.com/asdqdsa
        </a>
      </p>

      <Link
        to="/"
        className="inline-block rounded-sm border border-amber-50 px-4 py-2 text-sm hover:bg-amber-50 hover:text-black"
      >
        Back to Home
      </Link>
    </div>
  );
}
